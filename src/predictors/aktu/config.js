export const AKTU_CONFIG = {
  title: 'AKTU 2025 College Predictor',
  datasetPath: '/data/aktu/2025.xlsx',
  primaryFilters: [
    { key: 'Username', label: 'Your Name', type: 'text', required: true },
    { key: 'Closing Rank', label: 'Your JEE Main Rank', type: 'number', required: true },
    { key: 'Category', label: 'Category', type: 'select', required: true },
    { key: 'Quota', label: 'Quota', type: 'select', required: true },
  ],
  secondaryFilters: [
    { key: 'Institute', label: 'College', type: 'select' },
    { key: 'Program', label: 'Program', type: 'select' },
  ],
  columns: [
    { key: 'Institute', label: 'College' },
    { key: 'Program', label: 'Program' },
    { key: 'Quota', label: 'Quota' },
    { key: 'Category', label: 'Category' },
    { key: 'Closing Rank', label: 'Closing Rank' },
    { key: 'Total Fees (INR)', label: 'Fees' },
    { key: 'Average Salary (LPA)', label: 'Avg Salary' },
  ],
  predictionLogic: (data, filters) => {
    const inputRank = parseInt(filters['Closing Rank']);
    const category = filters['Category'];
    const quota = filters['Quota'];

    return data.filter(row => {
      const closing = parseInt(row['Closing Rank']);
      const validRank = !isNaN(closing) && inputRank <= closing;
      const matchCategory = category === row['Category']?.trim();
      const matchQuota = quota === row['Quota']?.trim();
      return validRank && matchCategory && matchQuota;
    });
  }
};
