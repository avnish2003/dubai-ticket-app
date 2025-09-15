import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Festival from './pages/Festival';
import Artists from './pages/Artists';
import NotionCup from './pages/NotionCup';
import About from './pages/About';
import Contact from './pages/Contact';
import Ticketing from './pages/Ticketing';
import Login from './pages/Login';
import Booking from './pages/Booking';
import AdminPanel from './pages/AdminPanel';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/festival" element={<Festival />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/notion-cup" element={<NotionCup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tickets" element={<Ticketing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1F2937',
              color: '#FFFFFF',
              border: '1px solid #6B46C1',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
