import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo and Social Media */}
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-text">
                <span className="logo-latin">LATIN</span>
                <span className="logo-notion">
                  NoTioN
                  <span className="flame">🔥</span>
                </span>
              </span>
            </div>
            <div className="social-media">
              <div className="social-icons">
                <a 
                  href="https://facebook.com/latinnotion" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="https://instagram.com/latinnotion" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://youtube.com/latinnotion" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              </div>
              <p className="social-text">Follow us on Social Media</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-section">
            <h3 className="footer-title">Navigation</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/festival" className="footer-link">The Festival</Link></li>
              <li><Link to="/artists" className="footer-link">Artists</Link></li>
              <li><Link to="/notion-cup" className="footer-link">Notion Cup</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Social Platforms */}
          <div className="footer-section">
            <h3 className="footer-title">Social</h3>
            <ul className="footer-links">
              <li><a href="https://facebook.com/latinnotion" target="_blank" rel="noopener noreferrer" className="footer-link">Facebook</a></li>
              <li><a href="https://instagram.com/latinnotion" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a></li>
              <li><a href="https://youtube.com/latinnotion" target="_blank" rel="noopener noreferrer" className="footer-link">YouTube</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <div className="contact-info">
              <a href="mailto:info@latinnotion.com" className="contact-item">
                info@latinnotion.com
              </a>
              <a href="tel:+971521430271" className="contact-item">
                +971 521 430271
              </a>
              <p className="contact-item">Dubai, UAE</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2025 ALL RIGHTS RESERVED BY LATIN NOTION (OPC) PRIVATE LIMITED.
            </p>
            <div className="footer-bottom-right">
              <Link to="/terms" className="terms-button">
                Terms & Condition
              </Link>
              <a 
                href="https://wa.me/971521430271" 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-button"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
