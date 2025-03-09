import React from 'react';
import Navigation from '../components/Navigation';
import Projects from '../components/Projects';
import { motion } from 'framer-motion';

const ProjectsPage = () => {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#2D0F28' }}>
      {/* Gradient overlay per profondità */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>
      
      {/* Texture overlay per profondità */}
      <div 
        className="fixed inset-0 opacity-[0.15] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px'
        }}
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <motion.div 
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2D0F28]/90 via-[#2D0F28] to-[#1A0918]" />
          
          {/* Radial gradient per spotlight effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, transparent 20%, #1A0918 70%)'
            }}
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h1 
            className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Work
          </motion.h1>
          <motion.p 
            className="text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Esploriamo insieme i confini della creatività digitale attraverso i nostri progetti più innovativi.
          </motion.p>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <Projects />
    </div>
  );
};

export default ProjectsPage;
