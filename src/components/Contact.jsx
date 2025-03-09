import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const FloatingLabel = ({ children, isActive, error }) => (
  <motion.span
    className={`absolute left-4 pointer-events-none tracking-wider transition-all duration-300 ${
      isActive ? '-translate-y-7 text-xs' : 'translate-y-0'
    } ${error ? 'text-red-400' : 'text-neutral-400'}`}
  >
    {children}
  </motion.span>
);

const Input3D = ({ label, type = "text", value, onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = inputRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / 10);
    mouseY.set((e.clientY - centerY) / 10);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={inputRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: useSpring(useTransform(mouseY, [-50, 50], [5, -5])),
        rotateY: useSpring(useTransform(mouseX, [-50, 50], [-5, 5])),
      }}
      className="relative perspective-1000"
    >
      <FloatingLabel isActive={isFocused || value} error={error}>
        {label}
      </FloatingLabel>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 py-4 bg-white/[0.01] backdrop-blur-sm border rounded-xl 
        ${error ? 'border-red-400/50' : 'border-white/5'} 
        text-white outline-none focus:border-white/20 transition-colors`}
      />
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-0 text-xs text-red-400"
        >
          {error}
        </motion.span>
      )}
    </motion.div>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name) newErrors.name = 'Name is required';
    if (!formState.email) newErrors.email = 'Email is required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formState.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formState.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simuliamo una chiamata API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset dopo 3 secondi
      setTimeout(() => {
        setIsSuccess(false);
        setFormState({ name: '', email: '', message: '' });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white pt-32 pb-24 px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-extralight tracking-wider mb-6 bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
            Let's Create Something
            <br />
            Extraordinary
          </h1>
          <p className="text-xl text-neutral-400 font-light">
            Transform your vision into digital excellence
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="relative space-y-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input3D
              label="YOUR NAME"
              value={formState.name}
              onChange={(e) => {
                setFormState({ ...formState, name: e.target.value });
                setErrors({ ...errors, name: '' });
              }}
              error={errors.name}
            />
            <Input3D
              label="YOUR EMAIL"
              type="email"
              value={formState.email}
              onChange={(e) => {
                setFormState({ ...formState, email: e.target.value });
                setErrors({ ...errors, email: '' });
              }}
              error={errors.email}
            />
          </div>

          <div className="relative perspective-1000">
            <FloatingLabel isActive={formState.message || errors.message} error={errors.message}>
              YOUR MESSAGE
            </FloatingLabel>
            <textarea
              value={formState.message}
              onChange={(e) => {
                setFormState({ ...formState, message: e.target.value });
                setErrors({ ...errors, message: '' });
              }}
              className={`w-full px-4 py-4 h-40 bg-white/[0.01] backdrop-blur-sm border rounded-xl resize-none
              ${errors.message ? 'border-red-400/50' : 'border-white/5'} 
              text-white outline-none focus:border-white/20 transition-colors`}
            />
            {errors.message && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-0 text-xs text-red-400"
              >
                {errors.message}
              </motion.span>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className={`relative w-full py-4 rounded-xl text-sm tracking-widest overflow-hidden
            ${isSuccess ? 'bg-emerald-500' : 'bg-white/[0.03] hover:bg-white/[0.07]'} 
            transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <motion.div
                className="absolute inset-0 bg-white/[0.03]"
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : null}
            <span className="relative z-10">
              {isSuccess ? 'MESSAGE SENT' : isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            </span>
          </motion.button>
        </motion.form>
      </div>

      {/* Ambient Light Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] bg-purple-600/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px] animate-pulse" />
      </div>
    </div>
  );
};

export default Contact;
