import React from 'react';
import './ColumnSelector.css';

const ColumnSelector = ({ columns, selectedKeys, onChange, title = 'Select Columns' }) => {
  if (!columns || columns.length === 0) return null;

  const toggle = (key) => {
    if (!onChange) return;
    const next = selectedKeys.includes(key)
      ? selectedKeys.filter(k => k !== key)
      : [...selectedKeys, key];
    onChange(next);
  };

  const selectAll = () => {
    onChange(columns.map(c => c.key));
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className="column-selector">
      <div className="column-selector-header">
        <h4>{title}</h4>
        <div className="column-selector-actions">
          <button type="button" className="column-selector-btn" onClick={selectAll}>Select All</button>
          <button type="button" className="column-selector-btn danger" onClick={clearAll}>Clear</button>
        </div>
      </div>

      <div className="column-selector-grid">
        {columns.map(col => (
          <label key={col.key} className="column-selector-item">
            <input
              type="checkbox"
              checked={selectedKeys.includes(col.key)}
              onChange={() => toggle(col.key)}
            />
            <span>{col.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ColumnSelector;
