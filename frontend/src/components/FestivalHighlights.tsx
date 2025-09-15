import React from 'react';
import './FestivalHighlights.css';

const FestivalHighlights: React.FC = () => (
  <section className="festival-highlights-section">
    <div className="festival-container">
      {/* Left side gallery */}
      <div className="gallery-grid">
        <div className="gallery-image" id="gallery-img-1">
          <img src="/images/img1.jpg" alt="Festival Group 1" />
        </div>
        <div className="gallery-image" id="gallery-img-2">
          <img src="/images/img2.jpg" alt="Festival Group 2" />
        </div>
        <div className="gallery-video">
          <video src="/videos/festival.mp4" controls autoPlay muted loop />
        </div>
        <div className="gallery-image" id="gallery-img-3">
          <img src="/images/img3.jpg" alt="Festival Group 3" />
        </div>
        <div className="gallery-image" id="gallery-img-4">
          <img src="/images/img4.jpg" alt="Festival Group 4" />
        </div>
      </div>

      {/* Right side text */}
      <div className="festival-text">
        <h2>FESTIVAL HIGHLIGHTS</h2>
        <p className="subtitle">Why you can’t miss Latin Notion Bachata Festival?</p>
        <ul>
          <li>
            <strong>World-Class International Artists:</strong> Masterclasses, workshops,
            showcases, and one-on-one coaching with top-tier instructors and performers flown
            in from across the globe.
          </li>
          <li>
            <strong>Themed Celebration Parties:</strong> Dive into a lineup of nightly
            events—neon-lit pool parties, masquerade gala balls, rooftop vibes under the stars,
            and intimate desert-lantern socials.
          </li>
          <li>
            <strong>Immersive Workshops & Panels:</strong> Daily deep-dives on musicality,
            partner connection, styling, and performance—from choreography labs to DJ-curated
            social dance sessions.
          </li>
          <li>
            <strong>Cultural Fusion Experiences:</strong> Indulge in Latin-Middle Eastern
            culinary pop-ups, artisan markets, and live percussion showcases that add flavour to
            every dance break.
          </li>
          <li>
            <strong>Iconic Winter Backdrops:</strong> Dance beneath dramatic desert sunsets,
            spin in grand pillar-free ballrooms, and catch the winter breeze on our rooftop
            terrace—every setting tailor-made for epic photo moments.
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default FestivalHighlights;
