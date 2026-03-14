import React from 'react';

const Loader = ({ text = "Loading" }) => {
  // 12 items to form a complete circle
  const items = Array.from({ length: 12 });
  const radius = 110; // Radius of the rotating circle

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] w-full gap-12 bg-white overflow-hidden py-16">
      
      {/* Top Text */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#4CAF50] mb-8 tracking-wide drop-shadow-sm font-heading">
        {text}
      </h2>
      
      {/* Animation Container */}
      <div className="relative w-[320px] h-[320px] flex items-center justify-center">
        
        {/* Revolving container - spins the entire group of circled logos */}
        <div className="absolute inset-0 flex items-center justify-center animate-[spin_10s_linear_infinite]">
          {items.map((_, i) => {
            const angle = i * 30; // 360 degrees / 12 items
            return (
              <div
                key={i}
                className="absolute w-12 h-12"
                style={{
                  // Position in a circle using rotate and translate
                  transform: `rotate(${angle}deg) translateY(${radius}px)`,
                }}
              >
                <img 
                  src="/logo.png" 
                  alt="Circled Logo" 
                  className="w-full h-full object-contain filter drop-shadow-md"
                  // Rotate individual logos so they point consistently relative to the center
                  style={{ transform: 'rotate(180deg)' }} 
                />
              </div>
            );
          })}
        </div>

        {/* Center Logo - Static (or could pulse if desired) */}
        <div className="absolute w-[120px] h-[120px] z-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-[#E8F5E9] p-3">
          <img 
            src="/logo.png" 
            alt="Center Logo" 
            className="w-full h-full object-contain" 
          />
        </div>
        
      </div>
      
      {/* Bottom Text */}
      {/* <h3 className="text-4xl md:text-5xl font-extrabold text-[#4CAF50] mt-12 drop-shadow-sm font-heading animate-pulse">
        Rotating
      </h3> */}
      
    </div>
  );
};

export default Loader;
