import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PhaseOneBanner.css';

interface PhaseOneBannerProps {
  onBuyTicketsClick: () => void;
}

const PhaseOneBanner: React.FC<PhaseOneBannerProps> = ({ onBuyTicketsClick }) => {
  return (
    <motion.section
      className="phase-banner"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <div className="banner-content">
          <div className="banner-background">
            <div className="fireworks">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className={`firework firework-${i + 1}`} />
              ))}
            </div>
            <div className="balloons">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className={`balloon balloon-${i + 1}`} />
              ))}
            </div>
          </div>

          <div className="banner-text">
            <motion.div
              className="discount-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="discount-title">
                UPTO <span className="flame-text">40% OFF</span>
              </h2>
              <p className="discount-subtitle">GET 1ST PHASE DISCOUNT</p>
              <p className="discount-description">
                Latin Notion is celebrating Phase 1 of 3rd Edition of Dubai Festival. 
                Book your tickets before the price goes up.
              </p>
              <a
                href="/login?redirect=/tickets"
                className="btn btn-primary banner-cta"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/login?redirect=/tickets';
                }}
              >
                Buy Tickets
              </a>
            </motion.div>
          </div>

          <motion.div
            className="phase-text"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="phase-number">
              <span className="phase-label">PHASE</span>
              <span className="phase-digit">1</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default PhaseOneBanner;
