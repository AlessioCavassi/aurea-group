import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GolfCard = () => {
  const [isHit, setIsHit] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let timer;
    if (isHovering) {
      // Aspetta 0.3 secondi per il caricamento e poi colpisce
      timer = setTimeout(() => {
        setIsHit(true);
      }, 300);
    } else {
      setIsHit(false);
    }
    return () => clearTimeout(timer);
  }, [isHovering]);

  return (
    <div className="relative w-96 h-96">
      {/* Card Background */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(10, 10, 10, 0.3)',
          backdropFilter: 'blur(8px)',
        }}
      />
      
      {/* Golf Ball */}
      <motion.div
        className="absolute"
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'white',
          left: '22%',
          top: '70%',
          zIndex: 10,
          boxShadow: `
            0 0 5px rgba(255, 255, 255, 0.5),
            0 0 10px rgba(255, 255, 255, 0.3),
            0 0 15px rgba(255, 255, 255, 0.2),
            inset 0 0 10px rgba(255, 255, 255, 0.8)
          `,
        }}
        animate={isHit ? {
          x: -150,
          y: -100,
          opacity: 0,
          transition: {
            duration: 0.4,
            delay: 0.25,
            ease: "easeOut"
          }
        } : {}}
      />

      {/* Golf Club Container */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => {
          setIsHovering(false);
          setTimeout(() => setIsHit(false), 1500);
        }}
        whileHover={{
          scale: 1.05,
          rotate: isHit ? 0 : -45,
          transition: { 
            duration: 0.15,
            type: "spring",
            stiffness: 900,
            damping: 15,
            mass: 0.8
          }
        }}
      >
        <div className="relative" style={{ width: '300px' }}>
          {/* Golf Club Image */}
          <motion.img
            src="/images/mazza.webp"
            alt="Golf Club"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              width: '100%',
              height: 'auto',
              filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))',
            }}
          />
          
          {/* Text */}
          <motion.div
            className="absolute whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              top: '0',
              left: '85%',
              transform: 'translate(-50%, -50%)',
              color: '#4eff91',
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              fontSize: '1.4rem',
              fontWeight: '600',
              letterSpacing: '0.25em',
              textShadow: `
                0 0 7px rgba(78, 255, 145, 0.3),
                0 0 10px rgba(78, 255, 145, 0.2),
                0 0 21px rgba(78, 255, 145, 0.1),
                0 0 42px rgba(78, 255, 145, 0.1)
              `,
              WebkitBackgroundClip: 'text',
              WebkitTextStroke: '1px rgba(78, 255, 145, 0.3)',
            }}
            whileHover={{
              textShadow: `
                0 0 7px rgba(78, 255, 145, 0.6),
                0 0 10px rgba(78, 255, 145, 0.4),
                0 0 21px rgba(78, 255, 145, 0.3),
                0 0 42px rgba(78, 255, 145, 0.2)
              `,
              transition: { duration: 0.2 }
            }}
          >
            GOLF CARD
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default GolfCard;
