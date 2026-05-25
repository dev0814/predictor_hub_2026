export const HBTU_CONFIG = {
  title: 'HBTU 2025 College Predictor',
  datasetPath: '/data/hbtu/2025.xlsx',
  primaryFilters: [
    { key: 'Username', label: 'Your Name', type: 'text', required: true },
    { key: 'Closing Rank', label: 'Your JEE Main Rank', type: 'number', required: true },
    { key: 'Category', label: 'Category', type: 'select', required: true },
  ],
  secondaryFilters: [
    { key: 'Program', label: 'Branch', type: 'select' },
  ],
  columns: [
    { key: 'Program', label: 'Branch' },
    { key: 'Category', label: 'Category' },
    { key: 'Closing Rank', label: 'Closing Rank' },
  ],
  predictionLogic: (data, filters) => {
    const inputRank = parseInt(filters['Closing Rank']);
    const category = filters['Category'];

    return data.filter(row => {
      const closing = parseInt(row['Closing Rank']);
      const validRank = !isNaN(closing) && inputRank <= closing;
      const matchCategory = category === row['Category'];
      return validRank && matchCategory;
    });
  }
};
