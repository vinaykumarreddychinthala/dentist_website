import { motion } from 'framer-motion';
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
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24">
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

          <div className="mt-16">
            <div className="relative">
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-primary"></div>
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'} md:w-1/2`}
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-primary ml-8 md:ml-0">
                    <div className="absolute left-0 md:left-auto md:right-full md:mr-4 top-6 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg transform -translate-x-3 md:translate-x-0"></div>
                    <div className="text-2xl font-bold text-primary font-heading mb-2">{item.year}</div>
                    <p className="text-text-light">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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

      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-secondary text-center mb-12"
          >
            Meet Our Experts
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {[
          {
             name: 'Dr. Niral Dedhia',
             qualification: 'B.D.S. (M.U.H.S.), P.G.D.C.R.',
             image: '/Maledoctor.png',
          },
          {
             name: 'Dr. Jesal Soneta',
             qualification: 'B.D.S. (M.U.H.S.), A.C.T Esthetics & Restorative Dentistry (U.C.L.A. USA), Certified Implantologist (Manipal University)',
             image: '/femaledoctor.png',
          },
            ].map((doctor, index) => (
<motion.div
  key={index}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.1 }}
  className="bg-white overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
  data-testid={`doctor-card-${index}`}
>
  {/* Image Section */}
  <div className="relative h-80 flex items-center justify-center bg-gray-50 overflow-hidden">
    <img
      src={doctor.image}
      alt={doctor.name}
      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
    />
  </div>

  {/* Content Section */}
  <div className="p-6 text-center">
    <h3 className="font-heading text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
      {doctor.name}
    </h3>
    <p className="text-text-light leading-relaxed">
      {doctor.qualification}
    </p>
  </div>
</motion.div>
            ))}
          </div>

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
