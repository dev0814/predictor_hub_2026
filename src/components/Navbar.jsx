import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaGraduationCap className="logo-icon" />
          <span>Predictor Hub</span>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item dropdown">
            <span className="nav-links">Predictors</span>
            <div className="dropdown-content">
              <Link to="/predictor/josaa">JoSAA</Link>
              <Link to="/predictor/csab">CSAB</Link>
              <Link to="/predictor/aktu">AKTU</Link>
              <Link to="/predictor/jac-delhi">JAC Delhi</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
