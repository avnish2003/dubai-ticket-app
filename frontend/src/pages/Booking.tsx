import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Booking.css';

interface Ticket {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  category: string;
  features: string[];
  availableQuantity: number;
  image: string;
}

interface BookingData {
  tickets: Array<{
    ticketId: string;
    quantity: number;
  }>;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  eventDate: string;
  notes: string;
}

const Booking: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState<BookingData>({
    tickets: [],
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    },
    eventDate: '',
    notes: ''
  });
  const [selectedTickets, setSelectedTickets] = useState<{[key: string]: number}>({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTickets();
    loadUserData();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [selectedTickets, tickets]);

  const fetchTickets = async () => {
    try {
      const response = await fetch('https://dubai-ticket-app-1.onrender.com/api/tickets');
      const data = await response.json();
      
      if (data.success) {
        setTickets(data.data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setBookingData(prev => ({
        ...prev,
        contactInfo: {
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || ''
        }
      }));
    }
  };

  const calculateTotal = () => {
    let total = 0;
    Object.entries(selectedTickets).forEach(([ticketId, quantity]) => {
      const ticket = tickets.find(t => t._id === ticketId);
      if (ticket && quantity > 0) {
        total += ticket.price * quantity;
      }
    });
    setTotalAmount(total);
  };

  const handleTicketChange = (ticketId: string, quantity: number) => {
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: quantity
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('contactInfo.')) {
      const field = name.split('.')[1];
      setBookingData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [field]: value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please login to book tickets');
      setLoading(false);
      return;
    }

    // Prepare booking data
    const ticketsToBook = Object.entries(selectedTickets)
      .filter(([_, quantity]) => quantity > 0)
      .map(([ticketId, quantity]) => ({ ticketId, quantity }));

    if (ticketsToBook.length === 0) {
      setMessage('Please select at least one ticket');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://dubai-ticket-app-1.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...bookingData,
          tickets: ticketsToBook,
          paymentMethod: 'stripe'
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Booking created successfully! Redirecting to payment...');
        // Here you would integrate with Stripe for payment
        console.log('Payment client secret:', data.data.clientSecret);
      } else {
        setMessage(data.message || 'Booking failed');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="booking-page">
        <div className="loading">Loading tickets...</div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <motion.div
          className="booking-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Book Your Festival Tickets</h1>
          <p>Choose your tickets and secure your spot at the Latin Notion Bachata Festival</p>
        </motion.div>

        <div className="booking-content">
          <motion.div
            className="tickets-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Available Tickets</h2>
            <div className="tickets-grid">
              {tickets.map((ticket) => (
                <div key={ticket._id} className="ticket-card">
                  <div className="ticket-header">
                    <h3>{ticket.name}</h3>
                    <div className="ticket-price">
                      <span className="current-price">${ticket.price}</span>
                      {ticket.discount > 0 && (
                        <span className="original-price">${ticket.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="ticket-description">{ticket.description}</p>
                  
                  <ul className="ticket-features">
                    {ticket.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  
                  <div className="ticket-quantity">
                    <label>Quantity:</label>
                    <select
                      value={selectedTickets[ticket._id] || 0}
                      onChange={(e) => handleTicketChange(ticket._id, parseInt(e.target.value))}
                    >
                      {[...Array(ticket.availableQuantity + 1)].map((_, i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                  
                  {ticket.discount > 0 && (
                    <div className="discount-badge">
                      {ticket.discount}% OFF
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="booking-form-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleBooking} className="booking-form">
              <h2>Booking Information</h2>
              
              <div className="form-group">
                <label htmlFor="contactInfo.name">Full Name</label>
                <input
                  type="text"
                  name="contactInfo.name"
                  value={bookingData.contactInfo.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contactInfo.email">Email</label>
                <input
                  type="email"
                  name="contactInfo.email"
                  value={bookingData.contactInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contactInfo.phone">Phone</label>
                <input
                  type="tel"
                  name="contactInfo.phone"
                  value={bookingData.contactInfo.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="eventDate">Event Date</label>
                <input
                  type="date"
                  name="eventDate"
                  value={bookingData.eventDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="notes">Special Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={bookingData.notes}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              
              <div className="booking-summary">
                <h3>Booking Summary</h3>
                <div className="summary-tickets">
                  {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
                    if (quantity === 0) return null;
                    const ticket = tickets.find(t => t._id === ticketId);
                    if (!ticket) return null;
                    
                    return (
                      <div key={ticketId} className="summary-item">
                        <span>{ticket.name} x {quantity}</span>
                        <span>${ticket.price * quantity}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="summary-total">
                  <span>Total Amount:</span>
                  <span>${totalAmount}</span>
                </div>
              </div>
              
              <button type="submit" className="book-btn" disabled={loading || totalAmount === 0}>
                {loading ? 'Processing...' : `Book Now - $${totalAmount}`}
              </button>
            </form>
          </motion.div>
        </div>

        {message && (
          <motion.div
            className={`message ${message.includes('successful') ? 'success' : 'error'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Booking;




