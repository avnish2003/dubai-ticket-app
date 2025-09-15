import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.avif';
import './About.css';
import jayImg from '../assets/jay.avif';
import jay2Img from '../assets/jay2.avif';
import jay3Img from '../assets/jay3.avif';
import FestivalHighlights from '../components/FestivalHighlights';
import NotionCupPreview from '../components/NotionCupPreview';

const About: React.FC = () => {
  const organizers = [
    {
      name: 'JAY',
      role: 'FOUNDER - LATIN NOTION',
      image: jayImg // Placeholder for Jay's image
    },
    {
      name: 'ELIJAH',
      role: 'ORGANISER - LATIN NOTION DUBAI & UK',
      image: jay2Img // Placeholder for Elijah's image
    },
    {
      name: 'JAOYING',
      role: 'ORGANISER - LATIN NOTION THAILAND',
      image: jay3Img// Placeholder for Jaoying's image
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section with Festival Logo and About Text */}
      <section className="about-hero-section">
        <div className="festival-logo-container">
          <img
            src={logoImg}
            alt="Latin Notion Bachata Festival Logo"
            className="festival-logo"
          />
        </div>
        
        <div className="about-festival-content">
          <h1 className="about-festival-title">ABOUT THE FESTIVAL</h1>
          <div className="about-festival-text">
            <p>
              Latin Notion Bachata Festival an enchanting winter oasis where the sultry rhythms of Caribbean bachata meet Dubai's iconic skyline.. Latin Notion Bachata Festival is a Six-day, season-highlight event, igniting the heart of winter with movement, music, and magic. Founded by dance visionary Jay Bachata, our festival draws passionate bachateros and curious first-timers from around the globe to celebrate connection, creativity, and the joy of dance.
            </p>
          </div>
        </div>
      </section>
      <FestivalHighlights />

      {/* Meet Our Organisers Section */}
      <section className="organizers-section">
        <h2 className="organizers-title">MEET OUR ORGANISERS</h2>
        <div className="organizers-grid">
          {organizers.map((organizer, index) => (
            <motion.div
              key={index}
              className="organizer-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="organizer-image-container">
                <img
                  src={organizer.image}
                  alt={organizer.name}
                  className="organizer-image"
                />
              </div>
              <h3 className="organizer-name">{organizer.name}</h3>
              <p className="organizer-role">{organizer.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NotionCup Preview Section */}
      <section className="notion-cup-section">
        <NotionCupPreview />
      </section>
      </div>
    
  );
};

export default About;
