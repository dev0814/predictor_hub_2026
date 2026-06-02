import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaCalendarAlt, FaChevronLeft } from 'react-icons/fa';
import './YearSelection.css';

const YearSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [availableYears, setAvailableYears] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real environment, we might want to fetch this from a list of files or a manifest
    // For now, since it's frontend-only, we'll try to check common years or the user can define them
    // A better way would be to have a global config or try to fetch the files.
    // Given the requirement "adding a new counselling year only requires placing a new Excel file",
    // and "No code changes should be required", we'll implement a probe or a known range.
    
    const probeYears = async () => {
      // Check years from 2020 to current + 1
      const startYear = 2020;
      const endYear = new Date().getFullYear() + 1;
      const yearsToCheck = [];
      for (let y = endYear; y >= startYear; y--) {
        yearsToCheck.push(y);
      }

      console.log(`Probing years for ${id}:`, yearsToCheck);

      const foundYears = [];

      // Run probes in parallel with cache-busting
      const probes = yearsToCheck.map(async (year) => {
        try {
          const response = await fetch(`/data/${id}/${year}.xlsx?t=${Date.now()}`);
          if (response.ok) {
            const contentType = response.headers.get('Content-Type');
            // If contentType is null or doesn't include html, it's likely our file
            if (!contentType || !contentType.includes('text/html')) {
              console.log(`Found dataset for ${id} in ${year}`);
              return year;
            }
          }
        } catch (err) {
          return null;
        }
        return null;
      });

      const results = await Promise.all(probes);
      const validYears = results.filter(y => y !== null);
      
      console.log(`Valid years found for ${id}:`, validYears);

      setAvailableYears(validYears);
      setLoading(false);
    };

    probeYears();
  }, [id]);

  if (loading) return <div className="loading">Checking available datasets...</div>;

  return (
    <div className="year-selection-container">
      <Link to="/" className="back-link">
        <FaChevronLeft /> Back to Home
      </Link>
      
      <div className="selection-card">
        <div className="selection-header">
          <FaCalendarAlt className="calendar-icon" />
          <h2>Select Counseling Year</h2>
          <p>Choose the dataset year for <strong>{id.toUpperCase()}</strong> Predictor</p>
        </div>

        {availableYears.length > 0 ? (
          <div className="years-grid">
            {availableYears.map(year => (
              <button 
                key={year} 
                className="year-btn"
                onClick={() => navigate(`/predictor/${id}/${year}`)}
              >
                {year} Edition
              </button>
            ))}
          </div>
        ) : (
          <div className="no-years">
            <p>No datasets found for this predictor in <code>public/data/{id}/</code></p>
            <p className="hint">Please ensure files like 2026.xlsx or 2025.xlsx exist.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YearSelection;
