export const REAP_CONFIG = {
  id: 'reap',
  title: 'REAP College Predictor',
  primaryFilters: [
    { key: 'Username', label: 'Your Name', type: 'text', required: true },
    { key: 'CRL Rank', label: 'Your JEE CRL Rank', type: 'number', required: true },
    { key: 'Category', label: 'Category', type: 'select', required: true },
  ],
  secondaryFilters: [
    { key: 'College Name', label: 'College', type: 'select' },
    { key: 'Location', label: 'Location', type: 'select' },
  ],
  columns: [
    { key: 'College Name', label: 'College' },
    { key: 'Location', label: 'Location' },
    { key: 'Category', label: 'Category' },
    { key: 'Percentile', label: 'Percentile' },
    { key: 'CRL Rank', label: 'Closing Rank' },
    { key: 'Approx. Total Fees(4 years)', label: 'Total Fees' },
    { key: 'Hostel Fees', label: 'Hostel Fees' },
    { key: 'Highest Package (Approx. CTC)', label: 'Highest Package' },
  ],
  predictionLogic: (data, filters) => {
    const inputRank = parseInt(filters['CRL Rank']);
    const category = filters['Category'] ? filters['Category'].toString().trim().toLowerCase() : '';

    return data.filter(row => {
      const closing = parseInt(row['CRL Rank']);
      const validRank = !isNaN(closing) && inputRank <= closing;
      
      const rowCategory = row['Category'] ? row['Category'].toString().trim().toLowerCase() : '';

      return validRank && rowCategory === category;
    });
  }
};
