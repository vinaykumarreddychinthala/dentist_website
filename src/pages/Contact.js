import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, MessageSquare, Calendar as CalendarIcon, Send, Clock, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Morphing blob background element
const MorphBlob = ({ className, duration = 8, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{
      borderRadius: [
        '60% 40% 30% 70% / 60% 30% 70% 40%',
        '30% 60% 70% 40% / 50% 60% 30% 60%',
        '60% 40% 30% 70% / 60% 30% 70% 40%',
      ],
      scale: [1, 1.1, 1],
    }}
    transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

// Floating particle
const Particle = ({ delay, x, y, size }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20 pointer-events-none"
    style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
    animate={{ y: [0, -25, 0], opacity: [0, 0.5, 0], scale: [0.5, 1, 0.5] }}
    transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

// Fancy input field
const FancyInput = ({ label, id, testId, type = 'text', value, onChange, required, placeholder, as: As = 'input', children, rows }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative group">
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 font-medium ${
          focused || hasValue
            ? '-top-2.5 text-xs text-primary bg-white px-2 rounded-full'
            : 'top-3.5 text-sm text-gray-400'
        }`}
      >
        {label}
      </label>
      {As === 'textarea' ? (
        <textarea
          id={id}
          data-testid={testId}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows || 4}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 pt-5 pb-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:ring-0 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none"
          placeholder={focused ? placeholder : ''}
        />
      ) : As === 'select' ? (
        <select
          id={id}
          data-testid={testId}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 pt-5 pb-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:ring-0 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm appearance-none"
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          data-testid={testId}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 pt-5 pb-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:ring-0 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
          placeholder={focused ? placeholder : ''}
        />
      )}
      {/* Focus glow line */}
      <motion.div
        animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-emerald-400 rounded-full origin-left"
      />
    </div>
  );
};

const Contact = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [appointmentForm, setAppointmentForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', service: 'Implants', message: '',
  });
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('message'); // 'message' | 'appointment'
  const [contactSuccess, setContactSuccess] = useState(false);
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);

  // ===== BACKEND LOGIC UNCHANGED =====
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, contactForm);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setContactForm({ name: '', email: '', message: '' });
      setContactSuccess(true);
      setTimeout(() => setContactSuccess(false), 3000);
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/appointments`, appointmentForm);
      toast.success("Appointment booked successfully! We'll confirm shortly.");
      setAppointmentForm({ name: '', email: '', phone: '', date: '', time: '', service: 'Implants', message: '' });
      setAppointmentSuccess(true);
      setTimeout(() => setAppointmentSuccess(false), 3000);
    } catch (error) {
      console.error('Appointment form error:', error);
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  // ===== END BACKEND LOGIC =====

  const services = ['Implants', 'Cosmetic dentistry', 'Kids dentistry', 'Orthodontics', 'Painless Root canal Treatment'];

  const contactInfo = [
    {
      icon: MapPin, label: 'Visit Us', emoji: '📍',
      content: 'Shop No. 2, Monarch Nagar, S.N.B. Marg, J.B. Nagar, Andheri (E), 400069',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: Phone, label: 'Call Us', emoji: '📞',
      content: '+91 9004332292',
      href: 'tel:+919004332292',
      testId: 'contact-phone-link',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      icon: Clock, label: 'Working Hours', emoji: '🕐',
      content: 'Mon–Sat: 10am – 8pm\nSunday: 10am – 2pm',
      color: 'from-teal-400 to-green-500',
    },
  ];

  return (
    <div className="page-transition overflow-x-hidden">

      {/* ===== HERO ===== */}
      <section className="relative min-h-[60vh] py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-accent via-white to-white overflow-hidden flex items-center">

        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(76,175,80,0.12),transparent)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(76,175,80,0.15) 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />
        <MorphBlob className="w-[500px] h-[500px] bg-primary/8 -top-40 -right-40" duration={10} />
        <MorphBlob className="w-[300px] h-[300px] bg-emerald-200/15 -bottom-20 -left-20" duration={8} delay={2} />

        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
          <Particle key={i} delay={i * 0.6} x={Math.random() * 100} y={Math.random() * 100} size={3 + Math.random() * 7} />
        ))}

        <div className="container mx-auto text-center relative z-10">

          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-green-100 text-primary px-5 py-2 rounded-full text-sm font-semibold shadow-lg mb-8"
          >
            <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>✦</motion.span>
            We'd Love to Hear From You
            <motion.span animate={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>✦</motion.span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-5xl md:text-7xl font-extrabold text-secondary tracking-tight"
              data-testid="contact-title"
            >
              Get In Touch
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-8">
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-heading text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary via-emerald-400 to-green-600 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto', animation: 'gradientShift 4s linear infinite' }}>
                With Our Team
              </span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="text-lg md:text-xl text-text-light max-w-2xl mx-auto"
          >
            Get in touch for appointments, inquiries, or any questions about our services.{' '}
            <span className="text-primary font-semibold">We're always here for your smile.</span>
          </motion.p>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-white">
            <path d="M0,0V46.29c47.79,22,103.59,29.05,158,17C230,45,284,0,339,0s108,45,162,63.29c54,18.34,108,0,162-17.29C717,28,771,28,825,46.29c54,18.34,108,0,162-17.29C1041,11,1095,11,1149,28.29V0Z" fill="currentColor" />
          </svg>
        </div>

        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% center; }
            50% { background-position: 200% center; }
            100% { background-position: 0% center; }
          }
        `}</style>
      </section>



      {/* ===== CONTACT INFO CARDS ===== */}
      <section className="py-12 px-6 md:px-12 lg:px-24 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(76,175,80,0.15)' }}
                  className="relative bg-white border border-green-50 rounded-2xl p-6 shadow-sm overflow-hidden group transition-all duration-300"
                >
                  <MorphBlob className={`w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 -top-6 -right-6`} duration={7 + i} delay={i} />
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-md`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="text-white" size={22} />
                  </motion.div>
                  <h3 className="font-heading font-bold text-lg text-secondary mb-2">{item.label}</h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      data-testid={item.testId}
                      className="text-primary font-semibold hover:text-secondary transition-colors"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-text-light leading-relaxed whitespace-pre-line">{item.content}</p>
                  )}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4 }}
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.color} rounded-b-2xl`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CALENDAR SECTION ===== */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-accent relative overflow-hidden">
        <MorphBlob className="w-72 h-72 bg-primary/8 -top-20 -left-20" duration={9} />
        <MorphBlob className="w-56 h-56 bg-emerald-200/20 -bottom-16 -right-16" duration={7} delay={2} />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-block bg-white text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-sm">
                Pick a Date
              </span>
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <CalendarIcon className="text-primary" size={28} />
                </motion.div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-secondary">
                  Select Your Preferred Date
                </h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-6 flex justify-center border border-green-50"
            >
              <style>{`
                .rdp {
                  --rdp-cell-size: 46px;
                  --rdp-accent-color: #4CAF50;
                  --rdp-background-color: #E8F5E9;
                  font-family: inherit;
                }
                .rdp-day_selected { background-color: #4CAF50 !important; color: white !important; border-radius: 50%; }
                .rdp-day_today { font-weight: bold; color: #2E7D32; }
                .rdp-day:hover:not(.rdp-day_selected) { background-color: #e8f5e9; border-radius: 50%; }
                .rdp-head_cell { color: #4CAF50; font-weight: 700; text-transform: uppercase; font-size: 11px; }
                .rdp-caption_label { font-weight: 700; color: #1a2e1a; }
                .rdp-nav_button { color: #4CAF50 !important; }
              `}</style>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={{ before: new Date() }}
                showOutsideDays
                className="mx-auto"
              />
            </motion.div>

            <AnimatePresence>
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-5 flex items-center justify-center gap-3 bg-white rounded-2xl shadow-md px-6 py-4 border border-green-50"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-3 h-3 rounded-full bg-primary"
                  />
                  <p className="text-text-light">
                    Selected:{' '}
                    <span className="font-bold text-primary text-lg">
                      {format(selectedDate, 'MMMM dd, yyyy')}
                    </span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT INFO + FORMS ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(76,175,80,0.04),transparent)]" />

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left: Map + WhatsApp */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block bg-accent text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-3"
              >
                Find Us
              </motion.div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-8">
                We're Just Around
                <span className="block bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                  The Corner
                </span>
              </h2>

              {/* WhatsApp prominent button */}
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: '0 15px 40px rgba(37,211,102,0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="mb-8"
              >
                <a
                  href="https://wa.me/919004332292"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="whatsapp-button"
                  className="flex items-center gap-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-2xl px-6 py-5 shadow-lg transition-all duration-300"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl flex-shrink-0"
                  >
                    💬
                  </motion.div>
                  <div>
                    <div className="font-bold text-lg">Chat on WhatsApp</div>
                    <div className="text-white/80 text-sm">+91 9004332292 • Usually replies instantly</div>
                  </div>
                  <motion.span
                    className="ml-auto text-xl"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </a>
              </motion.div>

              {/* Google Map */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden shadow-xl border-4 border-green-50"
              >
                <div className="bg-gradient-to-r from-primary to-emerald-600 px-5 py-3 flex items-center gap-2">
                  <MapPin className="text-white" size={18} />
                  <span className="text-white font-semibold text-sm">Dentis3 Care — Andheri (E), Mumbai</span>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8276519857747!2d72.8584!3d19.1098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA2JzM1LjMiTiA3MsKwNTEnMzAuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dentis3 Care Location"
                  data-testid="google-maps"
                />
              </motion.div>
            </motion.div>

            {/* Right: Tabbed forms */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Tab switcher */}
              <div className="flex gap-2 bg-accent rounded-2xl p-1.5 mb-6">
                {[
                  { id: 'message', label: 'Send Message', icon: '✉️' },
                  { id: 'appointment', label: 'Book Appointment', icon: '📅' },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative"
                    whileTap={{ scale: 0.97 }}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white rounded-xl shadow-md"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.icon}</span>
                    <span className={`relative z-10 ${activeTab === tab.id ? 'text-primary' : 'text-text-light'}`}>
                      {tab.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* ===== MESSAGE FORM ===== */}
                {activeTab === 'message' && (
                  <motion.div
                    key="message"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white rounded-3xl shadow-xl border border-green-50 p-8 relative overflow-hidden"
                  >
                    <MorphBlob className="w-48 h-48 bg-primary/5 -top-12 -right-12" duration={8} />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Send className="text-primary" size={18} />
                        </div>
                        <h2 className="font-heading text-2xl font-bold text-secondary">Send Us a Message</h2>
                      </div>

                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <FancyInput
                          label="Your Name"
                          id="contact-name"
                          testId="contact-name-input"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          required
                          placeholder="John Smith"
                        />
                        <FancyInput
                          label="Email Address"
                          id="contact-email"
                          testId="contact-email-input"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          required
                          placeholder="your.email@example.com"
                        />
                        <FancyInput
                          label="Your Message"
                          id="contact-message"
                          testId="contact-message-input"
                          as="textarea"
                          rows={4}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          required
                          placeholder="How can we help you?"
                        />

                        <motion.button
                          type="submit"
                          disabled={loading}
                          data-testid="contact-submit-button"
                          whileHover={{ scale: 1.02, boxShadow: '0 12px 30px rgba(76,175,80,0.35)' }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full relative overflow-hidden bg-primary text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                          <AnimatePresence mode="wait">
                            {contactSuccess ? (
                              <motion.span key="done" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                                <CheckCircle size={18} /> Message Sent!
                              </motion.span>
                            ) : loading ? (
                              <motion.span key="loading" className="flex items-center gap-2">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                                Sending...
                              </motion.span>
                            ) : (
                              <motion.span key="idle" className="flex items-center gap-2">
                                <Send size={16} /> Send Message
                                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                )}

                {/* ===== APPOINTMENT FORM ===== */}
                {activeTab === 'appointment' && (
                  <motion.div
                    key="appointment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white rounded-3xl shadow-xl border border-green-50 p-8 relative overflow-hidden"
                  >
                    <MorphBlob className="w-48 h-48 bg-emerald-400/5 -top-12 -right-12" duration={9} />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <CalendarIcon className="text-primary" size={18} />
                        </div>
                        <h2 className="font-heading text-2xl font-bold text-secondary">Book an Appointment</h2>
                      </div>

                      <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <FancyInput
                            label="Full Name"
                            id="appointment-name"
                            testId="appointment-name-input"
                            value={appointmentForm.name}
                            onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                            required
                            placeholder="John Smith"
                          />
                          <FancyInput
                            label="Email"
                            id="appointment-email"
                            testId="appointment-email-input"
                            type="email"
                            value={appointmentForm.email}
                            onChange={(e) => setAppointmentForm({ ...appointmentForm, email: e.target.value })}
                            required
                            placeholder="your@email.com"
                          />
                        </div>

                        <FancyInput
                          label="Phone Number"
                          id="appointment-phone"
                          testId="appointment-phone-input"
                          type="tel"
                          value={appointmentForm.phone}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                          required
                          placeholder="+91 9876543210"
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                          <FancyInput
                            label="Preferred Date"
                            id="appointment-date"
                            testId="appointment-date-input"
                            type="date"
                            value={appointmentForm.date}
                            onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                            required
                          />
                          <FancyInput
                            label="Preferred Time"
                            id="appointment-time"
                            testId="appointment-time-input"
                            type="time"
                            value={appointmentForm.time}
                            onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                            required
                          />
                        </div>

                        <FancyInput
                          label="Select Service"
                          id="appointment-service"
                          testId="appointment-service-select"
                          as="select"
                          value={appointmentForm.service}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, service: e.target.value })}
                          required
                        >
                          {services.map((s, i) => <option key={i} value={s}>{s}</option>)}
                        </FancyInput>

                        <FancyInput
                          label="Additional Notes (Optional)"
                          id="appointment-message"
                          testId="appointment-message-input"
                          as="textarea"
                          rows={3}
                          value={appointmentForm.message}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, message: e.target.value })}
                          placeholder="Any specific concerns or questions?"
                        />

                        <motion.button
                          type="submit"
                          disabled={loading}
                          data-testid="appointment-submit-button"
                          whileHover={{ scale: 1.02, boxShadow: '0 12px 30px rgba(76,175,80,0.35)' }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full relative overflow-hidden bg-primary text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                          <AnimatePresence mode="wait">
                            {appointmentSuccess ? (
                              <motion.span key="done" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                                <CheckCircle size={18} /> Appointment Booked!
                              </motion.span>
                            ) : loading ? (
                              <motion.span key="loading" className="flex items-center gap-2">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                                Booking...
                              </motion.span>
                            ) : (
                              <motion.span key="idle" className="flex items-center gap-2">
                                <CalendarIcon size={16} /> Book Appointment
                                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;