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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menu when route changes
  const location = useLocation();
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 py-4 sm:py-6 transition-all duration-700 ${
        isScrolled || isMenuOpen ? 'bg-black/30 backdrop-blur-lg' : ''
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

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden z-50 relative" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className="w-6 flex flex-col gap-1.5 items-end">
          <motion.div 
            className="h-0.5 bg-white" 
            animate={{ width: isMenuOpen ? '24px' : '24px', rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="h-0.5 bg-white" 
            animate={{ width: isMenuOpen ? '24px' : '16px', opacity: isMenuOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="h-0.5 bg-white" 
            animate={{ width: isMenuOpen ? '24px' : '20px', rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </button>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-2">
        <NavigationLink to="/">HOME</NavigationLink>
        <NavigationLink to="/about">ABOUT</NavigationLink>
        <NavigationLink to="/projects">PROJECTS</NavigationLink>
        
        {/* Contact Button */}
        <NavigationLink to="/contact">
          <motion.div
            className="ml-4 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 text-sm text-white tracking-widest hover:bg-white/[0.07] transition-colors duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CONTACT
          </motion.div>
        </NavigationLink>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-40 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex flex-col items-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Link to="/" className="text-2xl font-light text-white tracking-widest py-2">HOME</Link>
              <Link to="/about" className="text-2xl font-light text-white tracking-widest py-2">ABOUT</Link>
              <Link to="/projects" className="text-2xl font-light text-white tracking-widest py-2">PROJECTS</Link>
              <Link to="/contact" className="text-2xl font-light text-white tracking-widest py-2">CONTACT</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Blur Effect when scrolled */}
      <AnimatePresence>
        {(isScrolled || isMenuOpen) && (
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
