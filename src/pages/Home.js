import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, CheckCircle, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import DentalRobotAssistant from '../components/DentalRobotAssistant';
import { Smile,Bot,CalendarDays,Microscope,MessageCircle,Activity,Baby,Scissors,HeartPulse, Sparkles, ShieldCheck, Plane } from "lucide-react";
import {
  Stethoscope,
  Cpu,
  HeartHandshake,
  Wallet,
  Clock,
  Users,
  FileText
} from "lucide-react";

// ===== ANIMATED COUNTER =====
const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime, animationFrame;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);
      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  return <span>{count.toLocaleString()}{suffix}</span>;
};

// ===== MORPHING BLOB =====
const MorphBlob = ({ className, duration = 8, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{
      borderRadius: ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%'],
      scale: [1, 1.12, 1],
    }}
    transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

// ===== FLOATING PARTICLE =====
const Particle = ({ delay, x, y, size }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20 pointer-events-none"
    style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
    animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
    transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

// ===== STAR RATING =====
const StarRow = ({ count = 5 }) => (
  <div className="flex gap-1">
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.8 + i * 0.1, type: 'spring', bounce: 0.5 }}
      >
        <Star className="text-amber-400 fill-amber-400" size={18} />
      </motion.div>
    ))}
  </div>
);

const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const testimonials = [
    { name: 'Sarah Johnson', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400', instagramLink: 'https://www.instagram.com/reel/', review: 'Best dental experience I\'ve ever had. Completely painless and the team was so warm!' },
    { name: 'Michael Chen', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400', instagramLink: 'https://www.instagram.com/reel/', review: 'My implants look and feel completely natural. I\'m so confident smiling again!' },
    { name: 'Emily Rodriguez', image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400', instagramLink: 'https://www.instagram.com/reel/', review: 'The cosmetic treatment transformed my smile. Worth every penny. Highly recommend!' },
  ];

  const features = [
  {
    title: "Expert Doctors",
    description: "Certified implantologists and specialists with international training.",
    icon: Stethoscope
  },
  {
    title: "Advanced Technology",
    description: "State-of-the-art equipment for painless and precise treatments.",
    icon: Cpu
  },
  {
    title: "Comprehensive Care",
    description: "From kids to adults, complete dental solutions under one roof.",
    icon: HeartHandshake
  },
  {
    title: "Affordable Pricing",
    description: "Quality dental care that fits your budget with flexible payment options.",
    icon: Wallet
  },
  
  {
    title: "Comfort First",
    description: "Modern, spa-like facilities designed for your relaxation and comfort.",
    icon: Sparkles
  },
  {
    title: "Family Friendly",
    description: "Welcoming environment for patients of all ages with kid-friendly spaces.",
    icon: Users
  },
  {
    title: "Digital Records",
    description: "Secure digital health records accessible anytime, anywhere.",
    icon: FileText
  }
];

  useEffect(() => {
    const interval = setInterval(() => setActiveTestimonial(p => (p + 1) % 3), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-transition overflow-x-hidden">

      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-screen py-20 md:py-0 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-accent via-white to-white overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_40%,rgba(76,175,80,0.1),transparent)]" />
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(76,175,80,0.12) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <MorphBlob className="w-[700px] h-[700px] bg-primary/6 -top-60 -right-60" duration={12} />
        <MorphBlob className="w-[400px] h-[400px] bg-emerald-200/15 bottom-0 -left-40" duration={9} delay={2} />
        <MorphBlob className="w-[300px] h-[300px] bg-green-100/20 top-1/3 right-1/3" duration={10} delay={4} />

        {[...Array(14)].map((_, i) => (
          <Particle key={i} delay={i * 0.4} x={Math.random() * 100} y={Math.random() * 100} size={3 + Math.random() * 8} />
        ))}

        <motion.div style={{ y: heroY }} className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, type: 'spring', delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-green-100 text-primary px-4 py-2 rounded-full text-sm font-semibold shadow-md mb-6"
              >
                <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-green-400" />
                Mumbai's Most Trusted Dental Clinic
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-secondary tracking-tight leading-none"
                  data-testid="hero-title"
                >
                  Welcome to
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-6">
                <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
                  <span
                    className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-primary via-emerald-400 to-green-600 bg-clip-text text-transparent"
                    style={{ backgroundSize: '200% auto', animation: 'gradientShift 4s linear infinite' }}
                  >
                    Dentis3 Care
                  </span>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="flex items-center gap-3 mb-6">
                <StarRow />
                <span className="text-lg font-heading font-bold text-primary">Your Smile, Our Goal!</span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9 }} className="text-lg md:text-xl leading-relaxed text-text-light mb-8 max-w-lg">
                A healthy smile begins with healthy teeth. At Dentis3Care, you get all advanced dental services: Smile Design, Root Canal Treatment, Implants, Whitening.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {['ADA Accredited', '15,000+ Happy Patients',].map((badge, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.05, y: -2 }} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-green-50 rounded-xl px-3 py-2.5 shadow-sm">
                    <CheckCircle className="text-primary flex-shrink-0" size={16} />
                    <span className="text-xs font-semibold text-secondary">{badge}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.9 }} className="flex flex-wrap gap-4">
                <Link to="/contact" data-testid="book-appointment-button">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(76,175,80,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-8 py-4 font-semibold text-lg shadow-lg transition-all duration-300 relative overflow-hidden group"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">Book Appointment</span>
                    <motion.span className="relative z-10" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowRight size={18} />
                    </motion.span>
                  </motion.div>
                </Link>
                <Link to="/services" data-testid="services-button">
                  <motion.div
                    whileHover={{ scale: 1.05, backgroundColor: '#e8f5e9' }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-white text-primary border-2 border-primary rounded-full px-8 py-4 font-semibold text-lg shadow-sm transition-all duration-300"
                  >
                    Our Services
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT: 3D Exploded Tooth */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              data-testid="hero-animation"
              className="relative h-[520px] flex items-center justify-center"
            >
              <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute w-80 h-80 rounded-full border border-dashed border-primary/20" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute w-60 h-60 rounded-full border border-primary/10" style={{ borderStyle: 'dotted' }} />

              <div className="relative w-full h-full max-w-md mx-auto" style={{ perspective: '1000px' }}>
                <motion.div className="absolute inset-0 rounded-3xl" style={{ margin: '20px', background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(232,245,233,0.7) 100%)', backdropFilter: 'blur(20px)', boxShadow: '0 30px 80px rgba(76,175,80,0.15), inset 0 1px 0 rgba(255,255,255,0.8)' }} />
                {['top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8'].map((pos, i) => (
                  <motion.div key={i} className={`absolute ${pos} w-3 h-3 rounded-full bg-primary/30`} animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />
                ))}
                <div className="relative w-full h-full flex items-center justify-center p-8">
       <div className="tooth-assembly-container">

{[
  {
    cls: "tooth-crown",
    label: "Crown",
    y: -70,
    color: "linear-gradient(180deg,#ffffff,#f1f5f9)"
  },
  {
    cls: "tooth-enamel",
    label: "Enamel",
    y: -40,
    color: "linear-gradient(180deg,#f8fafc,#e2e8f0)"
  },
  {
    cls: "tooth-dentin",
    label: "Dentin",
    y: -10,
    color: "linear-gradient(180deg,#fef3c7,#fde68a)"
  },
  {
    cls: "tooth-pulp",
    label: "Pulp",
    y: 15,
    color: "linear-gradient(180deg,#fda4af,#fb7185)"
  },
  {
    cls: "tooth-root",
    label: "Root",
    y: 60,
    color: "linear-gradient(180deg,#e2e8f0,#cbd5f5)"
  }
].map((part,i)=>(
  <motion.div
    key={i}
    animate={{
      y:[0,part.y,0],
      rotateY:[0,8,-8,0]
    }}
    transition={{
      duration:7,
      repeat:Infinity,
      ease:"easeInOut",
      delay:i*0.2
    }}
    className={`tooth-part ${part.cls}`}
  >

    <div
      className="tooth-inner"
      style={{background:part.color}}
    />

    <span className="tooth-label">
      {part.label}
    </span>

  </motion.div>
))}

</div>
                </div>
              </div>

{[
  { icon: Smile, text: "Painless Care", pos: "top-6 right-4" },
  { icon: Sparkles, text: "Advanced Technology", pos: "bottom-16 right-2" },
  { icon: ShieldCheck, text: "Certified Experts", pos: "top-8 left-2" },
  { icon: Plane, text: "Near Airport", pos: "bottom-8 left-2" },
].map(({ icon: Icon, text, pos }, i) => (
  <motion.div
    key={i}
    className={`absolute ${pos} flex items-center gap-3 bg-white/95 backdrop-blur-md text-secondary text-base font-semibold px-5 py-2.5 rounded-full shadow-xl border border-green-100`}
    
    animate={{
      y: [0, -10, 0],
      scale: [1, 1.04, 1],
    }}

    transition={{
      duration: 3 + i,
      repeat: Infinity,
      delay: i * 0.8,
      ease: "easeInOut"
    }}

    whileHover={{
      scale: 1.1,
      boxShadow: "0 15px 40px rgba(76,175,80,0.25)"
    }}
  >
    <Icon size={20} className="text-primary" strokeWidth={2.2} />
    <span className="tracking-wide">{text}</span>
  </motion.div>
))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-primary/60">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-white">
            <path d="M0,0V46.29c47.79,22,103.59,29.05,158,17C230,45,284,0,339,0s108,45,162,63.29c54,18.34,108,0,162-17.29C717,28,771,28,825,46.29c54,18.34,108,0,162-17.29C1041,11,1095,11,1149,28.29V0Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(76,175,80,0.04),transparent)]" />
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
  { number: 15000, suffix: '+', label: 'Happy Patients', icon: Smile },
  { number: 99, suffix: '%', label: 'Satisfaction Rate', icon: Star },
  { number: 10, suffix: '+', label: 'Years Experience', icon: Sparkles },
  { number: 9, suffix: '', label: 'Expert Dentists', icon: Activity },
].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(76,175,80,0.12)' }}
                className="relative bg-white border border-green-50 rounded-2xl p-6 text-center shadow-sm overflow-hidden group transition-all duration-300"
              >
                <MorphBlob className="w-32 h-32 bg-primary/5 -top-8 -right-8 opacity-0 group-hover:opacity-100 transition-opacity" duration={5} />
                <motion.div
  className="mb-3 flex justify-center"
  animate={{ y: [0, -4, 0] }}
  transition={{ duration: 2 + index * 0.5, repeat: Infinity }}
>
  <stat.icon size={34} strokeWidth={2.3} className="text-primary" />
</motion.div>
                <div className="text-3xl md:text-4xl font-extrabold text-primary font-heading mb-1">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-text-light font-semibold text-sm">{stat.label}</div>
                <motion.div initial={{ width: 0 }} whileHover={{ width: '100%' }} transition={{ duration: 0.4 }} className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-emerald-400 rounded-b-2xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI ASSISTANT SECTION ===== */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[#f0fbf4] via-white to-[#edf8f2] relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(76,175,80,0.1) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <MorphBlob className="w-96 h-96 bg-emerald-100/40 -top-24 -left-24" duration={14} />
        <MorphBlob className="w-72 h-72 bg-green-100/30 -bottom-16 -right-16" duration={10} delay={3} />

        <div className="container mx-auto relative z-10">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-white text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-sm border border-green-100"
            >
              Powered by AI
            </motion.span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary mb-4">
              Meet{' '}
              <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                D3 — Your AI Dental Assistant
              </span>
            </h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Available 24/7, D3 answers your questions, helps you book appointments, and guides you through your dental journey with intelligent, caring support.
            </p>
          </motion.div>

          {/* Two-column layout: Robot left, features right */}
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left — Robot */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              {/* Decorative glow ring behind robot */}
              <div className="relative">
                <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-br from-emerald-100/60 to-green-50/40 blur-2xl" />
                <DentalRobotAssistant />
              </div>
            </motion.div>

            {/* Right — AI feature highlights */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="flex flex-col gap-6"
            >
              {[
  {
    icon: Bot,
    title: "AI-Powered Consultations",
    desc: "D3 uses advanced natural language processing to understand your dental concerns and provide instant, accurate guidance.",
    color: "from-emerald-50 to-white",
  },
  {
    icon: CalendarDays,
    title: "Instant Appointment Booking",
    desc: "Skip the phone queue. D3 checks real-time availability and books your slot in seconds — day or night.",
    color: "from-green-50 to-white",
  },
  {
    icon: Microscope,
    title: "Smart Diagnostics Assistant",
    desc: "Describe your symptoms and D3 will help identify potential issues and recommend the right specialist for you.",
    color: "from-teal-50 to-white",
  },
  {
    icon: MessageCircle,
    title: "24/7 Always Available",
    desc: "Whether it's 3 AM or a holiday, D3 is always online — ready to help, reassure, and guide you.",
    color: "from-emerald-50 to-white",
  },
].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 6, boxShadow: '0 12px 30px rgba(76,175,80,0.12)' }}
                  className={`flex items-start gap-4 bg-gradient-to-r ${item.color} border border-green-100 rounded-2xl p-5 shadow-sm transition-all duration-300 group`}
                >
              <motion.div
  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
  transition={{ duration: 0.5 }}
>
  <item.icon size={26} strokeWidth={2.2} className="text-primary" />
</motion.div>
                  <div>
                    <h3 className="font-heading font-bold text-secondary text-base mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-text-light text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-2"
              >
                <Link to="/contact">
                  <motion.div
                    whileHover={{ scale: 1.04, boxShadow: '0 16px 40px rgba(76,175,80,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-7 py-3.5 font-semibold text-base shadow-md transition-all duration-300 group relative overflow-hidden"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">Chat with D3 Now</span>
                    <motion.span className="relative z-10" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowRight size={16} />
                    </motion.span>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-16 md:py-28 px-6 md:px-12 lg:px-24 bg-accent relative overflow-hidden">
        <MorphBlob className="w-96 h-96 bg-primary/6 -top-20 -left-20" duration={11} />
        <MorphBlob className="w-72 h-72 bg-emerald-200/15 -bottom-16 -right-16" duration={9} delay={3} />

        <div className="container mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <motion.span initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-block bg-white text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-sm">
              Our Advantages
            </motion.span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary">
              Why Choose
              <span className="block bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                Dentis3 Care?
              </span>
            </h2>
          </motion.div>

         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {features.map((feature, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0, ease: "easeOut" }}
      whileHover={{
        scale: 1.06,
        y: -8,
        boxShadow: "0 25px 60px rgba(76,175,80,0.2)"
      }}
      className="bg-white p-6 rounded-2xl shadow-sm transition-all duration-300 border border-green-100 group relative overflow-hidden"
    >

      {/* glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

      {/* icon */}
      <motion.div
        className="relative z-10 mb-4 w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10 text-primary"
        whileHover={{
          scale: 1.3,
          rotate: [0, -10, 10, 0]
        }}
        transition={{ duration: 0.6 }}
      >
        <feature.icon size={28} strokeWidth={2.3} />
      </motion.div>

      {/* title */}
      <h3 className="font-heading text-lg font-bold text-secondary mb-2 relative z-10 group-hover:text-primary transition">
        {feature.title}
      </h3>

      {/* description */}
      <p className="text-text-light text-sm leading-relaxed relative z-10">
        {feature.description}
      </p>

      {/* bottom animation */}
      <motion.div
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-emerald-400"
      />
    </motion.div>
  ))}
</div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-16 md:py-28 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(76,175,80,0.05),transparent)]" />

        <div className="container mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <motion.span initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-block bg-accent text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Real Stories
            </motion.span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary mb-4">What Our Patients Say</h2>
            <p className="text-lg text-text-light max-w-xl mx-auto">Real stories from happy patients. Click to watch their testimonials on Instagram!</p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 40, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-gradient-to-br from-accent/60 to-white rounded-3xl p-8 md:p-12 mb-8 border border-green-50 shadow-lg overflow-hidden"
              >
                <MorphBlob className="w-48 h-48 bg-primary/8 -top-12 -right-12" duration={7} />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0 relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                      <img src={testimonials[activeTestimonial].image} alt={testimonials[activeTestimonial].name} className="w-full h-full object-cover" />
                    </div>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs shadow-md">✓</motion.div>
                  </motion.div>
                  <div className="text-center md:text-left">
                    <StarRow />
                    <p className="text-lg md:text-xl text-secondary font-medium mt-3 mb-3 italic">"{testimonials[activeTestimonial].review}"</p>
                    <p className="text-primary font-bold text-lg">{testimonials[activeTestimonial].name}</p>
                    <p className="text-text-light text-sm">Verified Patient</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.a
                  key={index}
                  href={testimonial.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.7 }}
                  whileHover={{ y: -8, boxShadow: '0 25px 60px rgba(0,0,0,0.15)' }}
                  onClick={() => setActiveTestimonial(index)}
                  className="block relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 cursor-pointer group"
                  data-testid={`testimonial-${index}`}
                >
                  <div className="relative h-72">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    {activeTestimonial === index && (
                      <motion.div layoutId="activeTestimonial" className="absolute inset-0 ring-4 ring-primary ring-inset rounded-2xl" />
                    )}
                    <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300" />
                    <motion.div initial={{ scale: 0, opacity: 0 }} whileHover={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.4 }} className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl"><span className="text-2xl ml-1">▶</span></div>
                    </motion.div>
                    <motion.div initial={{ y: '100%' }} whileHover={{ y: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-heading text-white font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-white/80 text-xs">Watch on Instagram →</p>
                    </motion.div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  animate={{ width: activeTestimonial === i ? 24 : 8, backgroundColor: activeTestimonial === i ? 'rgb(76,175,80)' : 'rgb(200,230,201)' }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA BANNER ===== */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-accent relative overflow-hidden">
        <MorphBlob className="w-80 h-80 bg-primary/8 -top-20 -right-20" duration={9} />
        <div className="container mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-4">Ready for Your Best Smile?</h2>
            <p className="text-text-light text-lg mb-8 max-w-xl mx-auto">Join 15,000+ happy patients. Book your consultation today — it's quick and easy.</p>
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(76,175,80,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-10 py-4 font-semibold text-lg shadow-lg transition-all duration-300 group"
              >
                Book Free Consultation
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={18} />
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% center; }
          50% { background-position: 200% center; }
          100% { background-position: 0% center; }
        }
       .tooth-assembly-container{
position:relative;
width:200px;
height:380px;
display:flex;
align-items:center;
justify-content:center;
transform-style:preserve-3d;
}

.tooth-part{
position:absolute;
display:flex;
justify-content:center;
align-items:center;
}

.tooth-inner{
border-radius:40px;
box-shadow:
0 10px 25px rgba(0,0,0,0.15),
inset 0 4px 8px rgba(255,255,255,0.8);
border:1px solid rgba(255,255,255,0.6);
}

/* crown */
.tooth-crown .tooth-inner{
width:120px;
height:90px;
border-radius:60px 60px 30px 30px;
}

/* enamel */
.tooth-enamel .tooth-inner{
width:110px;
height:70px;
border-radius:50px 50px 25px 25px;
}

/* dentin */
.tooth-dentin .tooth-inner{
width:95px;
height:95px;
border-radius:40px;
}

/* pulp */
.tooth-pulp .tooth-inner{
width:60px;
height:60px;
border-radius:50%;
}

/* root */
.tooth-root .tooth-inner{
width:70px;
height:150px;
border-radius:30px;
}

/* label */
.tooth-label{
position:absolute;
right:-95px;
background:#4caf50;
color:white;
padding:4px 12px;
border-radius:20px;
font-size:12px;
font-weight:600;
opacity:0;
transition:0.3s;
}

.tooth-part:hover .tooth-label{
opacity:1;
}
        }
      `}</style>
    </div>
  );
};

export default Home;