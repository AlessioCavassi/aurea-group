import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getImagePath } from '../config/images';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  priority = false,
  onLoad = () => {},
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = getImagePath(src);
      img.onload = () => {
        setIsLoaded(true);
        onLoad();
      };
      img.onerror = () => setError(true);
    }
  }, [src, priority, onLoad]);
  
  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad();
  };
  
  const handleImageError = () => {
    setError(true);
  };
  
  if (error) {
    return (
      <div className={`bg-gray-200 ${className}`} style={{ width, height }}>
        <div className="flex items-center justify-center w-full h-full text-gray-500">
          Image not found
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ width, height }}
    >
      {/* Placeholder shimmer effect */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      )}
      
      <img
        src={getImagePath(src)}
        alt={alt}
        className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </motion.div>
  );
};

export default OptimizedImage;
