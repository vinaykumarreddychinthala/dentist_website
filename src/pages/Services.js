import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Smile, Activity, Baby, Scissors, HeartPulse, ChevronDown, Sparkles, Star } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// Floating particle component
const Particle = ({ delay, x, y, size }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20 pointer-events-none"
    style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -30, 0],
      x: [0, 10, -10, 0],
      opacity: [0, 0.6, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

// Morphing blob background
const MorphBlob = ({ className, duration = 8, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{
      borderRadius: [
        '60% 40% 30% 70% / 60% 30% 70% 40%',
        '30% 60% 70% 40% / 50% 60% 30% 60%',
        '60% 40% 30% 70% / 60% 30% 70% 40%',
      ],
      scale: [1, 1.15, 1],
    }}
    transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

// 3D tilt card
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 18;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.y, rotateY: tilt.x }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Services = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const handleTimeUpdate = () => {
  const video = videoRef.current;
  if (!video || !video.duration) return;

  const stopTime = video.duration - 4; // cut last 4 seconds

  if (video.currentTime >= stopTime) {
    video.currentTime = 0;
    video.play();
  }
};
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const services = [
    { title: 'Dental Implants', description: 'Advanced tooth replacement solutions using state-of-the-art implant technology. Restore your smile with permanent, natural-looking teeth that function just like your own.', icon: Activity, emoji: '🦷', color: 'from-green-400 to-emerald-600' },
    { title: 'Cosmetic Dentistry', description: 'Transform your smile with our comprehensive cosmetic treatments including teeth whitening, veneers, smile design, and aesthetic bonding for a confident, radiant smile.', icon: Smile, emoji: '✨', color: 'from-emerald-400 to-green-600' },
    { title: 'Kids Dentistry', description: 'Specialized pediatric dental care in a friendly, comfortable environment. We make dental visits fun and stress-free for children, establishing healthy habits early.', icon: Baby, emoji: '🌟', color: 'from-teal-400 to-emerald-500' },
    { title: 'Orthodontics', description: 'Straighten your teeth and correct bite issues with braces, aligners, and other orthodontic treatments. Achieve the perfect alignment for a beautiful, functional smile.', icon: Scissors, emoji: '💎', color: 'from-green-500 to-teal-600' },
    { title: 'Painless Root Canal', description: 'Save infected teeth with our advanced, painless root canal procedures. Using modern techniques and anesthesia, we ensure a comfortable experience with excellent results.', icon: HeartPulse, emoji: '❤️', color: 'from-emerald-500 to-green-700' },
  ];

  const faqs = [
    { question: 'How long does a dental implant procedure take?', answer: 'The complete implant process typically takes 3-6 months, including healing time. The initial surgery takes 1-2 hours per implant. We can provide temporary teeth during the healing period.' },
    { question: 'Is teeth whitening safe?', answer: 'Yes, professional teeth whitening is completely safe when performed by our trained dentists. We use FDA-approved materials and customize the treatment to your tooth sensitivity level.' },
    { question: 'At what age should my child first visit the dentist?', answer: 'We recommend bringing your child for their first dental visit by age 1, or within 6 months after their first tooth appears. Early visits help establish good habits and prevent future problems.' },
    { question: 'Do you offer emergency dental services?', answer: 'Yes! We provide same-day emergency dental care 7 days a week for urgent issues like severe pain, broken teeth, or dental trauma. Call us immediately if you have a dental emergency.' },
    { question: 'What payment options do you accept?', answer: 'We accept all major insurance plans, credit/debit cards, and offer flexible payment plans. Our team can help you understand your coverage and payment options during your consultation.' },
    { question: 'How often should I get a dental checkup?', answer: 'We recommend dental checkups and cleanings every 6 months for most patients. However, some patients may need more frequent visits based on their oral health condition.' },
  ];

  return (
    <div className="page-transition overflow-x-hidden" ref={containerRef}>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-accent via-white to-white overflow-hidden flex items-center">

        {/* Animated mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(76,175,80,0.12),transparent)]" />
        
        {/* Dot grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 3 }}
          className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(76,175,80,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        {/* Morphing blobs */}
        <MorphBlob className="w-[600px] h-[600px] bg-primary/8 -top-60 -right-60" duration={10} />
        <MorphBlob className="w-[400px] h-[400px] bg-green-300/10 -bottom-40 -left-40" duration={8} delay={3} />
        <MorphBlob className="w-[300px] h-[300px] bg-emerald-200/15 top-1/2 right-1/4" duration={12} delay={1} />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <Particle key={i} delay={i * 0.5} x={Math.random() * 100} y={Math.random() * 100} size={4 + Math.random() * 8} />
        ))}

        <div className="container mx-auto text-center relative z-10">

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-green-100 text-primary px-5 py-2 rounded-full text-sm font-semibold shadow-lg mb-8"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              ✦
            </motion.span>
            World-Class Dental Excellence
            <motion.span
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            >
              ✦
            </motion.span>
          </motion.div>

          {/* Main heading with letter animation */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold text-secondary tracking-tight leading-none"
              data-testid="services-title"
            >
              Excellence in
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-8">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-primary via-emerald-400 to-green-600 bg-clip-text text-transparent bg-[length:200%_auto]"
                style={{ animation: 'gradientShift 4s linear infinite' }}>
                Dental Care
              </span>
            </motion.div>
          </div>

          {/* Animated divider */}
          <motion.div className="flex items-center justify-center gap-3 mb-8">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 60, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="h-[2px] bg-gradient-to-r from-transparent to-primary rounded-full"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5, type: 'spring' }}
              className="w-2 h-2 rounded-full bg-primary"
            />
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 60, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="h-[2px] bg-gradient-to-l from-transparent to-primary rounded-full"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl leading-relaxed text-text-light max-w-3xl mx-auto mb-10"
          >
            Comprehensive dental care tailored to your needs. From preventive treatments to advanced smile transformations,{' '}
            <span className="text-primary font-semibold">we deliver confidence with every visit.</span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(76,175,80,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10">Book Appointment</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >→</motion.span>
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-green-100 text-secondary px-8 py-4 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-300"
            >
              Explore Services ↓
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[['15000+', 'Happy Patients'], ['10+', 'Years of Care'], ['99%', 'Success Rate']].map(([num, label], i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-2xl md:text-3xl font-extrabold text-primary">{num}</div>
                <div className="text-xs text-text-light font-medium mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 text-white">
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

      {/* ===== ANIMATED TOOTH SECTION ===== */}
<section className="relative min-h-[650px] md:min-h-[750px] py-20 px-6 overflow-hidden flex items-center bg-gradient-to-b from-gray-50 via-white to-gray-100">
{/* ===== Center Video ===== */}
<div className="absolute inset-0 flex items-center justify-center">

  {/* background glow */}
  <div className="absolute w-[900px] h-[500px] bg-primary/20 blur-[140px] rounded-full opacity-40"></div>

  {/* rounded background plate */}
  <div className="absolute w-[82%] max-w-[1200px] aspect-video rounded-[40px] bg-gradient-to-b from-white to-gray-50 shadow-[0_40px_120px_rgba(0,0,0,0.12)]"></div>

  {/* video container */}
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
   className="relative w-[78%] max-w-[1100px] aspect-video rounded-[28px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
  >

    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      onTimeUpdate={handleTimeUpdate}
      className="w-full h-full object-cover"
    >
      <source src="/Dentalvid.mp4" type="video/mp4" />
    </video>

  </motion.div>

</div>

  {/* ===== Dark + Gradient Overlay (Important for visibility) ===== */}


  {/* ===== Content Container ===== */}
  <div className="relative z-10 container mx-auto flex items-center justify-center">

    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
      data-testid="services-animation"
      className="relative flex items-center justify-center"
    >

      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute w-52 h-52 rounded-full border-2 border-dashed border-white/40"
      />

      {/* Middle ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute w-40 h-40 rounded-full border border-white/30"
        style={{ borderStyle: 'dotted' }}
      />



    </motion.div>

  </div>
</section>

      {/* ===== SERVICES GRID ===== */}
      <section id="services" className="py-16 md:py-28 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-accent text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
          >
            Our Specialties
          </motion.span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary">
            Services We Offer
          </h2>
        </motion.div>

        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <TiltCard key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    onHoverStart={() => setHoveredService(index)}
                    onHoverEnd={() => setHoveredService(null)}
                    className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-green-50 hover:border-green-200 group overflow-hidden h-full"
                    data-testid={`service-card-${index}`}
                  >
                    {/* Animated background on hover */}
                    <motion.div
  initial={{ scale: 0 }}
  animate={hoveredService === index ? { scale: 2.4 } : { scale: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90`}
 />

                    {/* Emoji floating top right */}
                    <motion.div
                      animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-4 right-4 text-2xl opacity-30 group-hover:opacity-60 transition-opacity"
                    >
                      {service.emoji}
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="relative bg-accent rounded-xl p-4 w-fit mb-6 group-hover:bg-white/20 transition-colors duration-300 overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <IconComponent
                        className="text-primary group-hover:text-white transition-colors duration-300 relative z-10"
                        size={32}
                      />
                    </motion.div>

                    {/* Number */}
                    <div className="absolute bottom-6 right-6 font-heading text-5xl font-black text-primary/20 group-hover:text-white/20 transition-colors duration-300 leading-none select-none z-10">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                   <h3 className="font-heading text-xl md:text-2xl font-semibold text-secondary mb-4 relative z-10 group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-text-light leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Bottom accent line */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.4 }}
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.color} rounded-b-2xl`}
                    />
                  </motion.div>
                </TiltCard>
              );
            })}

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="relative bg-gradient-to-br from-primary to-emerald-600 p-8 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between"
            >
              <MorphBlob className="w-48 h-48 bg-white/10 -top-10 -right-10" duration={6} />
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 rounded-xl border-2 border-white/40 flex items-center justify-center mb-6"
                >
                  <Sparkles className="text-white" size={24} />
                </motion.div>
                <h3 className="font-heading text-2xl font-bold text-white mb-4">
                  Don't see what you need?
                </h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  We offer many more specialized treatments. Book a consultation and let us create your perfect smile.
                </p>
              </div>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative z-10 bg-white text-primary font-semibold px-6 py-3 rounded-xl text-center hover:shadow-lg transition-all duration-300"
              >
                Consult Now →
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-16 md:py-28 px-6 md:px-12 lg:px-24 bg-accent relative overflow-hidden">
        
        <MorphBlob className="w-96 h-96 bg-primary/5 -top-20 -left-20" duration={10} />
        <MorphBlob className="w-80 h-80 bg-green-200/20 -bottom-20 -right-20" duration={8} delay={2} />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-white text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-sm"
            >
              Got Questions?
            </motion.span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary">
              Frequently Asked
              <span className="block bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-green-50 hover:border-green-100 transition-colors"
              >
                <motion.button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  whileHover={{ backgroundColor: 'rgba(76,175,80,0.04)' }}
                  data-testid={`faq-question-${index}`}
                >
                  <div className="flex items-center gap-4 pr-4">
                    <motion.span
                      animate={{ backgroundColor: openFaq === index ? 'rgb(76,175,80)' : 'rgb(232,245,233)' }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ color: openFaq === index ? 'white' : 'rgb(76,175,80)' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.span>
                    <span className="font-heading font-semibold text-lg text-secondary">
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0, backgroundColor: openFaq === index ? 'rgb(76,175,80)' : 'rgb(232,245,233)' }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    <ChevronDown
                      className={openFaq === index ? 'text-white' : 'text-primary'}
                      size={18}
                    />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-[72px] text-text-light leading-relaxed border-t border-green-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 md:py-28 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        
        {/* Subtle background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(76,175,80,0.06),transparent)]" />

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-gradient-to-br from-secondary to-gray-800 rounded-3xl p-12 md:p-20 overflow-hidden max-w-5xl mx-auto"
          >
            {/* Internal blobs */}
            <MorphBlob className="w-80 h-80 bg-primary/20 -top-20 -right-20" duration={7} />
            <MorphBlob className="w-60 h-60 bg-emerald-400/10 -bottom-20 -left-20" duration={9} delay={1} />
            
            {/* Dot texture inside card */}
            <div
              className="absolute inset-0 opacity-10 rounded-3xl"
              style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />

            {/* Floating dental icons */}
            {['🦷', '✨', '😁', '💎'].map((emoji, i) => (
              <motion.span
                key={i}
                className="absolute text-3xl opacity-20 select-none pointer-events-none"
                style={{
                  top: [`15%`, `70%`, `20%`, `65%`][i],
                  left: [`8%`, `5%`, `88%`, `85%`][i],
                }}
                animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
              >
                {emoji}
              </motion.span>
            ))}

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-400"
                />
                Now Accepting New Patients
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
              >
                Ready to Experience
                <span className="block bg-gradient-to-r from-primary via-emerald-400 to-green-300 bg-clip-text text-transparent">
                  Quality Dental Care?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                Book your appointment today and let our expert team take care of your smile.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.a
                  href="/contact"
                  data-testid="services-cta-button"
                  whileHover={{ scale: 1.06, boxShadow: '0 20px 50px rgba(76,175,80,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white rounded-full px-10 py-4 font-semibold text-lg shadow-lg transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative z-10">Schedule Appointment</span>
                  <motion.span
                    className="relative z-10"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>

                <motion.a
                  href="tel:+1234567890"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full px-8 py-4 font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  📞 Call Now
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;