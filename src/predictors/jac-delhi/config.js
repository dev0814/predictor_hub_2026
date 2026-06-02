export const JAC_DELHI_CONFIG = {
  id: 'jac-delhi',
  title: 'JAC Delhi College Predictor',
  primaryFilters: [
    { key: 'Username', label: 'Your Name', type: 'text', required: true },
    { key: 'Closing Rank', label: 'Your JEE Main Rank', type: 'number', required: true },
    { key: 'Round', label: 'Round', type: 'select', required: true },
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
    { key: 'Round', label: 'Round' },
    { key: 'Closing Rank', label: 'Closing Rank' },
  ],
  predictionLogic: (data, filters) => {
    const inputRank = parseInt(filters['Closing Rank']);
    const category = filters['Seat Type'] ? filters['Seat Type'].toString().trim().toLowerCase() : '';
    const region = filters['Pool'] ? filters['Pool'].toString().trim().toLowerCase() : '';
    const round = filters['Round'] ? filters['Round'].toString().trim().toLowerCase() : '';

    return data.filter(row => {
      const rowRound = row['Round'] ? row['Round'].toString().trim().toLowerCase() : '';
      if (round && rowRound !== round) return false;

      const closing = parseInt(row['Closing Rank']);
      const validRank = !isNaN(closing) && inputRank <= closing;
      
      const rowCategory = row['Seat Type'] ? row['Seat Type'].toString().trim().toLowerCase() : '';
      const rowRegion = row['Pool'] ? row['Pool'].toString().trim().toLowerCase() : '';

      const matchCategory = rowCategory === category;
      const matchRegion = rowRegion === region;
      
      return validRank && matchCategory && matchRegion;
    });
  }
};
