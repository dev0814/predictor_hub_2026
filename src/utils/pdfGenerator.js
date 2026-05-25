import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

/**
 * Generates a PDF report of the prediction results.
 * @param {string} title - The title of the report
 * @param {Array} columns - Table headers
 * @param {Array} data - Table data (array of objects)
 * @param {string} fileName - Name of the file to save
 * @param {Object} primaryFilters - The initial user details for the header
 */
export const generatePDF = (title, columns, data, fileName = 'prediction_results.pdf', primaryFilters = {}) => {
  const doc = jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.setTextColor(44, 62, 80);
  doc.text(title, 14, 20);
  
  // Add user details if available
  doc.setFontSize(10);
  doc.setTextColor(100);
  let yPos = 30;
  
  if (primaryFilters.Username) {
    doc.text(`Candidate Name: ${primaryFilters.Username}`, 14, yPos);
    yPos += 6;
  }
  
  const filterInfo = Object.entries(primaryFilters)
    .filter(([key]) => key !== 'Username')
    .map(([key, value]) => `${key}: ${value}`)
    .join(' | ');
    
  doc.text(filterInfo, 14, yPos);
  yPos += 6;
  
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, yPos);
  
  // Prepare data for autotable
  const tableRows = data.map(item => columns.map(col => item[col.key] || ''));
  const tableHeaders = [columns.map(col => col.label)];
  
  doc.autoTable({
    startY: yPos + 5,
    head: tableHeaders,
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [52, 152, 219], textColor: 255 },
    margin: { top: 35 },
    styles: { fontSize: 8 },
  });
  
  doc.save(fileName);
};
