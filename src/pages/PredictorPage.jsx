import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import './PredictorPage.css';

// Pre-define the lazy components to help Vite's static analysis
const predictors = {
  'neet': lazy(() => import('../predictors/neet/Neet.jsx')),
  'josaa': lazy(() => import('../predictors/josaa/Josaa.jsx')),
  'csab': lazy(() => import('../predictors/csab/Csab.jsx')),
  'aktu': lazy(() => import('../predictors/aktu/Aktu.jsx')),
  'jac-delhi': lazy(() => import('../predictors/jac-delhi/Jac-delhi.jsx')),
  'wbjee': lazy(() => import('../predictors/wbjee/Wbjee.jsx')),
  'hbtu': lazy(() => import('../predictors/hbtu/Hbtu.jsx')),
  'ipu': lazy(() => import('../predictors/ipu/Ipu.jsx')),
  'jac-chandigarh': lazy(() => import('../predictors/jac-chandigarh/Jac-chandigarh.jsx')),
  'mpdte': lazy(() => import('../predictors/mpdte/Mpdte.jsx')),
  'ptu': lazy(() => import('../predictors/ptu/Ptu.jsx')),
  'reap': lazy(() => import('../predictors/reap/Reap.jsx')),
};

const PredictorPage = () => {
  const { id, year } = useParams();
  const PredictorComponent = predictors[id];

  if (!PredictorComponent) {
    return (
      <div className="error-container">
        <h2>Oops!</h2>
        <p>Predictor "{id}" is not implemented yet.</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="predictor-page">
      <Suspense fallback={<div className="loading">Loading Predictor Data...</div>}>
        <PredictorComponent year={year} />
      </Suspense>
    </div>
  );
};

export default PredictorPage;
