import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef } from "react";
import { Handshake, Microscope, HeartHandshake, Leaf } from "lucide-react";

const About = () => {
  const timeline = [
    { year: '2002', event: 'Dentis3 Care founded in downtown New York by Dr. Torres & Dr. Whitfield.' },
    { year: '2007', event: 'Expanded to 6-chair facility; introduced digital X-rays and 3D imaging.' },
    { year: '2012', event: 'Added orthodontics wing and welcomed certified Invisalign specialists.' },
    { year: '2018', event: 'Installed CEREC same-day crown technology serving 500+ crowns/year.' },
    { year: '2024', event: 'Reached 15,000 patients milestone. Launched free annual dental health day.' },
  ];
  const videoRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: horizontalScrollRef,
  });
  
  // Maps 0-1 scroll progress to a horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

const handleTimeUpdate = () => {
  const video = videoRef.current;
  if (!video) return;

  const start = 20; // skip first 30 sec
  const end = video.duration - 15; // cut last 15 sec

  if (video.currentTime < start) {
    video.currentTime = start;
  }

  if (video.currentTime >= end) {
    video.currentTime = start;
  }
};

 const coreValues = [
  {
    icon: Handshake,
    title: "Patient-Centered Care",
    description:
      "Every treatment plan is tailored to your unique needs, not a one-size-fits-all protocol.",
  },
  {
    icon: Microscope,
    title: "Clinical Excellence",
    description:
      "We invest in advanced diagnostics and continuous training to deliver best-in-class outcomes.",
  },
  {
    icon: HeartHandshake,
    title: "Community Commitment",
    description:
      "Free dental days, school outreach, and partnerships with local health organizations.",
  },
  {
    icon: Leaf,
    title: "Sustainable Practice",
    description:
      "Digital records, reduced radiation X-rays, and eco-conscious materials across all procedures.",
  },
];

  return (
    <div className="page-transition">
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-accent to-white">
        <div className="container mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-bold text-secondary text-center mb-6"
            data-testid="about-title"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl leading-relaxed text-text-light max-w-3xl mx-auto text-center"
          >
            A healthy smile begins with healthy teeth. At Dentis3Care, you get all
            advanced dental services: Smile Design, Root Canal Treatment, Implants,
            Whitening.
          </motion.p>
        </div>
      </section>
<section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
  {/* Soft Background Glow */}
  <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

  <div className="container mx-auto relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto"
    >
      {/* Dentist Image with Floating Effect */}
<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  className="relative"
>
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <img
      src="/DentistPhoto.jpeg"
      alt="Dentist smiling"
      className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
    />
  </motion.div>
</motion.div>

      {/* Quote Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-8 leading-tight">
          Our Motto
        </h2>

        {/* Animated Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-2xl md:text-3xl font-semibold text-primary leading-relaxed italic border-l-4 border-primary pl-6"
        >
          <p>Eat What You Love.</p>
          <p className="mt-2">We’ll Take Care of Your Smile.</p>
        </motion.div>

        <p className="mt-8 text-lg text-text-light leading-relaxed">
          We believe dental care should empower you to enjoy life without
          hesitation. Whether it’s your favorite dessert or a confident smile in
          photos, our mission is to protect, restore, and enhance your smile
          for life.
        </p>

        {/* CTA Button */}
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-8 bg-primary text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold"
        >
          Book Your Consultation
        </motion.a>
      </motion.div>
    </motion.div>
  </div>
</section>
      {/* ===== MEET OUR EXPERTS ===== */}
      <section className="relative w-full text-center py-10 bg-accent z-0">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4"
          >
            Meet Our Experts
          </motion.h2>
          <p className="text-text-light text-lg">Leading specialists dedicated to your perfect smile.</p>
        </div>
      </section>

      {/* Wrapper for sticky scroll effect */}
      <div className="h-[200vh] relative w-full z-10">
        
        {/* Doctor 1 Slide */}
        <section className="sticky top-0 h-[100dvh] w-full bg-[#f8fbfa] overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.1)] rounded-t-[2.5rem] flex items-center justify-center z-10 border-t border-green-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(76,175,80,0.04),transparent)]" />
          <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center max-w-6xl">
            <div className="relative h-[55vh] md:h-[70vh] w-full flex items-center justify-center bg-white rounded-3xl shadow-xl overflow-hidden group">
              <img
                src="/Maledoctor.png"
                alt="Dr. Niral Dedhia"
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="text-left bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-sm">
              <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">Lead Specialist</span>
              <h3 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
                Dr. Niral Dedhia
              </h3>
              <p className="text-xl text-text-light mb-6 leading-relaxed">
                B.D.S. (M.U.H.S.), P.G.D.C.R.
              </p>
              <p className="text-text-light leading-relaxed">
                With over 15 years of experience in comprehensive dental care, Dr. Dedhia leads our clinical team with a focus on advanced diagnostics and patient-first treatment planning.
              </p>
            </div>
          </div>
        </section>

        {/* Doctor 2 Slide */}
        <section className="sticky top-0 h-[100dvh] w-full bg-white overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.15)] rounded-t-[2.5rem] flex items-center justify-center z-20 border-t border-green-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_20%,rgba(16,185,129,0.05),transparent)]" />
          <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center max-w-6xl">
            {/* Image is now the first child to match slide 1 */}
            <div className="relative h-[55vh] md:h-[70vh] w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl overflow-hidden group">
              <img
                src="/femaledoctor.png"
                alt="Dr. Jesal Soneta"
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Text is second to match slide 1 */}
            <div className="text-left bg-accent/50 backdrop-blur-sm p-8 rounded-3xl border border-green-50 shadow-sm">
              <span className="text-emerald-500 font-bold tracking-widest text-sm uppercase mb-2 block">Aesthetic & Implant Specialist</span>
              <h3 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
                Dr. Jesal Soneta
              </h3>
              <p className="text-xl text-text-light mb-6 leading-relaxed">
                B.D.S., A.C.T (U.C.L.A. USA), Certified Implantologist
              </p>
              <p className="text-text-light leading-relaxed">
                Dr. Soneta brings world-class expertise in cosmetic dentistry and implantology from UCLA, blending art and science to create flawless, natural-looking smiles.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* ===== HUMBLE BEGINNINGS (Now Below Doctors) ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white relative z-30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-6">
              From Humble Beginnings
            </h2>
            <div className="space-y-4 text-lg text-text-light leading-relaxed mb-8">
              <p>
                Dentis3 Care started as a small family practice in downtown New York, founded by Dr. Amanda Torres and her mentor, Dr. James Whitfield. Their mission was simple: provide world-class dental care that feels like visiting a trusted friend, not a sterile medical facility.
              </p>
              <p>
                Over two decades, Dentis3 Care has expanded to a team of 12 specialist dentists, invested in cutting-edge CEREC, cone-beam CT, and laser dentistry technology, and earned recognition from the American Dental Association for excellence in patient care.
              </p>
              <p>
                Today, we serve patients from across the tri-state area, many of whom have been with us for 10, 15, even 20 years — bringing their children and grandchildren to join the Dentis3 Care family.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white hover:bg-[#43A047] transition-all duration-300 rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Book a Consultation
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-white text-primary border-2 border-primary hover:bg-accent transition-all duration-300 rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== HORIZONTAL JOURNEY TIMELINE ===== */}
      <section ref={horizontalScrollRef} className="relative h-[300vh] bg-accent">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center pt-24 pb-16">
          {/* Continuous curving background path */}
          <div className="absolute inset-0 pointer-events-none z-0 flex items-center">
            <svg className="w-full h-[300px] text-primary/15" preserveAspectRatio="none" viewBox="0 0 1000 100">
               <path d="M0,50 Q250,100 500,50 T1000,50" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          <motion.div style={{ x }} className="flex gap-16 md:gap-32 px-[10vw] relative z-10 w-max items-center">
            {timeline.map((item, index) => (
              <div 
                key={index}
                className={`relative w-[300px] md:w-[400px] flex-shrink-0 ${
                  index % 2 === 0 ? '-mt-32' : 'mt-32'
                }`}
              >
                {/* Visual node on the "route" line */}
                <div className={`absolute left-1/2 -translate-x-1/2 ${
                  index % 2 === 0 ? '-bottom-16' : '-top-16'
                } w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(76,175,80,0.5)]`} />
                
                {/* Connecting dotted line to the node */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-12 border-l-2 border-dashed border-primary/40 ${
                  index % 2 === 0 ? '-bottom-12' : '-top-12'
                }`} />

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-xl border border-green-50 hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  <span className="text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-emerald-400 mb-4 block">
                    {item.year}
                  </span>
                  <p className="text-text-light text-lg leading-relaxed">
                    {item.event}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-accent via-white to-white overflow-hidden">
        {/* mesh gradient background */}
<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(76,175,80,0.12),transparent)]"></div>

{/* dot grid pattern */}
<div
  className="absolute inset-0 opacity-50"
  style={{
    backgroundImage:
      "radial-gradient(circle, rgba(76,175,80,0.15) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  }}
></div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-4">
              Our Technologies
            </h2>
            <h3 className="text-2xl font-semibold text-primary mb-6">
              Precision Implants, Engineered to Last
            </h3>
            <p className="text-lg text-text-light leading-relaxed mb-8">
              We use only Swiss-manufactured titanium implants with a 99.2% ten-year success rate. Our guided implant surgery uses 3D cone-beam CT planning for millimeter precision, minimising recovery time and maximising long-term stability.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                'Guided surgery with 3D CT scan planning',
                'Same-day provisional crowns when eligible',
                'Full-arch All-on-4 and All-on-6 solutions',
                'Bone grafting and sinus lift expertise',
                'Lifetime implant warranty program',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="text-primary mt-1 flex-shrink-0">✓</div>
                  <span className="text-text-light">{item}</span>
                </motion.div>
              ))}
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white hover:bg-[#43A047] transition-all duration-300 rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Schedule Implant Consultation
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl my-16"
         >
           <video
             ref={videoRef}
             autoPlay
             muted
             playsInline
             onLoadedMetadata={() => {
               videoRef.current.currentTime = 30;
             }}
             onTimeUpdate={handleTimeUpdate}
             className="w-full h-full object-cover"
           >
             <source src="/dentalweb.mp4" type="video/mp4" />
           </video>
         </motion.div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-gradient-to-br from-green-50 via-white to-white">
        {/* Mesh background */}
<div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(76,175,80,0.15),transparent)]"></div>

{/* Dot grid pattern */}
<div
  className="absolute inset-0 z-0 opacity-40"
  style={{
    backgroundImage:
      "radial-gradient(circle, rgba(76,175,80,0.15) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  }}
></div>
        <div className="container mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-secondary text-center mb-6"
          >
            Our Core Values
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-light text-center mb-12 max-w-2xl mx-auto"
          >
            The principles that guide every decision, every treatment, every smile.
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-green-50 hover:border-primary"
              >
                <div className="mb-4 flex justify-center">
  <value.icon size={42} strokeWidth={2.2} className="text-primary" />
</div>
                <h3 className="font-heading text-xl font-bold text-secondary mb-3">{value.title}</h3>
                <p className="text-text-light leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-secondary text-center mb-12"
          >
            Visit Us
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
            >
              <div className="flex items-start gap-4">
                <MapPin className="text-primary flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-heading font-semibold text-xl text-secondary mb-2">
                    Our Location
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    Shop No. 2, Monarch Nagar, S.N.B. Marg, J.B. Nagar, Andheri (E),
                    400069
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-primary flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-heading font-semibold text-xl text-secondary mb-2">
                    Contact Number
                  </h3>
                  <a
                    href="tel:+919004332292"
                    className="text-primary hover:text-secondary transition-colors text-lg font-semibold"
                    data-testid="phone-link"
                  >
                    +91 9004332292
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-accent">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-secondary text-center mb-12"
          >
            Our Clinic
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                url: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                alt: 'Clinic Interior',
              },
              {
                url: 'https://images.pexels.com/photos/3845744/pexels-photo-3845744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                alt: 'Happy Patient',
              },
              {
                url: 'https://images.pexels.com/photos/3952124/pexels-photo-3952124.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                alt: 'Doctor Patient Interaction',
              },
              {
                url: 'https://images.pexels.com/photos/6812463/pexels-photo-6812463.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                alt: 'Dental Tools',
              },
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover-lift"
                data-testid={`gallery-image-${index}`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
