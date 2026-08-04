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
              <Link to="select-year/neet">NEET</Link>
              <Link to="select-year/josaa">JoSAA</Link>
              <Link to="select-year/csab">CSAB</Link>
              <Link to="select-year/aktu">AKTU</Link>
              <Link to="select-year/jac-delhi">JAC Delhi</Link>
              <Link to="select-year/hbtu">HBTU</Link>
              <Link to="select-year/wbjee">WBJEE</Link>
              <Link to="select-year/jac-chandigarh">JAC Chandigarh</Link>
              <Link to="select-year/ipu">IPU</Link>
              <Link to="select-year/ptu">PTU</Link>
              <Link to="select-year/mpdte">MPDTE</Link>
              <Link to="select-year/reap">REAP</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
