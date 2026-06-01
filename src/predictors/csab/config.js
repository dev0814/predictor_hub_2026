export const CSAB_CONFIG = {
  title: 'CSAB 2026 College Predictor',
  datasetPath: '/data/csab/2026.xlsx',
  primaryFilters: [
    { key: 'Username', label: 'Your Name', type: 'text', required: true },
    { key: 'Closing Rank', label: 'Your JEE Main Rank', type: 'number', required: true },
    { key: 'Round', label: 'Round', type: 'select', required: true },
    { key: 'Seat Type', label: 'Category', type: 'select', required: true },
    { key: 'Gender', label: 'Gender', type: 'select', required: true },
    { key: 'Institute State', label: 'Home State', type: 'select', required: true },
  ],
  secondaryFilters: [
    { key: 'Institute Type', label: 'Institute Type', type: 'select' },
    { key: 'Institute', label: 'Institute', type: 'select' },
    { key: 'Academic Program Name', label: 'Program', type: 'select' },
  ],
  columns: [
    { key: 'Institute', label: 'Institute' },
    { key: 'Academic Program Name', label: 'Program' },
    { key: 'Institute Type', label: 'Type' },
    { key: 'Total Fees', label: 'Total Fees' },
    { key: 'Average Salary', label: 'Avg Salary' },
    { key: 'Institute State', label: 'State' },
    { key: 'Closing Rank', label: 'Closing Rank' },
  ],
  predictionLogic: (data, filters) => {
    const inputRank = parseInt(filters['Closing Rank']);
    const category = filters['Seat Type'];
    const gender = filters['Gender'];
    const round = filters['Round'];
    const homeState = filters['Institute State']?.toLowerCase();

    return data.filter(row => {
      if (round && row['Round'] !== round) return false;

      const closingRank = parseInt(row['Closing Rank']);
      const seat = row['Seat Type'];
      const genderRow = row['Gender'];
      const instState = row['Institute State']?.toLowerCase();
      const quota = row['Quota'];

      const validRank = !isNaN(closingRank) && inputRank <= closingRank;
      const validCategory = seat === category;
      const validGender = genderRow === gender;
      
      const isHomeState = quota === 'HS' && instState === homeState;
      const isOtherState = quota === 'OS';
      const isAllIndia = quota === 'AI';

      return validRank && validCategory && validGender && (isHomeState || isOtherState || isAllIndia);
    });
  }
};
