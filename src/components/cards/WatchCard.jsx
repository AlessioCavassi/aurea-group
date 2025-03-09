/*
 * ⚠️ OPTIMIZED COMPONENT - DO NOT MODIFY ⚠️
 * 
 * WatchCard Component - Luxury Watch Design
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const WatchCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();
  const audioRef = useRef(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const services = [
    "Website Development",
    "Social Media Strategy",
    "Digital Marketing",
    "Brand Consulting",
    "Content Creation"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Gestione migliorata dell'audio
  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsFlipping(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.6; // Volume ottimale
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsFlipping(true);
    controls.start({ opacity: 0 });
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const handleFlipComplete = () => {
    setIsFlipping(false);
  };

  const luxuryWatchEffect = {
    background: `
      linear-gradient(
        135deg,
        rgba(218, 165, 32, 0.1) 0%,
        rgba(255, 215, 0, 0.2) 25%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(218, 165, 32, 0.2) 75%,
        rgba(0, 0, 0, 0.1) 100%
      ),
      radial-gradient(
        circle at 50% 50%,
        rgba(255, 215, 0, 0.15) 0%,
        rgba(0, 0, 0, 0.2) 100%
      )
    `,
    boxShadow: `
      0 0 40px rgba(218, 165, 32, 0.2),
      inset 0 0 30px rgba(255, 215, 0, 0.1),
      0 0 20px rgba(255, 255, 255, 0.1)
    `,
    backdropFilter: 'blur(8px)',
  };

  return (
    <div className="relative">
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/tick-tock.wav" type="audio/wav" />
      </audio>
      {/* Lancette con effetto metallico - Ora fuori dal contenitore principale */}
      <motion.div 
        className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#FFD700] z-[100]"
        animate={{
          opacity: isHovered ? 0 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute top-[20%] left-1/2 origin-bottom w-0.5 h-[150px] bg-gradient-to-b from-[#FFD700] to-[#DAA520]"
        style={{
          transformOrigin: '50% 0%',
          boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
          zIndex: 99
        }}
        animate={{
          opacity: isHovered ? 0 : 1,
          rotate: rotation
        }}
        transition={{ 
          opacity: { duration: 0.3 },
          rotate: { duration: 0.05, ease: "linear" }
        }}
      />
      <motion.div
        className="absolute top-[20%] left-1/2 origin-bottom w-1 h-[110px] bg-gradient-to-b from-[#FFD700] to-[#DAA520]"
        style={{
          transformOrigin: '50% 0%',
          boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
          zIndex: 98
        }}
        animate={{
          opacity: isHovered ? 0 : 1,
          rotate: rotation * 0.5
        }}
        transition={{ 
          opacity: { duration: 0.3 },
          rotate: { duration: 0.05, ease: "linear" }
        }}
      />

      <motion.div
        className="relative w-[400px] h-[500px] cursor-pointer select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: '2000px' }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{
            rotateY: isHovered ? 180 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
          onAnimationComplete={handleFlipComplete}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Face - Watch Design */}
          <motion.div
            className="absolute inset-0 rounded-[50%] flex items-center justify-center"
            style={{
              ...luxuryWatchEffect,
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Strati di profondità del quadrante */}
            {[40, 30, 20, 10, 0].map((depth, index) => (
              <motion.div
                key={depth}
                className="absolute inset-0 rounded-full"
                style={{
                  ...luxuryWatchEffect,
                  transform: `translateZ(${depth}px)`,
                  opacity: 1 - (index * 0.15),
                  border: index === 0 ? '2px solid rgba(255, 215, 0, 0.3)' : 'none'
                }}
              />
            ))}

            {/* Quadrante principale */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(30,30,30,0.95))',
                transform: 'translateZ(45px)',
                border: '3px solid rgba(218, 165, 32, 0.5)',
              }}
            >
              {/* Indici delle ore */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    width: '2px',
                    height: '12px',
                    background: 'linear-gradient(to bottom, #FFD700, #DAA520)',
                    top: '10%',
                    left: '50%',
                    transform: `
                      rotate(${i * 30}deg) 
                      translateY(-120px)
                      translateZ(2px)
                    `,
                    boxShadow: '0 0 5px rgba(255, 215, 0, 0.5)'
                  }}
                />
              ))}
            </motion.div>

            {/* Logo Container con effetto fluttuante */}
            <motion.div
              className="relative z-10"
              style={{ transform: 'translateZ(60px)' }}
              animate={{
                scale: isHovered ? [1, 1.2, 0] : 1,
                opacity: isHovered ? [1, 1, 0] : 1,
              }}
              transition={{
                duration: 1.5,
                times: [0, 0.6, 1],
                ease: "easeInOut"
              }}
            >
              {/* Logo principale "TDC" */}
              <motion.div 
                className="flex flex-col items-center"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(218, 165, 32, 0.3))'
                }}
              >
                <motion.h1 
                  className="text-5xl font-serif tracking-wider"
                  style={{
                    color: '#DAA520',
                    background: `linear-gradient(
                      to bottom,
                      #FFD700 0%,
                      #DAA520 50%,
                      #B8860B 100%
                    )`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: "'Cinzel', 'Trajan Pro', 'Times New Roman', serif",
                    textShadow: '0 0 20px rgba(218, 165, 32, 0.2)'
                  }}
                >
                  TDC
                </motion.h1>
                
                {/* Sottotitolo "THE DUKE'S CHRONO" */}
                <motion.div 
                  className="text-sm tracking-[0.3em] mt-2"
                  style={{
                    color: '#DAA520',
                    fontFamily: "'Cinzel', 'Trajan Pro', 'Times New Roman', serif",
                    letterSpacing: '0.3em',
                    opacity: 0.9,
                    textShadow: '0 0 10px rgba(218, 165, 32, 0.2)'
                  }}
                >
                  THE DUKE'S CHRONO
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Mini lampi elettrici */}
            {[...Array(5)].map((_, i) => {
              // Posizioni predefinite per ogni tuono
              const positions = [
                { left: '30%', top: '25%', rotate: 35 },
                { left: '65%', top: '40%', rotate: -25 },
                { left: '45%', top: '60%', rotate: 15 },
                { left: '25%', top: '45%', rotate: -35 },
                { left: '70%', top: '65%', rotate: 20 }
              ];
              return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: '8px',
                  height: '30px',
                  left: positions[i].left,
                  top: positions[i].top,
                  transform: `
                    translateZ(70px) 
                    rotate(${positions[i].rotate}deg)
                  `,
                  clipPath: `polygon(
                    50% 0%,
                    55% 35%,
                    100% 35%,
                    50% 100%,
                    45% 65%,
                    0% 65%
                  )`,
                  background: `
                    linear-gradient(
                      45deg,
                      rgba(0, 0, 0, 0.8),
                      rgba(218, 165, 32, 0.4),
                      rgba(0, 0, 0, 0.8)
                    )
                  `,
                  boxShadow: `
                    0 0 15px rgba(0, 0, 0, 0.8),
                    0 0 25px rgba(218, 165, 32, 0.3),
                    inset 0 0 10px rgba(218, 165, 32, 0.2)
                  `,
                  filter: 'brightness(1.1) contrast(1.2)'
                }}
                animate={{
                  opacity: [0, 1, 0.7, 1, 0],
                  scale: [0.8, 1.2, 1, 1.1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3 + (i * 1.5),
                  ease: "easeInOut"
                }}
              >
                {/* Effetto glow interno */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(
                        circle at center,
                        rgba(0, 0, 0, 0.9),
                        rgba(218, 165, 32, 0.3) 50%,
                        transparent 70%
                      )
                    `,
                    mixBlendMode: 'overlay'
                  }}
                  animate={{
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Particelle scintillanti */}
                {[...Array(4)].map((_, j) => (
                  <motion.div
                    key={j}
                    className="absolute w-0.5 h-0.5 rounded-full"
                    style={{
                      background: 'white',
                      boxShadow: '0 0 8px rgba(255, 215, 0, 1)',
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: Math.random() * 10 - 5,
                      y: Math.random() * 10 - 5
                    }}
                    transition={{
                      duration: 0.8,
                      delay: j * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                ))}
              </motion.div>
              );
            })}
          </motion.div>

          {/* Back Face */}
          <motion.div
            className="absolute inset-0 rounded-[50%] flex items-center justify-center"
            style={{
              ...luxuryWatchEffect,
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              background: 'rgba(0, 0, 0, 0.9)',
              border: '3px solid rgba(218, 165, 32, 0.5)',
            }}
          >
            {/* Services List */}
            <motion.div
              className="relative z-10 flex flex-col items-center gap-4 px-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{
                duration: 0.5,
                delay: 0.4,
              }}
            >
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
                    delay: isHovered ? 0.6 + (index * 0.1) : 0
                  }}
                  className="text-lg font-light tracking-wide text-[#FFD700] text-center"
                >
                  {service}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WatchCard;
