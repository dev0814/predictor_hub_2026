import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './Home.css';

const predictorCards = [
  {
    id: 'neet',
    title: 'NEET UG Predictor',
    description: 'Predict MBBS/BDS colleges based on NEET UG ranks for medical and dental admissions.',
    color: '#8e44ad',
  },
  {
    id: 'josaa',
    title: 'JoSAA Predictor',
    description: 'Predict IIT, NIT, IIIT, and GFTI colleges based on JEE Advanced ranks.',
    color: '#3498db',
  },
  {
    id: 'csab',
    title: 'CSAB Predictor',
    description: 'Special round counseling for NITs, IIITs, and GFTIs based on JEE Main ranks.',
    color: '#2ecc71',
  },
  {
    id: 'aktu',
    title: 'AKTU Predictor',
    description: 'Counseling for engineering colleges in Uttar Pradesh (UPTU/AKTU).',
    color: '#e67e22',
  },
  {
    id: 'jac-delhi',
    title: 'JAC Delhi Predictor',
    description: 'Counseling for DTU, NSUT, IIITD, and IGDTUW.',
    color: '#9b59b6',
  },
  {
    id: 'wbjee',
    title: 'WBJEE Predictor',
    description: 'Counseling for engineering colleges in West Bengal.',
    color: '#e74c3c',
  },
  {
    id: 'hbtu',
    title: 'HBTU Predictor',
    description: 'Harcourt Butler Technical University admission predictor.',
    color: '#1abc9c',
  },
  {
    id: 'ipu',
    title: 'IPU Predictor',
    description: 'Counseling for Guru Gobind Singh Indraprastha University, Delhi.',
    color: '#34495e',
  },
  {
    id: 'jac-chandigarh',
    title: 'JAC Chandigarh Predictor',
    description: 'Counseling for engineering colleges in Chandigarh.',
    color: '#f1c40f',
  },
  {
    id: 'mpdte',
    title: 'MPDTE Predictor',
    description: 'Counseling for engineering colleges in Madhya Pradesh.',
    color: '#d35400',
  },
  {
    id: 'ptu',
    title: 'PTU Predictor',
    description: 'Counseling for I.K. Gujral Punjab Technical University.',
    color: '#2980b9',
  },
  {
    id: 'reap',
    title: 'REAP Predictor',
    description: 'Rajasthan Engineering Admission Process predictor.',
    color: '#16a085',
  }
];

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Predictor Hub</h1>
        <p>Unified platform for all engineering college counseling predictions using official yearly datasets.</p>
      </header>

      <div className="predictor-grid">
        {predictorCards.map((card) => (
          <div key={card.id} className="predictor-card" style={{ '--card-color': card.color }}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <Link to={`/select-year/${card.id}`} className="card-link">
              Open Predictor <FaArrowRight />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
