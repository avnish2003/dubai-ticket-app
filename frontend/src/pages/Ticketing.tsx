import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Star, Users, Calendar, MapPin, CreditCard, Shield, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import './Ticketing.css';
import NotionCupPreview from '../components/NotionCupPreview';

interface TicketType {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
  totalQuantity: number;
  soldQuantity: number;
  discount: number;
  isActive: boolean;
  category?: string;
  availableQuantity?: number;
}

interface BookingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  quantity: number;
  specialRequests?: string;
}

const Ticketing: React.FC = () => {
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<BookingForm>();
  const quantity = watch('quantity', 1);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://dubai-ticket-app-3.onrender.com/api/tickets');
        const data = await response.json();
        if (data.success) {
          setTicketTypes(data.data);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error fetching tickets:', e);
      } finally {
        setLoadingTickets(false);
      }
    };
    fetchTickets();
  }, []);

  const handleTicketSelect = (ticket: TicketType) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate(`/login?redirect=/tickets`);
      return;
    }

    setSelectedTicket(ticket);
    setShowBookingForm(true);
    reset({ quantity: 1, firstName: '', lastName: '', email: '', phone: '' });
  };

  const onSubmit = async (data: BookingForm) => {
    if (!selectedTicket) return;
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login?redirect=/tickets');
      return;
    }
    setIsProcessing(true);
    try {
      const response = await fetch('https://dubai-ticket-app-3.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tickets: [{ ticketId: selectedTicket._id, quantity: data.quantity }],
          paymentMethod: 'stripe',
          contactInfo: {
            name: `${data.firstName} ${data.lastName}`.trim(),
            email: data.email,
            phone: data.phone
          },
          eventDate: new Date().toISOString(),
          notes: data.specialRequests || ''
        })
      });
      const res = await response.json();
      if (res.success) {
        toast.success('Booking created!');
        setShowBookingForm(false);
        setSelectedTicket(null);
        reset();
      } else {
        toast.error(res.message || 'Booking failed');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setIsProcessing(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="ticketing-page">
      <div className="container">
        {/* Header */}
        <motion.div
          className="ticketing-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Get Your Festival Tickets</h1>
          <p className="page-subtitle">
            Choose the perfect ticket package for your Latin Notion Bachata Festival experience
          </p>
        </motion.div>

        {/* Ticket Types */}
        <motion.div
          className="tickets-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loadingTickets && (
            <div style={{ color: '#fff', padding: 16 }}>Loading tickets...</div>
          )}
          {!loadingTickets && ticketTypes.map((ticket) => (
            <motion.div
              key={ticket._id}
              className={`ticket-card ${ticket.category === 'VIP' ? 'popular' : ''} ${ticket.discount > 0 ? 'early-bird' : ''}`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {ticket.category === 'VIP' && (
                <div className="popular-badge">
                  <Star size={16} />
                  <span>Most Popular</span>
                </div>
              )}
              
              {ticket.discount > 0 && (
                <div className="early-bird-badge">
                  <Clock size={16} />
                  <span>Limited Time</span>
                </div>
              )}

              <div className="ticket-header">
                <h3 className="ticket-name">{ticket.name}</h3>
                <div className="ticket-pricing">
                  {ticket.originalPrice && (
                    <span className="original-price">${ticket.originalPrice}</span>
                  )}
                  <span className="current-price">${ticket.price}</span>
                  <span className="price-period">per person</span>
                </div>
              </div>

              <p className="ticket-description">{ticket.description}</p>

              <ul className="ticket-features">
                {ticket.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <Check size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="ticket-availability">
                <div className="availability-info">
                  <Users size={16} />
                  <span>{(ticket.availableQuantity ?? (ticket.totalQuantity - ticket.soldQuantity))} of {ticket.totalQuantity} available</span>
                </div>
                <div className="availability-bar">
                  <div 
                    className="availability-fill"
                    style={{ width: `${(((ticket.availableQuantity ?? (ticket.totalQuantity - ticket.soldQuantity)) / ticket.totalQuantity) * 100)}%` }}
                  />
                </div>
              </div>

              <button
                className="btn btn-primary ticket-select"
                onClick={() => handleTicketSelect(ticket)}
                disabled={(ticket.availableQuantity ?? (ticket.totalQuantity - ticket.soldQuantity)) === 0}
              >
                {(ticket.availableQuantity ?? (ticket.totalQuantity - ticket.soldQuantity)) === 0 ? 'Sold Out' : 'Select Ticket'}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Booking Form Modal */}
        {showBookingForm && selectedTicket && (
          <div className="booking-modal">
            <div className="modal-backdrop" onClick={() => setShowBookingForm(false)} />
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-header">
                <h3>Book Your {selectedTicket.name}</h3>
                <button 
                  className="modal-close"
                  onClick={() => setShowBookingForm(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      id="firstName"
                      type="text"
                      {...register('firstName', { required: 'First name is required' })}
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && (
                      <span className="error-message">{errors.firstName.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      id="lastName"
                      type="text"
                      {...register('lastName', { required: 'Last name is required' })}
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && (
                      <span className="error-message">{errors.lastName.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone', { required: 'Phone number is required' })}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && (
                      <span className="error-message">{errors.phone.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Quantity *</label>
                  <select
                    id="quantity"
                    {...register('quantity', { 
                      required: 'Quantity is required',
                      min: { value: 1, message: 'Minimum 1 ticket' },
                      max: { value: 10, message: 'Maximum 10 tickets' }
                    })}
                    className={errors.quantity ? 'error' : ''}
                  >
                    {Array.from({ length: Math.min(10, (selectedTicket.availableQuantity ?? (selectedTicket.totalQuantity - selectedTicket.soldQuantity))) }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} ticket{i + 1 > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  {errors.quantity && (
                    <span className="error-message">{errors.quantity.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="specialRequests">Special Requests (Optional)</label>
                  <textarea
                    id="specialRequests"
                    rows={3}
                    {...register('specialRequests')}
                    placeholder="Any dietary requirements, accessibility needs, or special requests..."
                  />
                </div>

                <div className="booking-summary">
                  <div className="summary-row">
                    <span>Ticket: {selectedTicket.name}</span>
                    <span>${selectedTicket.price} × {quantity}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total Amount</span>
                    <span>${selectedTicket.price * quantity}</span>
                  </div>
                </div>

                <div className="payment-info">
                  <div className="payment-methods">
                    <CreditCard size={20} />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="security-info">
                    <Shield size={20} />
                    <span>Your data is protected</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Complete Booking'}
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Festival Info */}
        <motion.div
          className="festival-info"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>Festival Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <Calendar size={24} />
              <div>
                <h4>Dates</h4>
                <p>November 19-24, 2025</p>
              </div>
            </div>
            <div className="info-item">
              <MapPin size={24} />
              <div>
                <h4>Location</h4>
                <p>Dubai, UAE</p>
              </div>
            </div>
            <div className="info-item">
              <Users size={24} />
              <div>
                <h4>Capacity</h4>
                <p>600+ Participants</p>
              </div>
            </div>
          </div>
        </motion.div>
        <NotionCupPreview/>
      </div>
    </div>
  );
  
};

export default Ticketing;
