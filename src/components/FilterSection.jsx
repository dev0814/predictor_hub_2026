import React from 'react';
import Select from 'react-select';
import './FilterSection.css';

const FilterSection = ({ filters, filterConfig, onFilterChange, onReset }) => {
  if (filterConfig.length === 0) return null;

  // Custom styles for react-select to match the app's theme
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '6px',
      borderColor: '#ddd',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#3498db'
      }
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(52, 152, 219, 0.1)',
      borderRadius: '4px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#2980b9',
      fontWeight: '600',
      fontSize: '0.85rem'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#e74c3c',
      '&:hover': {
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        color: '#c0392b',
      }
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '0.9rem',
      backgroundColor: state.isSelected ? '#3498db' : state.isFocused ? 'rgba(52, 152, 219, 0.05)' : '#fff',
      color: state.isSelected ? '#fff' : '#333',
    })
  };

  return (
    <div className="filter-section">
      <div className="filter-header-small">
        <h4>Refine Results</h4>
        <button className="reset-btn-small" onClick={onReset}>Clear All</button>
      </div>
      <div className="filter-grid">
        {filterConfig.map((config) => {
          const selectedValues = filters[config.key] || [];
          const options = config.options.map(opt => ({ value: opt, label: opt }));
          const value = options.filter(opt => selectedValues.includes(opt.value));

          return (
            <div key={config.key} className="filter-item">
              <label htmlFor={config.key}>{config.label}</label>
              <Select
                id={config.key}
                isMulti
                options={options}
                value={value}
                onChange={(selected) => {
                  const values = selected ? selected.map(s => s.value) : [];
                  onFilterChange(config.key, values);
                }}
                placeholder={`Select ${config.label}s...`}
                className="multi-select"
                styles={customStyles}
                closeMenuOnSelect={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSection;
