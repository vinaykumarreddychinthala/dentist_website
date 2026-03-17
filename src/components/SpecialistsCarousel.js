import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';

const specialists = [
  {
    id: 1,
    role: 'Orthodontist',
    name: 'Dr. David Wilson',
    description: 'Specialist in root canal treatments, combining precision and comfort.',
    experience: 'Practicing since 2014',
    image: 'https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg'
  },
  {
    id: 2,
    role: 'Esthetician',
    name: 'Dr. Emma Robinson',
    description: 'Crafts aesthetic transformations with veneers and cosmetic care.',
    experience: 'Practicing since 2016',
    image: 'https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg'
  },
  {
    id: 3,
    role: 'Endodontist',
    name: 'Dr. Sophia Turner',
    description: 'Specialist in root canal treatments, combining precision and comfort.',
    experience: 'Practicing since 2012',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg'
  },
  {
    id: 4,
    role: 'Periodontist',
    name: 'Dr. James Thompson',
    description: 'Expert in gum health and complex implant integration strategies.',
    experience: 'Practicing since 2010',
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg'
  },
  {
    id: 5,
    role: 'Oral Surgeon',
    name: 'Dr. Michael Chen',
    description: 'Specialises in painless wisdom tooth extraction and corrective surgery.',
    experience: 'Practicing since 2015',
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg'
  }
];

const SpecialistsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % specialists.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + specialists.length) % specialists.length);
  };

  // Helper to determine card position relative to current index
  // 0 = Active front card
  // 1, 2, 3 = Cards to the right (scaled down)
  // -1 = Card exiting to the back/left
  const getCardIndex = (actualIndex) => {
    let diff = actualIndex - currentIndex;
    
    // Handle wrap-around for smooth infinite sliding
    if (direction === 1 && diff < -1) {
      diff += specialists.length;
    } else if (direction === -1 && diff > 1) {
      diff -= specialists.length;
    }
    
    // Ensure exiting card always gets -1 mapping if we just passed it going forwards
    if (direction === 1 && diff === specialists.length - 1) {
      diff = -1;
    }
    return diff;
  };

  // Variants map index differences to 3D positions
  const cardVariants = {
    animate: (diff) => {
      // Exiting card (goes back and left, fades to 0)
      if (diff === -1) {
        return {
          x: -120,
          scale: 0.8,
          opacity: 0,
          zIndex: 0,
          transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
        };
      }
      
      // Active card (front center)
      if (diff === 0) {
        return {
          x: 0,
          scale: 1,
          opacity: 1,
          zIndex: 10,
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
        };
      }

      // Queued cards (stacked to the right)
      if (diff > 0) {
        return {
          // Each subsequent card pushes further right, scales down more
          x: diff * 280, 
          scale: 1 - (diff * 0.1),
          // Fade opacity gently further back in queue
          opacity: 1 - (diff * 0.15),
          zIndex: 10 - diff,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
        };
      }

      // Default hidden fallback
      return {
        x: 400,
        scale: 0.8,
        opacity: 0,
        zIndex: 0
      };
    }
  };

  if (!isClient) return null;

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #ecfdf5 0%, #dcfce7 40%, #bbf7d0 100%)' }}>
      
      {/* Light subtle inner glow / backdrop */}
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(34,197,94,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto max-w-7xl">
        
        {/* Main Glass Panel */}
        <div className="relative bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 md:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden min-h-[600px] flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
          
          {/* Subtle decoration inside glass panel */}
          <div className="absolute top-0 right-0 p-8 text-primary/40 font-bold tracking-widest text-xs uppercase z-20">Specialists</div>

          {/* LEFT SIDE: Content */}
          <div className="w-full lg:w-5/12 z-20 flex flex-col justify-center">
            
            <h2 className="font-heading text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#112a46] leading-tight mb-6">
              Meet the minds <br />
              behind your smile
              
              {/* Mini Avatar Group */}
              <span className="inline-flex items-center ml-4 align-middle bg-white rounded-full p-1 shadow-sm border border-green-50">
                {specialists.slice(0,3).map((s, i) => (
                  <img key={i} src={s.image} alt={s.name} className="w-8 h-8 rounded-full border-2 border-white object-cover -ml-2 first:ml-0" />
                ))}
                <span className="bg-[#112a46] text-white text-[10px] font-bold px-2 py-1 rounded-full ml-1 -translate-x-2 relative z-10">+14</span>
              </span>
            </h2>

            <p className="text-[#4b5563] text-lg leading-relaxed mb-10 max-w-md">
              Our team of dedicated professionals brings precision, empathy, 
              and artistry to every treatment — combining years of experience 
              with a shared passion for truly personalized care.
            </p>

            <button className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors duration-300">
              View all specialists →
            </button>

            {/* Navigation Controls */}
            <div className="mt-16 flex items-center gap-4 text-sm font-semibold text-[#112a46]">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors bg-white shadow-sm"
              >
                <ArrowLeft size={16} />
              </button>
              
              <span className="tracking-widest">
                {String(currentIndex + 1).padStart(2, '0')}/{String(specialists.length).padStart(2, '0')}
              </span>
              
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-[#16a34a] shadow-md transition-colors"
                style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: 3D Carousel Perspective Container */}
          <div className="w-full lg:w-7/12 relative h-[450px] lg:h-[500px] perspective-1000">
            
            <div className="absolute inset-y-0 left-0 w-full h-full flex items-center">
              <AnimatePresence initial={false} mode="popLayout">
                {specialists.map((specialist, i) => {
                  const diff = getCardIndex(i);
                  
                  // Only render cards that are relatively close to the active index to save DOM nodes
                  if (diff < -1 || diff > 4) return null;

                  return (
                    <motion.div
                      key={specialist.id}
                      custom={diff}
                      variants={cardVariants}
                      animate="animate"
                      initial={false}
                      className="absolute left-0 lg:left-10 w-[280px] md:w-[300px] bg-primary rounded-xl overflow-hidden origin-left flex flex-col"
                      style={{ height: "420px" }}
                    >
                      {/* Top Label */}
                      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {specialist.role}
                      </div>

                      {/* Video/Play overlay if active */}
                      {diff === 0 && (
                        <a 
                          href="https://www.instagram.com/reels/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] z-20 w-16 h-16 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors"
                        >
                          <Play className="text-white ml-1" size={24} fill="currentColor" />
                        </a>
                      )}

                      {/* Image wrapper */}
                      <div className="relative h-[260px] w-full bg-slate-100">
                        <img 
                          src={specialist.image} 
                          alt={specialist.name} 
                          className="w-full h-full object-cover object-top"
                        />
                        {/* Soft green gradient overlay at bottom of image to blend into card */}
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-primary to-transparent"></div>
                      </div>

                      {/* Content panel */}
                      <div className="p-5 text-white flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2 tracking-tight">{specialist.name}</h3>
                          <p className="text-green-100 text-xs leading-relaxed mb-4 line-clamp-2">
                            {specialist.description}
                          </p>
                        </div>
                        <p className="text-green-200/80 text-[10px] uppercase tracking-widest">{specialist.experience}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default SpecialistsCarousel;
