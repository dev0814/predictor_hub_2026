import React, { useState, useEffect, useMemo, useRef } from 'react';
import { readExcelFile, getUniqueValues } from '../../utils/excelParser';
import { generatePDF } from '../../utils/pdfGenerator';
import InitialForm from '../../components/InitialForm';
import FilterSection from '../../components/FilterSection';
import ResultTable from '../../components/ResultTable';
import './GenericPredictor.css';

const GenericPredictor = ({ config, year }) => {
  const resultsRef = useRef(null);
  const [rawData, setRawData] = useState([]);
  const [predictedResults, setPredictedResults] = useState([]);
  const [finalResults, setFinalResults] = useState([]);
  const [primaryFilters, setPrimaryFilters] = useState({});
  const [secondaryFilters, setSecondaryFilters] = useState({});
  const [primaryFilterConfig, setPrimaryFilterConfig] = useState([]);
  const [isPredicted, setIsPredicted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'Closing Rank', direction: 'asc' });

  // Load Initial Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct dynamic path based on predictor name and year
        const datasetPath = `/data/${config.id}/${year}.xlsx`;
        const data = await readExcelFile(datasetPath);
        setRawData(data);
        
        // Setup Primary Filter Config (Stage 1)
        const pConfig = config.primaryFilters.map(f => {
          if (f.type === 'select') {
            return { ...f, options: getUniqueValues(data, f.key) };
          }
          return f;
        });
        setPrimaryFilterConfig(pConfig);
        setLoading(false);
      } catch (error) {
        console.error(`Error loading ${config.title} data for year ${year}:`, error);
        setLoading(false);
      }
    };

    if (year && config.id) {
      fetchData();
    }
  }, [config, year]);

  // Handle Prediction (Stage 1 Submit)
  const handlePredict = () => {
    let results = [...rawData];

    // Apply Predictor-Specific Logic if defined, otherwise use generic rank-based logic
    if (config.predictionLogic) {
      results = config.predictionLogic(results, primaryFilters);
    } else {
      // Default Generic Logic
      Object.entries(primaryFilters).forEach(([key, value]) => {
        if (!value || value === 'All') return;

        const filterCfg = config.primaryFilters.find(f => f.key === key);
        if (filterCfg && filterCfg.type === 'number') {
          const numValue = parseInt(value);
          if (!isNaN(numValue)) {
            // Standard Rank Prediction: Closing Rank >= User Rank
            results = results.filter(item => parseInt(item[key]) >= numValue);
          }
        } else {
          results = results.filter(item => {
            const itemVal = item[key] ? item[key].toString().trim().toLowerCase() : '';
            const filterVal = value ? value.toString().trim().toLowerCase() : '';
            return itemVal === filterVal;
          });
        }
      });
    }

    setPredictedResults(results);
    setFinalResults(results);
    setIsPredicted(true);
    setSecondaryFilters({}); // Reset secondary filters when new prediction is made

    // Scroll to results after a short delay to allow rendering
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Dynamic Secondary Filter Config (Stage 2)
  // For each filter, calculate options based on current selections of OTHER filters
  const secondaryFilterConfig = useMemo(() => {
    if (!isPredicted) return [];

    return config.secondaryFilters.map(filterCfg => {
      // 1. Get all secondary selections EXCEPT for the current filter
      const otherFilters = { ...secondaryFilters };
      delete otherFilters[filterCfg.key];

      // 2. Filter predictedResults by these other selections
      let intermediateData = [...predictedResults];
      Object.entries(otherFilters).forEach(([key, values]) => {
        if (values && values.length > 0) {
          intermediateData = intermediateData.filter(item => {
            const itemVal = item[key] ? item[key].toString().trim() : '';
            return values.includes(itemVal);
          });
        }
      });

      // 3. Get unique values for current filter from the intermediate data
      const options = getUniqueValues(intermediateData, filterCfg.key);
      
      return {
        ...filterCfg,
        options
      };
    });
  }, [config.secondaryFilters, predictedResults, secondaryFilters, isPredicted]);

  // Calculate Final Results (Stage 2)
  useEffect(() => {
    if (!isPredicted) return;

    let results = [...predictedResults];
    
    // Apply Multi-select Secondary Filters
    Object.entries(secondaryFilters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        results = results.filter(item => {
          const itemVal = item[key] ? item[key].toString().trim() : '';
          return values.includes(itemVal);
        });
      }
    });

    // Apply Sorting
    if (sortConfig.key) {
      results.sort((a, b) => {
        const valA = parseInt(a[sortConfig.key]) || 0;
        const valB = parseInt(b[sortConfig.key]) || 0;
        return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
      });
    }

    setFinalResults(results);
  }, [secondaryFilters, predictedResults, isPredicted, sortConfig]);

  const handlePrimaryFilterChange = (key, value) => {
    setPrimaryFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSecondaryFilterChange = (key, values) => {
    setSecondaryFilters(prev => ({ ...prev, [key]: values }));
  };

  const handleReset = () => {
    setPrimaryFilters({});
    setSecondaryFilters({});
    setPredictedResults([]);
    setFinalResults([]);
    setIsPredicted(false);
  };

  const toggleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleDownload = () => {
    // Extract details for the dynamic filename
    const predictorName = `${config.id.toUpperCase()}_${year}`;
    const candidateName = (primaryFilters.Username || 'Candidate').replace(/\s+/g, '_');
    const jeeRank = primaryFilters['Closing Rank'] || primaryFilters['CRL Rank'] || '0';
    const seatType = (primaryFilters['Seat Type'] || primaryFilters['Category'] || 'General').replace(/\s+/g, '_');
    const state = (primaryFilters['Institute State'] || primaryFilters['Home State'] || primaryFilters['Quota'] || primaryFilters['Homestate'] || 'AI').replace(/\s+/g, '_');

    const fileName = `CareerSync_${predictorName}_${candidateName}_${jeeRank}_${seatType}_${state}.pdf`;

    generatePDF(
      `${config.title} (${year})`,
      config.columns,
      finalResults,
      fileName,
      primaryFilters
    );
  };

  if (loading) return <div className="loading">Loading {config.title} {year} Data...</div>;

  return (
    <div className="predictor-module">
      <div className="module-header">
        <h2>{config.title} - {year} Edition</h2>
        <p>Fill in your details to predict eligible colleges. You can refine the results below after prediction.</p>
      </div>

      <InitialForm 
        filters={primaryFilters}
        filterConfig={primaryFilterConfig}
        onFilterChange={handlePrimaryFilterChange}
        onSubmit={handlePredict}
        onReset={handleReset}
      />

      {isPredicted && (
        <div className="results-stage" ref={resultsRef}>
          <FilterSection 
            filters={secondaryFilters}
            filterConfig={secondaryFilterConfig}
            onFilterChange={handleSecondaryFilterChange}
            onReset={() => setSecondaryFilters({})}
          />

          <ResultTable 
            data={finalResults}
            columns={config.columns}
            onDownload={handleDownload}
            onSort={toggleSort}
            sortConfig={sortConfig}
          />
        </div>
      )}
    </div>
  );
};

export default GenericPredictor;
