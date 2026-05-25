import React from 'react';
import './InitialForm.css';

const InitialForm = ({ filters, filterConfig, onFilterChange, onSubmit, onReset }) => {
  return (
    <div className="initial-form-container">
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="initial-form">
        <div className="form-grid">
          {filterConfig.map((config) => (
            <div key={config.key} className="form-item">
              <label htmlFor={config.key}>{config.label}</label>
              {config.type === 'select' ? (
                <select
                  id={config.key}
                  value={filters[config.key] || ''}
                  onChange={(e) => onFilterChange(config.key, e.target.value)}
                  required={config.required}
                >
                  <option value="">Select {config.label}</option>
                  {config.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={config.type}
                  id={config.key}
                  placeholder={`Enter ${config.label}`}
                  value={filters[config.key] || ''}
                  onChange={(e) => onFilterChange(config.key, e.target.value)}
                  required={config.required}
                />
              )}
            </div>
          ))}
        </div>
        <div className="form-actions">
          <button type="submit" className="predict-btn">Predict Colleges</button>
          <button type="button" className="reset-btn" onClick={onReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default InitialForm;
