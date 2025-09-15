import React from 'react';
import img1 from '../assets/img1.avif';
import img2 from '../assets/img2.avif';
import img3 from '../assets/img3.avif';
import img4 from '../assets/img4.avif';
import './ArtistShowcase.css';

const artists = [
  { name: "Cornel & Rithika", img: img1 },
  { name: "Ronald & Alba", img: img2 },
  { name: "Korke & Judith", img: img3 },
  { name: "Leano & Aante", img: img4 }
];

const ArtistShowcase: React.FC = () => (
  <div className="artist-cards-section">
    <h2 className="artist-cards-title">CHECK OUT OUR TOP ARTISTS</h2>
    <div className="artist-cards-row">
      {artists.map((artist, i) => (
        <div className="artist-card" key={i}>
          <img src={artist.img} alt={artist.name} className="artist-img" />
          <div className="artist-name">{artist.name}</div>
        </div>
      ))}
    </div>
  </div>
);

export default ArtistShowcase;
