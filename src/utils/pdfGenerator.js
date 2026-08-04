import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generates a PDF report of the prediction results.
 * @param {string} title - The title of the report
 * @param {Array} columns - Table headers
 * @param {Array} data - Table data (array of objects)
 * @param {string} fileName - Name of the file to save
 * @param {Object} primaryFilters - The initial user details for the header
 */
export const generatePDF = async (title, columns, data, fileName = 'prediction_results.pdf', primaryFilters = {}) => {
  const doc = new jsPDF();
  const logoUrl = '/logo.png';

  // Helper to add watermark to current page
  const addWatermark = (pdfDoc) => {
    const pageWidth = pdfDoc.internal.pageSize.getWidth();
    const pageHeight = pdfDoc.internal.pageSize.getHeight();
    const imgWidth = 120;
    const imgHeight = 120;
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    try {
      pdfDoc.setGState(new pdfDoc.GState({ opacity: 0.1 }));
      pdfDoc.addImage(logoUrl, 'PNG', x, y, imgWidth, imgHeight);
      pdfDoc.setGState(new pdfDoc.GState({ opacity: 1.0 }));
    } catch (e) {
      console.warn('Could not add watermark.', e);
    }
  };

  const pageWidth = doc.internal.pageSize.getWidth();

  // 1. Add Logo at Top Center of 1st Page
  try {
    const headerLogoWidth = 30;
    const headerLogoHeight = 30;
    doc.addImage(logoUrl, 'PNG', (pageWidth - headerLogoWidth) / 2, 10, headerLogoWidth, headerLogoHeight);
  } catch (e) {
    console.warn('Could not add header logo.', e);
  }

  // 2. Center Align Title
  doc.setFontSize(22);
  doc.setTextColor(44, 62, 80);
  doc.text(title, pageWidth / 2, 50, { align: 'center' });
  
  // Add user details if available
  doc.setFontSize(11);
  doc.setTextColor(100);
  let yPos = 60;
  
  if (primaryFilters.Username) {
    doc.text(`Candidate Name: ${primaryFilters.Username}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 7;
  }

  const filterInfo = Object.entries(primaryFilters)
    .filter(([key, value]) => {
      if (key === 'Username') return false;
      if (value === null || value === undefined) return false;
      if (Array.isArray(value) && value.length === 0) return false;
      if (String(value).trim() === '') return false;
      return true;
    })
    .map(([key, value]) => {
      const displayValue = Array.isArray(value) ? value.join(', ') : value;
      return `${key}: ${displayValue}`;
    })
    .join(' | ');

  if (filterInfo) {
    doc.text(filterInfo, pageWidth / 2, yPos, { align: 'center' });
    yPos += 7;
  }
  
  doc.text(`Prepared by: CareerSync`, pageWidth / 2, yPos, { align: 'center' });
  
  // Prepare data for autotable
  const sanitize = (val) => String(val || '').replace(/₹/g, 'Rs.');

  const tableRows = data.map(item => columns.map(col => sanitize(item[col.key])));
  const tableHeaders = [columns.map(col => col.label)];
  
  autoTable(doc, {
    startY: yPos + 10,
    head: tableHeaders,
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [52, 152, 219], textColor: 255 },
    margin: { top: 15, bottom: 15 },
    styles: { fontSize: 8, font: 'helvetica' }, // Standard font
    didDrawPage: (data) => {
      // Add watermark to every page
      addWatermark(doc);
    }
  });

  // Add page numbers
  const pageCount = doc.internal.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFontSize(9);
    doc.setTextColor(120);

    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  doc.save(fileName);
};
