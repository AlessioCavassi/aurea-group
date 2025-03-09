import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NavigationLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className="relative group">
      <motion.div
        className="relative px-6 py-2"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <span className={`relative z-10 text-sm tracking-widest transition-colors duration-500 ${isActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
          {children}
        </span>
        
        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
          transition={{ duration: 0.3 }}
        />
        
        {/* Active Indicator */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full bg-white/[0.05] border border-white/10"
            layoutId="activeNav"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </motion.div>
    </Link>
  );
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-6 transition-all duration-700 ${
        isScrolled ? 'bg-black/20 backdrop-blur-lg' : ''
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <Link to="/" className="group">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <span className="text-xl tracking-widest bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
            AUREA
          </span>
        </motion.div>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-2">
        <NavigationLink to="/">HOME</NavigationLink>
        <NavigationLink to="/about">ABOUT</NavigationLink>
        <NavigationLink to="/projects">PROJECTS</NavigationLink>
        
        {/* Contact Button */}
        <NavigationLink to="/contact">
          <motion.div
            className="ml-6 px-6 py-2 rounded-full bg-white/[0.03] border border-white/10 text-sm text-white tracking-widest hover:bg-white/[0.07] transition-colors duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CONTACT
          </motion.div>
        </NavigationLink>
      </div>

      {/* Background Blur Effect when scrolled */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="absolute inset-0 bg-black/20 backdrop-blur-lg -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
