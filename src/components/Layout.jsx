import React from 'react';
import Navbar from './Navbar';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 Predictor Hub. All rights reserved.</p>
          <p>Providing accurate engineering college predictions.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
