export const IPU_CONFIG = {
  id: 'ipu',
  title: 'IPU College Predictor',
  primaryFilters: [
    { key: 'Username', label: 'Your Name', type: 'text', required: true },
    { key: 'Closing Rank', label: 'Your JEE Rank', type: 'number', required: true },
    { key: 'Category', label: 'Category', type: 'select', required: true },
    { key: 'Quota', label: 'Quota', type: 'select', required: true },
  ],
  secondaryFilters: [
    { key: 'Program', label: 'Program', type: 'select' },
    { key: 'Institute', label: 'College', type: 'select' },
    { key: 'abbreviations', label: 'Abbreviation', type: 'select' },
  ],
  columns: [
    { key: 'Institute', label: 'College' },
    { key: 'Program', label: 'Program' },
    { key: 'Quota', label: 'Quota' },
    { key: 'Category', label: 'Category' },
    { key: 'abbreviations', label: 'Abbrev.' },
    { key: 'Closing Rank', label: 'Closing Rank' },
  ],
  predictionLogic: (data, filters) => {
    const inputRank = parseInt(filters['Closing Rank']);
    const category = filters['Category'] ? filters['Category'].toString().trim().toLowerCase() : '';
    const quota = filters['Quota'] ? filters['Quota'].toString().trim().toLowerCase() : '';

    return data.filter(row => {
      const closing = parseInt(row['Closing Rank']);
      const validRank = !isNaN(closing) && inputRank <= closing;
      
      const rowCategory = row['Category'] ? row['Category'].toString().trim().toLowerCase() : '';
      const rowQuota = row['Quota'] ? row['Quota'].toString().trim().toLowerCase() : '';

      const matchCategory = rowCategory === category;
      const matchQuota = rowQuota === quota;
      
      return validRank && matchCategory && matchQuota;
    });
  }
};
