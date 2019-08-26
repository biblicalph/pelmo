import React from 'react';
import 'App/components/footer/footer.css';

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer-container">
      <p className="footer-text">&copy; {currentYear}. Weather App. All Rights Reserved.</p>
    </footer>
  )
};

export default Footer;