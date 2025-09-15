import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Users, Award, Calendar, Star, Target } from 'lucide-react';
import './NotionCup.css';

const NotionCup: React.FC = () => {
  const navigate = useNavigate();
  const prizes = [
    {
      place: '1st Place',
      prize: '$5,000',
      description: 'Championship trophy, cash prize, and exclusive workshop with featured artists',
      icon: <Trophy size={32} />
    },
    {
      place: '2nd Place',
      prize: '$3,000',
      description: 'Runner-up trophy, cash prize, and festival merchandise package',
      icon: <Award size={32} />
    },
    {
      place: '3rd Place',
      prize: '$1,500',
      description: 'Third place trophy, cash prize, and VIP access to next year\'s festival',
      icon: <Star size={32} />
    }
  ];

  const rules = [
    'Open to all skill levels - beginners to professionals',
    'Jack & Jill format - random partner assignment',
    'Must be 18+ years old to participate',
    'Registration closes 24 hours before competition',
    'No choreography - improvisation only',
    'Judged on technique, musicality, connection, and creativity',
    'Maximum 200 participants (first come, first served)',
    'Valid festival ticket required for participation'
  ];

  const schedule = [
    {
      time: '2:00 PM',
      event: 'Registration & Warm-up',
      description: 'Final registration and warm-up session'
    },
    {
      time: '3:00 PM',
      event: 'Preliminary Rounds',
      description: 'First elimination rounds with all participants'
    },
    {
      time: '5:00 PM',
      event: 'Semi-Finals',
      description: 'Top 32 couples advance to semi-finals'
    },
    {
      time: '6:30 PM',
      event: 'Finals',
      description: 'Top 8 couples compete for the championship'
    },
    {
      time: '7:30 PM',
      event: 'Awards Ceremony',
      description: 'Prize distribution and celebration'
    }
  ];

  return (
    <div className="notion-cup-page">
      <div className="container">
        {/* Hero Section */}
        <motion.section
          className="cup-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-notion">
                NoTioN
                <span className="flame">🔥</span>
              </span>
              <span className="title-cup">CUP</span>
            </h1>
            <p className="hero-subtitle">JACK & JILL COMPETITION</p>
            <p className="hero-description">
              Experience one of the best dance competitions in Dubai, UAE. 
              Showcase your skills and compete with dancers from around the world.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <Trophy size={24} />
                <div>
                  <h3>$9,500</h3>
                  <p>Total Prize Pool</p>
                </div>
              </div>
              <div className="stat-item">
                <Users size={24} />
                <div>
                  <h3>200</h3>
                  <p>Max Participants</p>
                </div>
              </div>
              <div className="stat-item">
                <Calendar size={24} />
                <div>
                  <h3>Nov 22</h3>
                  <p>Competition Date</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Competition Info */}
        <section className="competition-info">
          <motion.div
            className="info-grid"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="info-card">
              <Target size={40} />
              <h3>Competition Format</h3>
              <p>Jack & Jill format with random partner assignment. No choreography allowed - pure improvisation and connection.</p>
            </div>
            
            <div className="info-card">
              <Users size={40} />
              <h3>Open to All Levels</h3>
              <p>Whether you're a beginner or professional, everyone is welcome to participate and showcase their skills.</p>
            </div>
            
            <div className="info-card">
              <Award size={40} />
              <h3>Amazing Prizes</h3>
              <p>Win cash prizes, trophies, and exclusive experiences. Total prize pool of $9,500 up for grabs.</p>
            </div>
          </motion.div>
        </section>

        {/* Prizes Section */}
        <section id="prizes" className="prizes-section">
          <motion.div
            className="prizes-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Competition Prizes</h2>
            <p className="section-subtitle">
              Amazing prizes await the winners of the Notion Cup competition
            </p>
          </motion.div>

          <motion.div
            className="prizes-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {prizes.map((prize, index) => (
              <motion.div
                key={index}
                className="prize-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="prize-icon">
                  {prize.icon}
                </div>
                <h3 className="prize-place">{prize.place}</h3>
                <div className="prize-amount">{prize.prize}</div>
                <p className="prize-description">{prize.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Rules Section */}
        <section id="rules" className="rules-section">
          <motion.div
            className="rules-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Competition Rules</h2>
            <p className="section-subtitle">
              Important rules and guidelines for all participants
            </p>
          </motion.div>

          <motion.div
            className="rules-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="rules-grid">
              {rules.map((rule, index) => (
                <div key={index} className="rule-item">
                  <div className="rule-number">{index + 1}</div>
                  <p className="rule-text">{rule}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Schedule Section */}
        <section className="schedule-section">
          <motion.div
            className="schedule-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Competition Schedule</h2>
            <p className="section-subtitle">
              Timeline for the Notion Cup competition day
            </p>
          </motion.div>

          <motion.div
            className="schedule-timeline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                className="schedule-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="schedule-time">{item.time}</div>
                <div className="schedule-content">
                  <h4 className="schedule-event">{item.event}</h4>
                  <p className="schedule-description">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Registration CTA */}
        <motion.section
          className="registration-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="cta-content">
            <h2>Ready to Compete?</h2>
            <p>Register now for the Notion Cup Jack & Jill competition and showcase your bachata skills!</p>
            <div className="cta-buttons">
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate('/login?redirect=/tickets');
                }}
              >
                Register Now
              </button>
              <a href="/contact" className="btn btn-secondary">Ask Questions</a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default NotionCup;
