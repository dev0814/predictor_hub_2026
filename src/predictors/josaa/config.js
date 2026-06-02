export const JOSAA_CONFIG = {
  id: 'josaa',
  title: 'JoSAA College Predictor',
  primaryFilters: [
    { key: 'Username', label: 'Your Name', type: 'text', required: true },
    { key: 'Closing Rank', label: 'Your JEE Advanced Rank', type: 'number', required: true },
    { key: 'Round', label: 'Round', type: 'select', required: true },
    { key: 'Seat Type', label: 'Category', type: 'select', required: true },
    { key: 'Gender', label: 'Gender', type: 'select', required: true },
    { key: 'Institute State', label: 'Home State', type: 'select', required: true },
  ],
  secondaryFilters: [
    { key: 'Institute Type', label: 'Institute Type', type: 'select' },
    { key: 'Institute Name', label: 'Institute', type: 'select' },
    { key: 'Academic Program Name', label: 'Program', type: 'select' },
  ],
  columns: [
    { key: 'Institute Name', label: 'Institute' },
    { key: 'Academic Program Name', label: 'Program' },
    { key: 'Institute Type', label: 'Type' },
    { key: 'Quota', label: 'Quota' },
    { key: 'Seat Type', label: 'Category' },
    { key: 'Gender', label: 'Gender' },
    { key: 'Closing Rank', label: 'Closing Rank' },
  ],
  predictionLogic: (data, filters) => {
    const inputRank = parseInt(filters['Closing Rank']);
    const category = filters['Seat Type'] ? filters['Seat Type'].toString().trim().toLowerCase() : '';
    const gender = filters['Gender'] ? filters['Gender'].toString().trim().toLowerCase() : '';
    const round = filters['Round'];
    const homeState = filters['Institute State'] ? filters['Institute State'].toString().trim().toLowerCase() : '';

    return data.filter(row => {
      if (round && row['Round'] !== round) return false;

      const closingRank = parseInt(row['Closing Rank']);
      const rowSeat = row['Seat Type'] ? row['Seat Type'].toString().trim().toLowerCase() : '';
      const rowGender = row['Gender'] ? row['Gender'].toString().trim().toLowerCase() : '';
      const rowInstState = row['Institute State'] ? row['Institute State'].toString().trim().toLowerCase() : '';
      const quota = row['Quota'] ? row['Quota'].toString().trim().toUpperCase() : '';

      const validRank = !isNaN(closingRank) && inputRank <= closingRank;
      const validCategory = rowSeat === category;
      const validGender = rowGender === gender;
      
      const isHomeState = quota === 'HS' && rowInstState === homeState;
      const isOtherState = quota === 'OS';
      const isAllIndia = quota === 'AI';

      return validRank && validCategory && validGender && (isHomeState || isOtherState || isAllIndia);
    });
  }
};
