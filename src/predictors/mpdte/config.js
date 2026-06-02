export const MPDTE_CONFIG = {
  id: 'mpdte',
  title: 'MPDTE College Predictor',
  primaryFilters: [
    { key: 'Username', label: 'Your Name', type: 'text', required: true },
    { key: 'Closing Rank', label: 'Your JEE Rank', type: 'number', required: true },
    { key: 'Category', label: 'Category', type: 'select', required: true },
    { key: 'Gender', label: 'Gender', type: 'select', required: true },
    { key: 'Homestate', label: 'Home State', type: 'select', required: true },
  ],
  secondaryFilters: [
    { key: 'Institute Name', label: 'Institute', type: 'select' },
    { key: 'Branch', label: 'Branch', type: 'select' },
  ],
  columns: [
    { key: 'Institute Name', label: 'Institute' },
    { key: 'Branch', label: 'Branch' },
    { key: 'Category', label: 'Category' },
    { key: 'Gender', label: 'Gender' },
    { key: 'Homestate', label: 'Home State' },
    { key: 'Closing Rank', label: 'Closing Rank' },
    { key: 'Total Fees (₹)', label: 'Fees' },
    { key: 'Hostel Fees (₹)', label: 'Hostel' },
    { key: 'Avg Salary (LPA)', label: 'Avg Salary' },
    { key: 'Highest Salary (LPA)', label: 'High Salary' },
  ],
  predictionLogic: (data, filters) => {
    const inputRank = parseInt(filters['Closing Rank']);
    const category = filters['Category'] ? filters['Category'].toString().trim().toLowerCase() : '';
    const gender = filters['Gender'] ? filters['Gender'].toString().trim().toLowerCase() : '';
    const homestate = filters['Homestate'] ? filters['Homestate'].toString().trim().toLowerCase() : '';

    return data.filter(row => {
      const closing = parseInt(row['Closing Rank']);
      const validRank = !isNaN(closing) && inputRank <= closing;
      
      const rowCategory = row['Category'] ? row['Category'].toString().trim().toLowerCase() : '';
      const rowGender = row['Gender'] ? row['Gender'].toString().trim().toLowerCase() : '';
      const rowHomestate = row['Homestate'] ? row['Homestate'].toString().trim().toLowerCase() : '';

      return validRank && rowCategory === category && rowGender === gender && rowHomestate === homestate;
    });
  }
};
