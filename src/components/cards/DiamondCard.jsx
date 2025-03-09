/*
 * ⚠️ OPTIMIZED COMPONENT - DO NOT MODIFY ⚠️
 * 
 * DiamondCard Component
 * 
 * This component has been carefully optimized for:
 * - Performance
 * - Animation smoothness
 * - 3D effects
 * - Light effects
 * 
 * Any modifications may break the delicate balance of:
 * - Glass effects
 * - 3D transformations
 * - Animation sequences
 * - Light and shadow interplay
 * 
 * Last optimized: 2024
 */

import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const DiamondCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const handleMouseMove = (e) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    controls.start({
      rotateY: (x - 0.5) * 30,
      rotateX: (y - 0.5) * -20,
      transition: { duration: 0.3, ease: "easeOut" }
    });
  };

  // Definizione delle facce del diamante
  const diamondFaces = {
    top: {
      clip: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
      style: {
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0) 100%)',
      }
    },
    left: {
      clip: 'polygon(0% 50%, 30% 0%, 30% 100%)',
      style: {
        background: 'linear-gradient(225deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 60%, rgba(0,0,0,0) 100%)',
      }
    },
    right: {
      clip: 'polygon(100% 50%, 70% 0%, 70% 100%)',
      style: {
        background: 'linear-gradient(-45deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 60%, rgba(0,0,0,0) 100%)',
      }
    },
    bottom: {
      clip: 'polygon(30% 100%, 70% 100%, 50% 70%)',
      style: {
        background: 'linear-gradient(315deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.02) 40%, rgba(0,0,0,0.05) 100%)',
      }
    },
  };

  const glassEffect = {
    background: `
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.1) 25%,
        rgba(255, 255, 255, 0.05) 50%,
        rgba(255, 255, 255, 0.02) 75%
      ),
      radial-gradient(
        circle at 50% 0%,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.1) 25%,
        transparent 50%
      )
    `,
    boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
  };

  const services = [
    "Brand Identity",
    "Digital Strategy",
    "Web Development",
    "Social Media",
    "Content Creation"
  ];

  return (
    <motion.div
      className="relative w-[400px] h-[500px] cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        controls.start({ rotateX: 0, rotateY: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="w-full h-full"
        animate={controls}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center'
        }}
      >
        {/* Facce del diamante */}
        {Object.entries(diamondFaces).map(([faceName, faceData]) => (
          <motion.div
            key={faceName}
            className="absolute inset-0"
            style={{
              clipPath: faceData.clip,
              ...faceData.style,
              ...glassEffect,
              transform: faceName === 'top' ? 'translateZ(50px)' :
                        faceName === 'left' ? 'rotateY(-45deg) translateZ(35px)' :
                        faceName === 'right' ? 'rotateY(45deg) translateZ(35px)' :
                        'translateZ(-50px)',
              backfaceVisibility: 'hidden',
            }}
            animate={{
              opacity: isHovered ? (faceName === 'top' ? 1 : 0.8) : (faceName === 'top' ? 0.9 : 0.6),
            }}
          >
            {/* Logo e contenuto */}
            {faceName === 'top' && (
              <>
                {/* Logo sopra il diamante */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ zIndex: 10 }}
                >
                  <motion.img 
                    src="/images/logo-iosi.webp"
                    alt="io sì"
                    className="w-48 h-auto"
                    animate={{
                      scale: isHovered ? [1, 1.6, 0] : 1,
                      opacity: isHovered ? [1, 1, 0] : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      times: [0, 0.6, 1],
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Lista servizi dentro il diamante */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.8,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: isHovered ? 1.2 : 0,
                  }}
                >
                  <div className="flex flex-col items-center gap-4 text-white/90">
                    {services.map((service, index) => (
                      <motion.div
                        key={service}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : 20
                        }}
                        transition={{
                          duration: 0.5,
                          delay: isHovered ? 1.2 + (index * 0.1) : 0
                        }}
                        className="text-lg font-light tracking-wide"
                      >
                        {service}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {/* Lista servizi nelle facce laterali */}
            {(faceName === 'left' || faceName === 'right') && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: faceName === 'left' ? 'rotateY(45deg)' : 'rotateY(-45deg)',
                  opacity: isHovered ? 1 : 0,
                }}
              >
                <div className="flex flex-col items-center gap-4 px-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: isHovered ? 1 : 0, 
                        y: isHovered ? 0 : 20
                      }}
                      transition={{
                        duration: 0.5,
                        delay: isHovered ? 1.2 + (index * 0.1) : 0
                      }}
                      className="text-lg font-light tracking-wide"
                    >
                      {service}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Scintille */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: 'translateZ(60px)',
              mixBlendMode: 'screen',
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Ombra proiettata */}
        <motion.div
          className="absolute -bottom-12 left-1/2 w-4/5 h-12 blur-xl"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(98,0,255,0.1) 0%, transparent 70%)',
            transform: 'translateX(-50%)'
          }}
          animate={{
            opacity: isHovered ? 0.4 : 0.2,
            scale: isHovered ? 1.1 : 1
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default DiamondCard;