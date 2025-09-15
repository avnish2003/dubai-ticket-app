import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Music, Camera, Utensils } from 'lucide-react';
import './Festival.css';

const Festival: React.FC = () => {
  const schedule = [
    {
      day: 'Day 1 - Nov 19',
      title: 'Welcome & Opening Ceremony',
      time: '6:00 PM - 10:00 PM',
      location: 'Main Ballroom',
      description: 'Official opening of the festival with welcome speeches, artist introductions, and opening showcase.',
      activities: ['Welcome Reception', 'Artist Showcase', 'Opening Party']
    },
    {
      day: 'Day 2 - Nov 20',
      title: 'Workshops & Masterclasses',
      time: '9:00 AM - 6:00 PM',
      location: 'Workshop Rooms',
      description: 'Intensive workshops with world-class artists covering technique, musicality, and styling.',
      activities: ['Beginner Workshops', 'Intermediate Classes', 'Advanced Masterclasses']
    },
    {
      day: 'Day 3 - Nov 21',
      title: 'Themed Party Night',
      time: '8:00 PM - 2:00 AM',
      location: 'Pool Area',
      description: 'Neon-lit pool party with live DJs and special performances.',
      activities: ['Neon Pool Party', 'Live DJ Sets', 'Special Performances']
    },
    {
      day: 'Day 4 - Nov 22',
      title: 'Notion Cup Competition',
      time: '2:00 PM - 8:00 PM',
      location: 'Competition Hall',
      description: 'The prestigious Jack & Jill competition with amazing prizes.',
      activities: ['Competition Rounds', 'Judging', 'Awards Ceremony']
    },
    {
      day: 'Day 5 - Nov 23',
      title: 'Cultural Fusion Day',
      time: '10:00 AM - 11:00 PM',
      location: 'Various Venues',
      description: 'Experience the blend of Latin and Middle Eastern cultures.',
      activities: ['Cultural Workshops', 'Artisan Market', 'Fusion Performances']
    },
    {
      day: 'Day 6 - Nov 24',
      title: 'Closing Gala & Farewell',
      time: '7:00 PM - 12:00 AM',
      location: 'Grand Ballroom',
      description: 'Elegant closing ceremony with final performances and farewell party.',
      activities: ['Gala Dinner', 'Final Showcases', 'Farewell Party']
    }
  ];

  const highlights = [
    {
      icon: <Users size={40} />,
      title: 'World-Class Artists',
      description: 'Learn from the best international bachata instructors and performers from around the globe.',
      features: ['Masterclasses', 'One-on-one sessions', 'Live performances']
    },
    {
      icon: <Music size={40} />,
      title: 'Immersive Workshops',
      description: 'Daily deep-dives on musicality, partner connection, styling, and performance techniques.',
      features: ['Technique workshops', 'Musicality sessions', 'Performance training']
    },
    {
      icon: <Camera size={40} />,
      title: 'Iconic Venues',
      description: 'Dance in stunning locations including desert sunsets, grand ballrooms, and rooftop terraces.',
      features: ['Desert sessions', 'Ballroom events', 'Rooftop parties']
    },
    {
      icon: <Utensils size={40} />,
      title: 'Cultural Experiences',
      description: 'Discover the perfect blend of Latin and Middle Eastern cultures through food, music, and art.',
      features: ['Fusion cuisine', 'Artisan markets', 'Cultural workshops']
    }
  ];

  return (
    <div className="festival-page">
      <div className="container">
        {/* Hero Section */}
        <motion.section
          className="festival-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-content">
            <h1 className="hero-title">The Festival Experience</h1>
            <p className="hero-subtitle">
              Immerse yourself in 6 days of world-class bachata with international artists, 
              immersive workshops, and unforgettable celebrations in the heart of Dubai.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <Calendar size={24} />
                <div>
                  <h3>6 Days</h3>
                  <p>of non-stop bachata</p>
                </div>
              </div>
              <div className="stat-item">
                <Users size={24} />
                <div>
                  <h3>500+</h3>
                  <p>dancers worldwide</p>
                </div>
              </div>
              <div className="stat-item">
                <MapPin size={24} />
                <div>
                  <h3>Dubai</h3>
                  <p>iconic winter location</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Festival Highlights */}
        <section id="highlights" className="festival-highlights">
          <motion.div
            className="highlights-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Festival Highlights</h2>
            <p className="section-subtitle">
              Discover what makes the Latin Notion Bachata Festival an unforgettable experience
            </p>
          </motion.div>

          <motion.div
            className="highlights-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="highlight-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="highlight-icon">
                  {highlight.icon}
                </div>
                <h3 className="highlight-title">{highlight.title}</h3>
                <p className="highlight-description">{highlight.description}</p>
                <ul className="highlight-features">
                  {highlight.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="festival-schedule">
          <motion.div
            className="schedule-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Festival Schedule</h2>
            <p className="section-subtitle">
              Your complete guide to 6 days of bachata excellence
            </p>
          </motion.div>

          <div className="schedule-timeline">
            {schedule.map((day, index) => (
              <motion.div
                key={index}
                className="schedule-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="timeline-marker">
                  <div className="marker-dot" />
                  <div className="marker-line" />
                </div>
                
                <div className="schedule-content">
                  <div className="schedule-header-info">
                    <h3 className="schedule-day">{day.day}</h3>
                    <h4 className="schedule-title">{day.title}</h4>
                  </div>
                  
                  <div className="schedule-details">
                    <div className="detail-item">
                      <Clock size={16} />
                      <span>{day.time}</span>
                    </div>
                    <div className="detail-item">
                      <MapPin size={16} />
                      <span>{day.location}</span>
                    </div>
                  </div>
                  
                  <p className="schedule-description">{day.description}</p>
                  
                  <div className="schedule-activities">
                    <h5>Activities:</h5>
                    <ul>
                      {day.activities.map((activity, activityIndex) => (
                        <li key={activityIndex}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What's Included */}
        <section className="whats-included">
          <motion.div
            className="included-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">What's Included</h2>
            <p className="section-subtitle">
              Everything you need for an amazing festival experience
            </p>
          </motion.div>

          <motion.div
            className="included-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="included-category">
              <h3>Workshops & Learning</h3>
              <ul>
                <li>All masterclasses and workshops</li>
                <li>Beginner to advanced levels</li>
                <li>One-on-one coaching sessions</li>
                <li>Technique and styling workshops</li>
                <li>Musicality and rhythm training</li>
              </ul>
            </div>
            
            <div className="included-category">
              <h3>Events & Parties</h3>
              <ul>
                <li>Welcome reception and opening ceremony</li>
                <li>Themed party nights</li>
                <li>Neon pool party</li>
                <li>Masquerade gala ball</li>
                <li>Rooftop socials under the stars</li>
                <li>Closing gala and farewell party</li>
              </ul>
            </div>
            
            <div className="included-category">
              <h3>Competition & Shows</h3>
              <ul>
                <li>Notion Cup Jack & Jill competition</li>
                <li>Artist showcases and performances</li>
                <li>Live DJ sets and music</li>
                <li>Photo opportunities with artists</li>
                <li>Certificate of participation</li>
              </ul>
            </div>
            
            <div className="included-category">
              <h3>Cultural Experiences</h3>
              <ul>
                <li>Latin-Middle Eastern fusion cuisine</li>
                <li>Artisan markets and local crafts</li>
                <li>Cultural workshops and activities</li>
                <li>Desert sunset sessions</li>
                <li>Festival welcome bag and merchandise</li>
              </ul>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Festival;
