import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [showHeader, setShowHeader] = useState(true);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setShowHeader(currentScrollY <= lastScrollY);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect login state via token in localStorage
  useEffect(() => {
    const syncAuthState = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    syncAuthState();
    window.addEventListener('storage', syncAuthState);
    return () => window.removeEventListener('storage', syncAuthState);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (dropdown: string) =>
    setIsDropdownOpen(isDropdownOpen === dropdown ? null : dropdown);

  const isActive = (path: string) => location.pathname === path;

  // Admin Login logic
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId === "admin" && adminPassword === "123456") {
      setShowAdminModal(false);
      setAdminId('');
      setAdminPassword('');
      setAdminError('');
      setIsLoggedIn(true);
      navigate('/admin');
    } else {
      setAdminError('Invalid ID or password.');
    }
  };

  // Always require login first for Buy Tickets
  const handleBuyTicketsClick = () => {
    navigate('/login?redirect=/tickets');
  };

  return (
    <>
    <header className={`header ${isScrolled ? "scrolled" : ""} ${showHeader ? "show" : "hide"}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-text">
              <span className="logo-latin">LATIN</span>
              <span className="logo-notion">
                NoTioN
                <span className="flame">🔥</span>
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>

            <div className="dropdown">
              <button
                className={`nav-link dropdown-toggle ${isActive('/festival') ? 'active' : ''}`}
                onClick={() => toggleDropdown('festival')}
              >
                The Festival <ChevronDown size={16} />
              </button>
              {isDropdownOpen === 'festival' && (
                <div className="dropdown-menu">
                  <Link to="/festival" className="dropdown-item">Festival Overview</Link>
                  <Link to="/festival#highlights" className="dropdown-item">Highlights</Link>
                  <Link to="/festival#schedule" className="dropdown-item">Schedule</Link>
                </div>
              )}
            </div>

            <Link to="/artists" className={`nav-link ${isActive('/artists') ? 'active' : ''}`}>Artists</Link>

            <div className="dropdown">
              <button
                className={`nav-link dropdown-toggle ${isActive('/notion-cup') ? 'active' : ''}`}
                onClick={() => toggleDropdown('notion-cup')}
              >
                Notion Cup <ChevronDown size={16} />
              </button>
              {isDropdownOpen === 'notion-cup' && (
                <div className="dropdown-menu">
                  <Link to="/notion-cup" className="dropdown-item">Competition</Link>
                  <Link to="/notion-cup#rules" className="dropdown-item">Rules</Link>
                  <Link to="/notion-cup#prizes" className="dropdown-item">Prizes</Link>
                </div>
              )}
            </div>

            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>

            {/* Login Dropdown */}
            <div className="dropdown">
              <button
                className={`nav-link dropdown-toggle ${isActive('/login') || isActive('/admin') ? 'active' : ''}`}
                onClick={() => toggleDropdown('login')}
                style={{ minWidth: 0 }}
              >
                Login <ChevronDown size={16} />
              </button>
              {isDropdownOpen === 'login' && (
                <div className="dropdown-menu">
                  <Link to="/login" className="dropdown-item">Login</Link>
                  <button className="dropdown-item" onClick={() => setShowAdminModal(true)}>Login as Admin</button>
                </div>
              )}
            </div>
          </nav>

          {/* CTA Button (Buy Tickets) */}
          <button
            className="btn btn-primary cta-button"
            onClick={handleBuyTicketsClick}
            type="button"
          >
            Buy Tickets
          </button>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Home</Link>

            <div className="mobile-dropdown">
              <button className="mobile-nav-link mobile-dropdown-toggle" onClick={() => toggleDropdown('mobile-festival')}>
                The Festival <ChevronDown size={16} />
              </button>
              {isDropdownOpen === 'mobile-festival' && (
                <div className="mobile-dropdown-menu">
                  <Link to="/festival" className="mobile-dropdown-item" onClick={() => setIsMenuOpen(false)}>Festival Overview</Link>
                  <Link to="/festival#highlights" className="mobile-dropdown-item" onClick={() => setIsMenuOpen(false)}>Highlights</Link>
                  <Link to="/festival#schedule" className="mobile-dropdown-item" onClick={() => setIsMenuOpen(false)}>Schedule</Link>
                </div>
              )}
            </div>

            <Link to="/artists" className={`mobile-nav-link ${isActive('/artists') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Artists</Link>

            <div className="mobile-dropdown">
              <button className="mobile-nav-link mobile-dropdown-toggle" onClick={() => toggleDropdown('mobile-notion-cup')}>
                Notion Cup <ChevronDown size={16} />
              </button>
              {isDropdownOpen === 'mobile-notion-cup' && (
                <div className="mobile-dropdown-menu">
                  <Link to="/notion-cup" className="mobile-dropdown-item" onClick={() => setIsMenuOpen(false)}>Competition</Link>
                  <Link to="/notion-cup#rules" className="mobile-dropdown-item" onClick={() => setIsMenuOpen(false)}>Rules</Link>
                  <Link to="/notion-cup#prizes" className="mobile-dropdown-item" onClick={() => setIsMenuOpen(false)}>Prizes</Link>
                </div>
              )}
            </div>

            <Link to="/about" className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Contact</Link>

            {/* Mobile Login Dropdown */}
            <div className="mobile-dropdown">
              <button className="mobile-nav-link mobile-dropdown-toggle" onClick={() => toggleDropdown('mobile-login')}>
                Login <ChevronDown size={16} />
              </button>
              {isDropdownOpen === 'mobile-login' && (
                <div className="mobile-dropdown-menu">
                  <Link to="/login" className="mobile-dropdown-item" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <button className="mobile-dropdown-item" onClick={() => { setIsMenuOpen(false); setShowAdminModal(true); }}>Login as Admin</button>
                </div>
              )}
            </div>

            <button
              className="btn btn-primary mobile-cta"
              onClick={() => { setIsMenuOpen(false); handleBuyTicketsClick(); }}
              type="button"
            >
              Buy Tickets
            </button>
          </div>
        )}
      </div>
    </header>

    {/* Admin Login Modal */}
    {showAdminModal && (
      <div className="admin-modal" style={{
        position: "fixed",
        top: "0", left: "0", width: "100vw", height: "100vh",
        background: "rgba(0,0,0,0.6)", display: "flex",
        justifyContent: "center", alignItems: "center", zIndex: 1100
      }}>
        <form
          style={{
            background: "#212121",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
            minWidth: "320px",
            display: "flex", flexDirection: "column", gap: "1rem"
          }}
          onSubmit={handleAdminLogin}
        >
          <h2 style={{ color: "#F59E0B", textAlign: "center" }}>Admin Login</h2>
          <input
            type="text"
            placeholder="Admin ID"
            value={adminId}
            onChange={e => setAdminId(e.target.value)}
            style={{
              padding: "0.75rem 1rem",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "1px solid #6B46C1"
            }}
            autoFocus
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={adminPassword}
            onChange={e => setAdminPassword(e.target.value)}
            style={{
              padding: "0.75rem 1rem",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "1px solid #6B46C1"
            }}
          />
          {adminError && <div style={{ color: "#EF4444", textAlign: "center" }}>{adminError}</div>}
          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #F59E0B, #6B46C1)",
              color: "#fff",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "none",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer"
            }}
          >
            Login as Admin
          </button>
          <button
            type="button"
            style={{
              background: "transparent",
              color: "#9CA3AF",
              border: "none",
              padding: "0.5rem",
              cursor: "pointer",
              textDecoration: "underline"
            }}
            onClick={() => { setShowAdminModal(false); setAdminError(''); setAdminId(''); setAdminPassword(''); }}
          >
            Cancel
          </button>
        </form>
      </div>
    )}
    </>
  );
};

export default Header;
