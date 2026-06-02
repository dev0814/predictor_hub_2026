import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import YearSelection from './pages/YearSelection';
import PredictorPage from './pages/PredictorPage';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select-year/:id" element={<YearSelection />} />
          <Route path="/predictor/:id/:year" element={<PredictorPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
