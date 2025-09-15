import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import './Contact.css';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      reset();
      
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      details: 'info@latinnotion.com',
      link: 'mailto:info@latinnotion.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      details: '+971 521 430271',
      link: 'tel:+971521430271'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      details: 'Dubai, UAE',
      link: '#'
    },
    {
      icon: <Clock size={24} />,
      title: 'Business Hours',
      details: 'Mon - Fri: 9:00 AM - 6:00 PM',
      link: '#'
    }
  ];

  const faqs = [
    {
      question: 'What is included in the festival ticket?',
      answer: 'Your festival ticket includes access to all workshops, masterclasses, parties, and events throughout the 6-day festival. VIP tickets include additional perks like exclusive sessions and premium seating.'
    },
    {
      question: 'Do I need to be an experienced dancer?',
      answer: 'Not at all! Our festival welcomes dancers of all levels, from complete beginners to professionals. We offer workshops for every skill level.'
    },
    {
      question: 'What should I bring to the festival?',
      answer: 'Bring comfortable dance shoes, casual and party attire, and your enthusiasm! We\'ll provide all workshop materials and festival welcome bags.'
    },
    {
      question: 'Is accommodation included?',
      answer: 'Accommodation is not included in the festival ticket, but we have partnerships with nearby hotels offering special rates for festival attendees.'
    },
    {
      question: 'Can I get a refund if I can\'t attend?',
      answer: 'Refunds are available up to 30 days before the festival start date. Please check our terms and conditions for detailed refund policies.'
    },
    {
      question: 'How do I register for the Notion Cup competition?',
      answer: 'Competition registration is included with your festival ticket. You can register on-site during the festival or through our online portal.'
    }
  ];

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <motion.section
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">
            Have questions about the festival? We're here to help! Reach out to us and we'll get back to you as soon as possible.
          </p>
        </motion.section>

        {/* Contact Info & Form */}
        <section className="contact-main">
          <div className="contact-grid">
            {/* Contact Information */}
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Contact Information</h2>
              <p>Get in touch with us through any of these channels:</p>
              
              <div className="contact-methods">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="contact-method"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="method-icon">
                      {info.icon}
                    </div>
                    <div className="method-content">
                      <h3>{info.title}</h3>
                      <a href={info.link} className="method-details">
                        {info.details}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="whatsapp-cta">
                <MessageCircle size={24} />
                <div>
                  <h3>Quick Response</h3>
                  <p>For immediate assistance, message us on WhatsApp</p>
                  <a 
                    href="https://wa.me/971521430271" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="whatsapp-link"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="form-header">
                <h2>Send us a Message</h2>
                <p>Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className={errors.name ? 'error' : ''}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <span className="error-message">{errors.name.message}</span>
                    )}
                  </div>

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
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    id="subject"
                    type="text"
                    {...register('subject', { required: 'Subject is required' })}
                    className={errors.subject ? 'error' : ''}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <span className="error-message">{errors.subject.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', { required: 'Message is required' })}
                    className={errors.message ? 'error' : ''}
                    placeholder="Tell us more about your question or inquiry..."
                  />
                  {errors.message && (
                    <span className="error-message">{errors.message.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <motion.div
            className="faq-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Find answers to common questions about the Latin Notion Bachata Festival
            </p>
          </motion.div>

          <motion.div
            className="faq-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
