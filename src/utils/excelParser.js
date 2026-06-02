import * as XLSX from 'xlsx';

/**
 * Reads an Excel file and returns the data as an array of objects.
 * @param {string} filePath - Path to the Excel file (relative to public folder or a URL)
 * @returns {Promise<Array>} - Resolves to an array of objects representing the Excel data
 */
export const readExcelFile = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });
    
    // Assuming we want the first sheet
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    return jsonData;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    throw error;
  }
};

/**
 * Filters data based on provided filter criteria.
 * @param {Array} data - The array of objects to filter
 * @param {Object} filters - An object where keys are column names and values are filter values
 * @returns {Array} - The filtered array
 */
export const filterData = (data, filters) => {
  return data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value || value === 'All') return true;
      return String(item[key]).toLowerCase() === String(value).toLowerCase();
    });
  });
};

/**
 * Gets unique values for a specific column in the dataset.
 * @param {Array} data - The dataset
 * @param {string} column - The column name
 * @returns {Array} - Unique values sorted
 */
export const getUniqueValues = (data, column) => {
  const values = [...new Set(data.map(item => {
    const val = item[column];
    return val ? val.toString().trim() : val;
  }))];
  return values.filter(v => v !== null && v !== undefined && v !== '').sort();
};
