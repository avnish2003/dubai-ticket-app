import React from 'react';
import './Artists.css';
import NotionCupPreview from '../components/NotionCupPreview';
import art1 from "../assets/art1.avif" 

const Artists: React.FC = () => {

  return (
    <>
      {/* ✅ NotionCupPreview at the top */}
      <NotionCupPreview />

      {/* Line Up Section */}
      <section className="lineup-section">
        {/* Centered Image */}
        <div className="lineup-hero-image">
          <img 
            src={art1}
            alt="Line Up Hero" 
            className="lineup-hero-img"
          />
        </div>

        {/* Bachata Line Up */}
        <div className="lineup-content">
          <h2 className="lineup-title">
            BACHATA LINE UP 2025<br />
            <span className="lineup-subtitle">LATIN NOTION BACHATA FESTIVAL, DUBAI</span>
          </h2>
          
          <div className="lineup-grid bachata-grid">
            {Array.from({ length: 12 }, (_, index) => (
              <div key={`bachata-${index}`} className="lineup-item">
                <img 
                  src={art1} 
                  alt={`Bachata Artist ${index + 1}`}
                  className="lineup-image"
                />
              </div>
            ))}
          </div>

          <h2 className="lineup-title">
            DJ LINE UP 2025<br />
            <span className="lineup-subtitle">LATIN NOTION BACHATA FESTIVAL, DUBAI</span>
          </h2>
          
          <div className="lineup-grid dj-grid">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={`dj-${index}`} className="lineup-item">
                <img 
                  src={art1} 
                  alt={`DJ ${index + 1}`}
                  className="lineup-image"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Artists;
