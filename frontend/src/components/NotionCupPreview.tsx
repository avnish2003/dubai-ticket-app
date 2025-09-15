import React from 'react';
import { Link } from 'react-router-dom';
import './NotionCupPreview.css';

const NotionCupPreview: React.FC = () => (
  <section className="notion-cup-banner">
    <div className="cup-bg">
      <div className="cup-content">
        <h2 className="notion-title">NOTION CUP</h2>
        <h3 className="notion-subtitle">JACK & JILL COMPETITION</h3>
        <p className="notion-desc">
          Experience one of the best dance competitions in Dubai, UAE.
        </p>
        <Link to="/notion-cup" className="notion-cta">
          Register Now!
        </Link>
      </div>
    </div>
  </section>
);

export default NotionCupPreview;
