import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CountdownTimer.css';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        setIsExpired(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className="countdown-expired">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="expired-message"
        >
          <h3>🎉 Festival Started!</h3>
          <p>Join us now for the Latin Notion Bachata Festival!</p>
        </motion.div>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="countdown-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="countdown-wrapper"
      >
        <div className="countdown-display">
          <div className="countdown-numbers">
            <span className="countdown-number">{timeLeft.days.toString().padStart(2, '0')}</span>
            <span className="countdown-separator">:</span>
            <span className="countdown-number">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="countdown-separator">:</span>
            <span className="countdown-number">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="countdown-separator">:</span>
            <span className="countdown-number">{timeLeft.seconds.toString().padStart(2, '0')}</span>
          </div>
          <div className="countdown-labels">
            <span className="countdown-label">Days</span>
            <span className="countdown-label">Hours</span>
            <span className="countdown-label">Minutes</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>
        <motion.div
          className="countdown-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p>Don't miss out on the biggest bachata event of the year!</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CountdownTimer;
