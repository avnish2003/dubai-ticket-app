import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  BarChart3,
  Ticket
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import './AdminPanel.css';

interface TicketType {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  available: number;
  total: number;
  popular?: boolean;
  earlyBird?: boolean;
  active: boolean;
  // backend fields for admin ops
  category?: string;
  discount?: number;
}

interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ticketType: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  specialRequests?: string;
}

interface AdminStats {
  totalBookings: number;
  totalRevenue: number;
  ticketsSold: number;
  conversionRate: number;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'bookings' | 'settings'>('overview');
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalBookings: 0,
    totalRevenue: 0,
    ticketsSold: 0,
    conversionRate: 0
  });
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<TicketType>();

  // Load real data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const [ticketsRes, bookingsRes] = await Promise.all([
          fetch('https://dubai-ticket-app-3.onrender.com/api/tickets'),
          fetch('https://dubai-ticket-app-3.onrender.com/api/bookings/admin/all', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        // Tickets
        const ticketsJson = await ticketsRes.json();
        if (ticketsJson.success) {
          const tMapped: TicketType[] = ticketsJson.data.map((t: any) => ({
            id: t._id,
            name: t.name,
            price: t.price,
            originalPrice: t.originalPrice,
            description: t.description,
            features: t.features || [],
            available: (t.availableQuantity ?? (t.totalQuantity - t.soldQuantity)),
            total: t.totalQuantity,
            popular: t.category === 'VIP',
            earlyBird: (t.discount || 0) > 0,
            active: t.isActive,
            category: t.category,
            discount: t.discount
          }));
          setTickets(tMapped);
        }
        const bookingsJson = await bookingsRes.json();
        if (bookingsJson.success) {
          const normalized: Booking[] = bookingsJson.data.map((b: any) => ({
            id: b._id,
            firstName: b.contactInfo?.name?.split(' ')[0] || b.user?.name?.split(' ')[0] || '',
            lastName: b.contactInfo?.name?.split(' ').slice(1).join(' ') || '',
            email: b.contactInfo?.email || b.user?.email || '',
            phone: b.contactInfo?.phone || b.user?.phone || '',
            ticketType: b.tickets?.[0]?.ticket?.name || 'N/A',
            quantity: b.tickets?.reduce((sum: number, t: any) => sum + (t.quantity || 0), 0) || 0,
            totalAmount: b.totalAmount,
            status: b.status || 'pending',
            createdAt: b.createdAt
          }));
          setBookings(normalized);
          const totalBookings = normalized.length;
          const totalRevenue = normalized.reduce((sum, bk) => sum + (bk.totalAmount || 0), 0);
          const ticketsSold = normalized.reduce((sum, bk) => sum + (bk.quantity || 0), 0);
          const conversionRate = totalBookings > 0 ? Math.min(100, Math.round((ticketsSold / (totalBookings * 2)) * 100)) : 0;
          setStats({ totalBookings, totalRevenue, ticketsSold, conversionRate });
        }
      } catch (e) {
        // keep UI functional even if API fails
      }
    };
    loadData();
  }, []);

  const handleTicketSubmit = (data: TicketType) => {
    const submit = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const body = editingTicket ? {
          // For simplicity, send minimal fields (backend validates)
          name: data.name,
          description: data.description,
          price: data.price,
          originalPrice: data.originalPrice || data.price,
          category: data.category || 'General',
          totalQuantity: data.total,
          features: data.features || [],
          saleStartDate: new Date().toISOString(),
          saleEndDate: new Date(Date.now() + 31536000000).toISOString(),
          isActive: data.active
        } : {
          name: data.name,
          description: data.description,
          price: data.price,
          originalPrice: data.originalPrice || data.price,
          category: data.category || 'General',
          totalQuantity: data.total,
          features: data.features || [],
          saleStartDate: new Date().toISOString(),
          saleEndDate: new Date(Date.now() + 31536000000).toISOString(),
          image: '',
          discount: data.discount || 0
        };
        const resp = await fetch(`https://dubai-ticket-app-3.onrender.com/api/tickets${editingTicket ? '/' + editingTicket.id : ''}`, {
          method: editingTicket ? 'PUT' : 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        const json = await resp.json();
        if (!json.success) {
          toast.error(json.message || 'Failed to save ticket');
        } else {
          toast.success(editingTicket ? 'Ticket updated successfully!' : 'Ticket created successfully!');
          // reload tickets
          const tRes = await fetch('https://dubai-ticket-app-3.onrender.com/api/tickets');
          const tJson = await tRes.json();
          if (tJson.success) {
            const tMapped: TicketType[] = tJson.data.map((t: any) => ({
              id: t._id,
              name: t.name,
              price: t.price,
              originalPrice: t.originalPrice,
              description: t.description,
              features: t.features || [],
              available: (t.availableQuantity ?? (t.totalQuantity - t.soldQuantity)),
              total: t.totalQuantity,
              popular: t.category === 'VIP',
              earlyBird: (t.discount || 0) > 0,
              active: t.isActive,
              category: t.category,
              discount: t.discount
            }));
            setTickets(tMapped);
          }
          setShowTicketForm(false);
          setEditingTicket(null);
          reset();
        }
      } catch (_) {
        toast.error('Network error');
      }
    };
    submit();
  };

  const handleEditTicket = (ticket: TicketType) => {
    setEditingTicket(ticket);
    Object.keys(ticket).forEach(key => {
      setValue(key as keyof TicketType, ticket[key as keyof TicketType]);
    });
    setShowTicketForm(true);
  };

  const handleDeleteTicket = (ticketId: string) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
    toast.success('Ticket deleted successfully!');
  };

  const handleToggleTicketStatus = (ticketId: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId ? { ...ticket, active: !ticket.active } : ticket
    ));
    toast.success('Ticket status updated!');
  };

  const handleBookingStatusChange = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status } : booking
    ));
    toast.success('Booking status updated!');
  };

  const exportBookings = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Phone', 'Ticket Type', 'Quantity', 'Total', 'Status', 'Date'],
      ...bookings.map(booking => [
        booking.id,
        `${booking.firstName} ${booking.lastName}`,
        booking.email,
        booking.phone,
        booking.ticketType,
        booking.quantity.toString(),
        booking.totalAmount.toString(),
        booking.status,
        new Date(booking.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'festival-bookings.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Bookings exported successfully!');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'bookings', label: 'Bookings', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <h1 className="admin-title">Admin Panel</h1>
          <p className="admin-subtitle">Manage your festival tickets and bookings</p>
        </div>

        <div className="admin-layout">
          <div className="admin-sidebar">
            <nav className="admin-nav">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id as any)}
                  >
                    <Icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="admin-content">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <Users size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>{stats.totalBookings}</h3>
                      <p>Total Bookings</p>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">
                      <DollarSign size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>${stats.totalRevenue.toLocaleString()}</h3>
                      <p>Total Revenue</p>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">
                      <Ticket size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>{stats.ticketsSold}</h3>
                      <p>Tickets Sold</p>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">
                      <TrendingUp size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>{stats.conversionRate}%</h3>
                      <p>Conversion Rate</p>
                    </div>
                  </div>
                </div>

                <div className="recent-bookings">
                  <h3>Recent Bookings</h3>
                  <div className="bookings-list">
                    {bookings.slice(0, 5).map(booking => (
                      <div key={booking.id} className="booking-item">
                        <div className="booking-info">
                          <h4>{booking.firstName} {booking.lastName}</h4>
                          <p>{booking.email}</p>
                        </div>
                        <div className="booking-details">
                          <span className="ticket-type">{booking.ticketType}</span>
                          <span className="quantity">x{booking.quantity}</span>
                          <span className="amount">${booking.totalAmount}</span>
                          <span className={`status status-${booking.status}`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'tickets' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="tickets-header">
                  <h3>Ticket Management</h3>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      setEditingTicket(null);
                      setShowTicketForm(true);
                      reset();
                    }}
                  >
                    <Plus size={16} />
                    Add New Ticket
                  </button>
                </div>

                <div className="tickets-grid">
                  {tickets.map(ticket => (
                    <div key={ticket.id} className="ticket-admin-card">
                      <div className="ticket-header">
                        <h4>{ticket.name}</h4>
                        <div className="ticket-actions">
                          <button 
                            className="action-btn"
                            onClick={() => handleEditTicket(ticket)}
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="action-btn"
                            onClick={() => handleDeleteTicket(ticket.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="ticket-info">
                        <div className="price">${ticket.price}</div>
                        <div className="availability">
                          {ticket.available} / {ticket.total} available
                        </div>
                        <div className={`status ${ticket.active ? 'active' : 'inactive'}`}>
                          {ticket.active ? 'Active' : 'Inactive'}
                        </div>
                      </div>
                      
                      <div className="ticket-actions-bottom">
                        <button 
                          className={`btn ${ticket.active ? 'btn-secondary' : 'btn-primary'}`}
                          onClick={() => handleToggleTicketStatus(ticket.id)}
                        >
                          {ticket.active ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'bookings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bookings-header">
                  <h3>Booking Management</h3>
                  <button className="btn btn-secondary" onClick={exportBookings}>
                    <Download size={16} />
                    Export CSV
                  </button>
                </div>

                <div className="bookings-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Ticket Type</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(booking => (
                        <tr key={booking.id}>
                          <td>{booking.firstName} {booking.lastName}</td>
                          <td>{booking.email}</td>
                          <td>{booking.ticketType}</td>
                          <td>{booking.quantity}</td>
                          <td>${booking.totalAmount}</td>
                          <td>
                            <select 
                              value={booking.status}
                              onChange={(e) => handleBookingStatusChange(booking.id, e.target.value as Booking['status'])}
                              className="status-select"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button className="action-btn">
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3>Festival Settings</h3>
                <div className="settings-grid">
                  <div className="setting-card">
                    <h4>Festival Information</h4>
                    <div className="setting-item">
                      <label>Festival Name</label>
                      <input type="text" defaultValue="Latin Notion Bachata Festival" />
                    </div>
                    <div className="setting-item">
                      <label>Dates</label>
                      <input type="text" defaultValue="November 19-24, 2025" />
                    </div>
                    <div className="setting-item">
                      <label>Location</label>
                      <input type="text" defaultValue="Dubai, UAE" />
                    </div>
                  </div>
                  
                  <div className="setting-card">
                    <h4>Payment Settings</h4>
                    <div className="setting-item">
                      <label>Currency</label>
                      <select defaultValue="USD">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="AED">AED</option>
                      </select>
                    </div>
                    <div className="setting-item">
                      <label>Payment Methods</label>
                      <div className="checkbox-group">
                        <label><input type="checkbox" defaultChecked /> Credit Card</label>
                        <label><input type="checkbox" defaultChecked /> PayPal</label>
                        <label><input type="checkbox" /> Bank Transfer</label>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Ticket Form Modal */}
        {showTicketForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>{editingTicket ? 'Edit Ticket' : 'Create New Ticket'}</h3>
                <button 
                  className="modal-close"
                  onClick={() => {
                    setShowTicketForm(false);
                    setEditingTicket(null);
                    reset();
                  }}
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit(handleTicketSubmit)} className="ticket-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Ticket Name *</label>
                    <input 
                      type="text" 
                      {...register('name', { required: 'Name is required' })}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>Price *</label>
                    <input 
                      type="number" 
                      {...register('price', { required: 'Price is required', min: 0 })}
                      className={errors.price ? 'error' : ''}
                    />
                    {errors.price && <span className="error-message">{errors.price.message}</span>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Description *</label>
                  <textarea 
                    rows={3}
                    {...register('description', { required: 'Description is required' })}
                    className={errors.description ? 'error' : ''}
                  />
                  {errors.description && <span className="error-message">{errors.description.message}</span>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Total Quantity *</label>
                    <input 
                      type="number" 
                      {...register('total', { required: 'Total quantity is required', min: 1 })}
                      className={errors.total ? 'error' : ''}
                    />
                    {errors.total && <span className="error-message">{errors.total.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>Available Quantity *</label>
                    <input 
                      type="number" 
                      {...register('available', { required: 'Available quantity is required', min: 0 })}
                      className={errors.available ? 'error' : ''}
                    />
                    {errors.available && <span className="error-message">{errors.available.message}</span>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Features (one per line)</label>
                  <textarea 
                    rows={4}
                    placeholder="Full 6-day festival access&#10;All workshops and masterclasses&#10;Welcome party and closing ceremony"
                    {...register('features')}
                  />
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => {
                    setShowTicketForm(false);
                    setEditingTicket(null);
                    reset();
                  }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingTicket ? 'Update Ticket' : 'Create Ticket'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
