import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const IosiLogo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.div
      className="relative w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{ 
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Effetto glow di base */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-transparent blur-xl" />

      {/* Container principale con effetti di profondità */}
      <div className="relative group cursor-pointer">
        {/* Overlay radiale per profondità */}
        <div className="absolute inset-0 bg-radial-gradient opacity-30 mix-blend-overlay" />

        {/* Logo principale */}
        <motion.div
          className="relative z-10 p-4"
          animate={{
            scale: isHovered ? 1.05 : 1,
            filter: isHovered ? 'brightness(1.2)' : 'brightness(1)'
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          {/* Logo IO */}
          <div className="relative w-full h-full">
            <img 
              src="/images/logo-iosi.webp"
              alt="Logo IO"
              className="w-[80%] mx-auto h-auto object-contain"
            />
          </div>

          {/* Effetto hover overlay */}
          <motion.div
            className="absolute inset-0 bg-white/10 rounded-lg opacity-0
                       transition-opacity duration-300"
            animate={{ opacity: isHovered ? 1 : 0 }}
          />
        </motion.div>
      </div>

      {/* Glow effect ambientale */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 to-transparent 
                       blur-2xl transform scale-150" />
      </div>
    </motion.div>
  );
};

// Stili custom per il gradiente radiale
const styles = `
  .bg-radial-gradient {
    background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);
  }

  .text-shadow-lg {
    text-shadow: 0 0 15px rgba(255,255,255,0.15);
  }

  @keyframes pulse-subtle {
    0% { opacity: 0.9; }
    50% { opacity: 1; }
    100% { opacity: 0.9; }
  }

  .animate-pulse-subtle {
    animation: pulse-subtle 3s infinite;
  }
`;

// Inserisci gli stili nel documento
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default IosiLogo;
