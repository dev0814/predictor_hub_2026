export const JAC_CHANDIGARH_CONFIG = {
  id: 'jac-chandigarh',
  title: 'JAC Chandigarh College Predictor',
  primaryFilters: [
    { key: 'Username', label: 'Your Name', type: 'text', required: true },
    { key: 'Closing Rank', label: 'Your JEE Main Rank', type: 'number', required: true },
    { key: 'Round', label: 'Round', type: 'select', required: true },
    { key: 'Seat Type', label: 'Category', type: 'select', required: true },
    { key: 'Gender', label: 'Gender', type: 'select', required: true },
    { key: 'Home State', label: 'Home State', type: 'select', required: true },
  ],
  secondaryFilters: [
    { key: 'Institute Name', label: 'Institute', type: 'select' },
    { key: 'Academic Program Name', label: 'Program', type: 'select' },
  ],
  columns: [
    { key: 'Institute Name', label: 'Institute' },
    { key: 'Academic Program Name', label: 'Program' },
    { key: 'Quota', label: 'Quota' },
    { key: 'Seat Type', label: 'Category' },
    { key: 'Gender', label: 'Gender' },
    { key: 'Round', label: 'Round' },
    { key: 'Closing Rank', label: 'Closing Rank' },
  ],
  predictionLogic: (data, filters) => {
    const inputRank = parseInt(filters['Closing Rank']);
    const category = filters['Seat Type'] ? filters['Seat Type'].toString().trim().toLowerCase() : '';
    const gender = filters['Gender'] ? filters['Gender'].toString().trim().toLowerCase() : '';
    const round = filters['Round'] ? filters['Round'].toString().trim().toLowerCase() : '';
    const homeState = filters['Home State'] ? filters['Home State'].toString().trim().toLowerCase() : '';

    return data.filter(row => {
      const rowRound = row['Round'] ? row['Round'].toString().trim().toLowerCase() : '';
      if (round && rowRound !== round) return false;

      const closingRank = parseInt(row['Closing Rank']);
      const rowSeat = row['Seat Type'] ? row['Seat Type'].toString().trim().toLowerCase() : '';
      const rowGender = row['Gender'] ? row['Gender'].toString().trim().toLowerCase() : '';
      const quota = row['Quota'] ? row['Quota'].toString().trim().toUpperCase() : '';

      const validRank = !isNaN(closingRank) && inputRank <= closingRank;
      const validCategory = rowSeat === category;
      const validGender = rowGender === gender;
      
      const isHomeState = quota === 'HS' && homeState === 'chandigarh'; // Simplified for JAC CHD
      const isAllIndia = quota === 'AI' || quota === 'OS';

      return validRank && validCategory && validGender && (isHomeState || isAllIndia);
    });
  }
};
