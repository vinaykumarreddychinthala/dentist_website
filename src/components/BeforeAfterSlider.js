import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';

const BeforeAfterSlider = ({
  beforeImage = "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  afterImage = "https://images.unsplash.com/photo-1590625909249-16cbaf37ad29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();

    // unified pointer event
    let newPos = (e.clientX - left) / width;
    newPos = Math.max(0, Math.min(1, newPos)); // clamp between 0 and 1

    setSliderPosition(newPos * 100);
  };

  const handlePointerDown = (e) => {
    // We call setPointerCapture if we want, but window listeners work fine too
    handlePointerMove(e);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handlePointerUp = () => {
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md md:max-w-lg aspect-[1/1] overflow-hidden rounded-[2rem] cursor-ew-resize select-none touch-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100"
      onPointerDown={handlePointerDown}
    >
      {/* After Image (Background) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `url('${afterImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Before Image (Cropped on top) */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url('${beforeImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </motion.div>

      {/* Slider Line & Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-white z-10"
        style={{ left: `${sliderPosition}%`, x: '-50%' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-primary border border-green-100 hover:scale-110 transition-transform">
          <MoveHorizontal size={24} className="text-primary pointer-events-none" />
          <span className="absolute -bottom-8 backdrop-blur-sm bg-black/40 text-white text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full pointer-events-none">Drag</span>
        </div>
      </motion.div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide z-20 pointer-events-none">Before</div>
      <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide z-20 pointer-events-none shadow-sm shadow-green-900/20">After</div>
    </div>
  );
};

export default BeforeAfterSlider;
