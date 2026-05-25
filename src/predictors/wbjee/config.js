export const WBJEE_CONFIG = {
  title: 'WBJEE 2025 College Predictor',
  datasetPath: '/data/wbjee/2025.xlsx',
  primaryFilters: [
    { key: 'Username', label: 'Your Name', type: 'text', required: true },
    { key: 'Closing Rank', label: 'Your WBJEE Rank', type: 'number', required: true },
    { key: 'Category', label: 'Category', type: 'select', required: true },
    { key: 'Round', label: 'Round', type: 'select', required: true },
  ],
  secondaryFilters: [
    { key: 'Institute', label: 'College', type: 'select' },
    { key: 'Program', label: 'Program', type: 'select' },
  ],
  columns: [
    { key: 'Institute', label: 'College' },
    { key: 'Program', label: 'Program' },
    { key: 'Category', label: 'Category' },
    { key: 'Round', label: 'Round' },
    { key: 'Closing Rank', label: 'Closing Rank' },
  ],
  predictionLogic: (data, filters) => {
    const inputRank = parseInt(filters['Closing Rank']);
    const category = filters['Category'];
    const round = filters['Round'];

    return data.filter(row => {
      const closing = parseInt(row['Closing Rank']);
      const validRank = !isNaN(closing) && inputRank <= closing;
      const matchCategory = category === row['Category'];
      const matchRound = round === row['Round'];
      return validRank && matchCategory && matchRound;
    });
  }
};
