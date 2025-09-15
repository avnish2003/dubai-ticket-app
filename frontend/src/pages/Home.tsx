import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Award, Music } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';
import ArtistShowcase from '../components/ArtistShowcase';
import FestivalHighlights from '../components/FestivalHighlights';
import NotionCupPreview from '../components/NotionCupPreview';
import PhaseOneBanner from '../components/PhaseOneBanner';
import './Home.css';

const Home: React.FC = () => {
  const [stars, setStars] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number }>
  >([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3,
      }));
      setStars(newStars);
    };
    generateStars();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="home">
      <div className="starfield">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <section className="hero">
        <div className="container">
          <motion.div className="hero-content" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className="hero-text" variants={itemVariants}>
              <img src={require("../assets/logo.avif")} alt="Festival Hero" className="hero-logo" />
            </motion.div>

            <div className="event-dates">
              <Calendar className="date-icon" />
              <span>
                <span className="date-white">NOV</span> 19TH - 24TH <span className="date-white">2025</span>
              </span>
            </div>
          </motion.div>

          <motion.div className="hero-countdown" variants={itemVariants}>
            <CountdownTimer targetDate="2025-11-19T00:00:00" />
          </motion.div>

          <motion.div className="hero-cta" variants={itemVariants}>
            <Link to="/login?redirect=/tickets" className="btn btn-primary btn-large">
              Buy Tickets Now
            </Link>
            <Link to="/festival" className="btn btn-secondary btn-large">
              Learn More
            </Link>
          </motion.div>
        </div>
      </section> 

      <ArtistShowcase />

      <NotionCupPreview />

      <FestivalHighlights />

      <PhaseOneBanner onBuyTicketsClick={() => { /* will be handled inside to enforce login */ }} />

      <section className="quick-info">
        <div className="container">
          <motion.div className="info-grid" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="info-card">
              <div className="info-icon">
                <MapPin size={32} />
              </div>
              <h3>Location</h3>
              <p>Dubai, UAE</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Users size={32} />
              </div>
              <h3>Participants</h3>
              <p>500+ Dancers</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Award size={32} />
              </div>
              <h3>International</h3>
              <p>World-Class Artists</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Music size={32} />
              </div>
              <h3>Experience</h3>
              <p>6 Days of Bachata</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
