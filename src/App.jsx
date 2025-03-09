import React, { useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OptimizedImage from './components/OptimizedImage';
import Navigation from './components/Navigation';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// ⚠️ OPTIMIZED - DO NOT MODIFY - Background Image with Scroll Effect
const BackgroundImage = () => {
  const { scrollYProgress } = useScroll();
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 2]);

  return (
    <motion.div 
      className="fixed inset-0 w-full h-full -z-10 flex items-center justify-center overflow-hidden"
      style={{
        willChange: 'transform'
      }}
    >
      <motion.div 
        style={{ 
          scale,
          filter: blur.get() ? `blur(${blur.get()}px)` : 'none',
          willChange: 'transform'
        }}
        className="relative w-[150%] h-[150%] origin-center"
        transition={{
          type: "spring",
          stiffness: 40,
          damping: 15,
          restDelta: 0.001
        }}
      >
        <OptimizedImage
          src="/images/hero-bg.webp"
          alt="Background texture"
          className="w-full h-full object-contain"
          style={{
            minWidth: '100%',
            minHeight: '100%',
            transform: 'scale(0.85)'
          }}
          priority={true}
        />
      </motion.div>
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>
    </motion.div>
  );
};

// ⚠️ OPTIMIZED - DO NOT MODIFY - Floating Particles Effect
const FloatingParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 100 }).map(() => ({
      x: Math.random() * 100,
      delay: Math.random() * 20,
      duration: Math.random() * 15 + 20,
      size: Math.random() * 2 + 2,
      initialY: -(Math.random() * 100),
    }));
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            opacity: 0.4,
          }}
          initial={{ y: `${particle.initialY}%` }}
          animate={{
            y: ['0vh', '100vh'],
            x: [
              `${particle.x}%`,
              `${particle.x + (Math.random() * 10 - 5)}%`,
              `${particle.x + (Math.random() * 10 - 5)}%`,
              `${particle.x}%`
            ],
          }}
          transition={{
            y: {
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay,
            },
            x: {
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1],
              delay: particle.delay,
            }
          }}
        />
      ))}
    </div>
  );
};

// ⚠️ OPTIMIZED - DO NOT MODIFY - Hero Text Component
const HeroText = () => {
  const text = ['Trasformiamo', 'la tua visione in', 'esperienze uniche'];
  
  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="font-black text-[12vw] leading-[0.85] tracking-tighter text-white mix-blend-difference">
          {text.map((line, index) => (
            <motion.div
              key={line}
              className="block"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.2,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {line}
            </motion.div>
          ))}
        </h1>
      </motion.div>
      <motion.p
        className="mt-12 text-xl text-white/70 max-w-xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        Un approccio innovativo alla comunicazione digitale, dove creatività e strategia si fondono per dare vita a esperienze memorabili.
      </motion.p>
    </motion.div>
  );
};

// ⚠️ OPTIMIZED - DO NOT MODIFY - Scroll Indicator
const ScrollIndicator = () => (
  <motion.div 
    className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 text-white/50"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.2 }}
  >
    <motion.div 
      className="w-0.5 h-16 bg-white/20"
      animate={{ 
        scaleY: [1, 0.5, 1],
        opacity: [0.2, 0.5, 0.2]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <span className="text-sm uppercase tracking-widest">Scroll</span>
  </motion.div>
);

// ⚠️ OPTIMIZED - DO NOT MODIFY - Texture Background
const TextureBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div 
          className="w-full h-full scale-150 rounded-full bg-primary/20 blur-3xl transform rotate-45"
          style={{
            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
          }}
        />
      </motion.div>
    </div>
  );
};

const AboutSection = () => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '40%']);
  
  return (
    <div className="relative min-h-screen bg-neutral-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-12">
            Chi Siamo
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">La Nostra Storia</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Nati dalla passione per l'innovazione e il design, in Aura Group 
                trasformiamo le idee in esperienze digitali memorabili. La nostra 
                missione è quella di elevare il modo in cui i brand comunicano 
                con il loro pubblico.
              </p>
              <p className="text-white/70 leading-relaxed">
                Ogni progetto è un'opportunità per spingerci oltre i confini 
                convenzionali, creando soluzioni che non solo rispondono alle 
                esigenze attuali, ma anticipano quelle future.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Innovazione</h4>
                <p className="text-white/70">
                  Utilizziamo le più recenti tecnologie per creare esperienze 
                  digitali all'avanguardia.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Creatività</h4>
                <p className="text-white/70">
                  Il nostro approccio creativo sfida le convenzioni per 
                  distinguere il tuo brand.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Risultati</h4>
                <p className="text-white/70">
                  Ogni strategia è mirata a raggiungere obiettivi concreti 
                  e misurabili.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/" element={
          <div className="relative">
            {/* ⚠️ OPTIMIZED SECTION - DO NOT MODIFY - Hero Section */}
            <BackgroundImage />
            <FloatingParticles />
            
            <div className="relative min-h-screen">
              <TextureBackground />
              <Navigation />
              <main className="relative flex items-center justify-center w-full h-screen px-4">
                <HeroText />
              </main>
              <ScrollIndicator />
            </div>
            
            {/* ⚠️ OPTIMIZED SECTION - DO NOT MODIFY - About Section */}
            <div className="relative min-h-screen bg-neutral-900/30 backdrop-blur-[2px]">
              <div className="container mx-auto px-4 py-24">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="max-w-4xl mx-auto"
                >
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-12">
                    Chi Siamo
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-4">La Nostra Storia</h3>
                      <p className="text-white/90 leading-relaxed mb-6">
                        Nati dalla passione per l'innovazione e il design, in Aur
                        a Group 
                        trasformiamo le idee in esperienze digitali memorabili. La nostra 
                        missione è quella di elevare il modo in cui i brand comunicano 
                        con il loro pubblico.
                      </p>
                      <p className="text-white/90 leading-relaxed">
                        Ogni progetto è un'opportunità per spingerci oltre i confini 
                        convenzionali, creando soluzioni che non solo rispondono alle 
                        esigenze attuali, ma anticipano quelle future.
                      </p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="space-y-8"
                    >
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Innovazione</h4>
                        <p className="text-white/90">
                          Utilizziamo le più recenti tecnologie per creare esperienze 
                          digitali all'avanguardia.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Creatività</h4>
                        <p className="text-white/90">
                          Il nostro approccio creativo sfida le convenzioni per 
                          distinguere il tuo brand.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Risultati</h4>
                        <p className="text-white/90">
                          Ogni strategia è mirata a raggiungere obiettivi concreti 
                          e misurabili.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
