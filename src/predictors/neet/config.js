
// Function to process raw NEET data (individual candidates) into cutoff data (Opening/Closing Rank per group)
const processNeetData = (rawData) => {
  const cutoffMap = new Map();

  rawData.forEach(row => {
    const key = [
      row['Allotted Institute'],
      row['Course'],
      row['Allotted Quota'],
      row['Alloted Category'],
    ].join('|||');

    if (!cutoffMap.has(key)) {
      cutoffMap.set(key, {
        'Allotted Institute': row['Allotted Institute'],
        'Course': row['Course'],
        'Allotted Quota': row['Allotted Quota'],
        'Alloted Category': row['Alloted Category'],
        'Opening Rank': row['Rank'],
        'Closing Rank': row['Rank']
      });
    } else {
      const existing = cutoffMap.get(key);
      if (row['Rank'] < existing['Opening Rank']) {
        existing['Opening Rank'] = row['Rank'];
      }
      if (row['Rank'] > existing['Closing Rank']) {
        existing['Closing Rank'] = row['Rank'];
      }
    }
  });

  return Array.from(cutoffMap.values());
};

export const NEET_CONFIG = {
  id: 'neet',
  title: 'NEET UG College Predictor',
  primaryFilters: [
    { key: 'Username', label: 'Your Name', type: 'text', required: true },
    { key: 'Closing Rank', label: 'Your NEET UG Rank', type: 'number', required: true },
    { key: 'Allotted Quota', label: 'Allotted Quota', type: 'select', required: true },
    { key: 'Alloted Category', label: 'Category', type: 'select', required: true },
  ],
  secondaryFilters: [
    { key: 'Allotted Institute', label: 'Institute', type: 'select' },
    { key: 'Course', label: 'Course', type: 'select' },
  ],
  columns: [
    { key: 'Allotted Institute', label: 'Institute' },
    { key: 'Course', label: 'Course' },
    { key: 'Allotted Quota', label: 'Quota' },
    { key: 'Alloted Category', label: 'Category' },
    { key: 'Opening Rank', label: 'Opening Rank' },
    { key: 'Closing Rank', label: 'Closing Rank' },
  ],
  predictionLogic: (data, filters) => {
    // First process the data to get cutoffs
    const cutoffData = processNeetData(data);

    const inputRank = parseInt(filters['Closing Rank']);
    const quota = filters['Allotted Quota'] ? filters['Allotted Quota'].toString().trim().toLowerCase() : '';
    const category = filters['Alloted Category'] ? filters['Alloted Category'].toString().trim().toLowerCase() : '';

    return cutoffData.filter(row => {
      const closingRank = parseInt(row['Closing Rank']);
      const rowQuota = row['Allotted Quota'] ? row['Allotted Quota'].toString().trim().toLowerCase() : '';
      const rowCategory = row['Alloted Category'] ? row['Alloted Category'].toString().trim().toLowerCase() : '';

      return (
        !isNaN(closingRank) &&
        inputRank <= closingRank &&
        rowQuota === quota &&
        rowCategory === category
      );
    });
  }
};
