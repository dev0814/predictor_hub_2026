export const JAC_DELHI_CONFIG = {
  title: 'JAC Delhi 2025 College Predictor',
  datasetPath: '/data/jac-delhi/2025.xlsx',
  primaryFilters: [
    { key: 'Username', label: 'Your Name', type: 'text', required: true },
    { key: 'Closing Rank', label: 'Your JEE Main Rank', type: 'number', required: true },
    { key: 'Seat Type', label: 'Category', type: 'select', required: true },
    { key: 'Pool', label: 'Region (Delhi/Outside Delhi)', type: 'select', required: true },
  ],
  secondaryFilters: [
    { key: 'Institute', label: 'College', type: 'select' },
    { key: 'Academic Program Name', label: 'Branch', type: 'select' },
  ],
  columns: [
    { key: 'Institute', label: 'College' },
    { key: 'Academic Program Name', label: 'Branch' },
    { key: 'Seat Type', label: 'Category' },
    { key: 'Pool', label: 'Region' },
    { key: 'Closing Rank', label: 'Closing Rank' },
  ],
  predictionLogic: (data, filters) => {
    const inputRank = parseInt(filters['Closing Rank']);
    const category = filters['Seat Type'];
    const region = filters['Pool'];

    return data.filter(row => {
      const closing = parseInt(row['Closing Rank']);
      const validRank = !isNaN(closing) && inputRank <= closing;
      const matchCategory = category === row['Seat Type'];
      const matchRegion = region === row['Pool'];
      return validRank && matchCategory && matchRegion;
    });
  }
};
