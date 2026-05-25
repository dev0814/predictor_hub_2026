const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const data = [
  {
    "Round": "1",
    "Institute": "Indian Institute of Technology Bombay",
    "Academic Program Name": "Computer Science and Engineering (4 Years, Bachelor of Technology)",
    "Quota": "AI",
    "Seat Type": "OPEN",
    "Pool": "Gender-Neutral",
    "Opening Rank": "1",
    "Closing Rank": "67",
    "Institute Type": "IIT"
  },
  {
    "Round": "1",
    "Institute": "Indian Institute of Technology Delhi",
    "Academic Program Name": "Computer Science and Engineering (4 Years, Bachelor of Technology)",
    "Quota": "AI",
    "Seat Type": "OPEN",
    "Pool": "Gender-Neutral",
    "Opening Rank": "68",
    "Closing Rank": "118",
    "Institute Type": "IIT"
  },
  {
    "Round": "6",
    "Institute": "National Institute of Technology Trichy",
    "Academic Program Name": "Computer Science and Engineering (4 Years, Bachelor of Technology)",
    "Quota": "OS",
    "Seat Type": "OPEN",
    "Pool": "Gender-Neutral",
    "Opening Rank": "1500",
    "Closing Rank": "2500",
    "Institute Type": "NIT"
  }
];

const ws = XLSX.utils.json_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

const exportPath = path.join(__dirname, 'public', 'data', 'josaa', '2026.xlsx');
XLSX.writeFile(wb, exportPath);
console.log('Dummy Excel file created at:', exportPath);
