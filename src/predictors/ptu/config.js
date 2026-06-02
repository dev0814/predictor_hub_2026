export const PTU_CONFIG = {
  id: 'ptu',
  title: 'PTU College Predictor',
  primaryFilters: [
    { key: 'Username', label: 'Your Name', type: 'text', required: true },
    { key: 'Closing Rank', label: 'Your JEE Rank', type: 'number', required: true },
    { key: 'Category', label: 'Category', type: 'select', required: true },
    { key: 'Seat State', label: 'Seat State', type: 'select', required: true },
  ],
  secondaryFilters: [
    { key: 'College Name', label: 'College', type: 'select' },
    { key: 'Course / Branch', label: 'Program', type: 'select' },
  ],
  columns: [
    { key: 'College Name', label: 'College' },
    { key: 'Course / Branch', label: 'Program' },
    { key: 'Category', label: 'Category' },
    { key: 'Seat State', label: 'Quota' },
    { key: 'Estimated Closing Rank 2024', label: 'Closing Rank' },
    { key: 'Total 4-Year BTech Fees (₹)', label: 'Fees' },
    { key: 'Hostel Fees (₹/Year)', label: 'Hostel' },
    { key: 'Average Package (₹ LPA)', label: 'Avg Package' },
    { key: 'Highest Package (₹ LPA)', label: 'High Package' },
  ],
  predictionLogic: (data, filters) => {
    const inputRank = parseInt(filters['Closing Rank']);
    const category = filters['Category'] ? filters['Category'].toString().trim().toLowerCase() : '';
    const seatState = filters['Seat State'] ? filters['Seat State'].toString().trim().toLowerCase() : '';

    return data.filter(row => {
      const closing = parseInt(row['Estimated Closing Rank 2024']);
      const validRank = !isNaN(closing) && inputRank <= closing;
      
      const rowCategory = row['Category'] ? row['Category'].toString().trim().toLowerCase() : '';
      const rowSeatState = row['Seat State'] ? row['Seat State'].toString().trim().toLowerCase() : '';

      return validRank && rowCategory === category && rowSeatState === seatState;
    });
  }
};
