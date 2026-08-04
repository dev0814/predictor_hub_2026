import React from 'react';
import { FaDownload, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import './ResultTable.css';

const ResultTable = ({ data, columns, onDownload, onSort, sortConfig }) => {
  if (data.length === 0) {
    return (
      <div className="no-results">
        <p>No results found for the selected filters.</p>
      </div>
    );
  }

  if (!columns || columns.length === 0) {
    return (
      <div className="no-results">
        <p>Please select at least one column to display results.</p>
      </div>
    );
  }

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return <FaSort className="sort-icon" />;
    return sortConfig.direction === 'asc' ? <FaSortUp className="sort-icon active" /> : <FaSortDown className="sort-icon active" />;
  };

  return (
    <div className="result-container">
      <div className="result-header">
        <h3>Found {data.length} Matching Results</h3>
        <button className="download-btn" onClick={onDownload}>
          <FaDownload /> Download PDF
        </button>
      </div>
      <div className="table-responsive">
        <table className="result-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  onClick={() => col.sortable !== false && onSort && onSort(col.key)}
                  className={col.sortable !== false ? 'sortable-header' : ''}
                >
                  <div className="header-content">
                    {col.label}
                    {col.sortable !== false && getSortIcon(col.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col.key}>{item[col.key] || '-'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;
