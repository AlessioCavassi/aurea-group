import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const MagneticCard = ({ children, scale = 1, tolerance = 400, strength = 50 }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-tolerance, tolerance], [strength, -strength]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-tolerance, tolerance], [-strength, strength]), springConfig);
  const posX = useSpring(mouseX, springConfig);
  const posY = useSpring(mouseY, springConfig);
  const scale3d = useSpring(isHovered ? scale : 1, springConfig);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        x: posX,
        y: posY,
        scale: scale3d,
      }}
    >
      {children}
    </motion.div>
  );
};

const GlassCard = ({ children, className = "" }) => (
  <div className={`relative p-12 rounded-3xl bg-white/[0.01] backdrop-blur-sm border border-white/5 shadow-2xl ${className}`}>
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-white/0" />
    <div className="relative z-10">{children}</div>
  </div>
);

const About = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="relative min-h-screen bg-neutral-900 text-white overflow-hidden">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: {
            color: "transparent",
          },
          particles: {
            number: { value: 20, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: {
              value: 0.1,
              random: true,
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.1,
                sync: false
              }
            },
            size: {
              value: 100,
              random: true,
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 50,
                sync: false
              }
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "bounce" },
              attract: { enable: true, rotateX: 600, rotateY: 1200 }
            }
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true
            },
            modes: {
              repulse: { distance: 150, duration: 0.4 }
            }
          }
        }}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />

      <div className="relative z-10 container mx-auto px-8 py-24">
        <div className="grid grid-cols-12 gap-8">
          {/* Intro Section */}
          <div className="col-span-12 mb-32">
            <MagneticCard>
              <GlassCard>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h1 className="text-7xl font-extralight tracking-wider mb-8 bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
                    AUREA GROUP
                  </h1>
                  <p className="text-2xl font-light leading-relaxed text-neutral-300 max-w-2xl">
                    Dove l'arte digitale incontra l'eccellenza del design.
                    Creiamo esperienze che trascendono l'ordinario.
                  </p>
                </motion.div>
              </GlassCard>
            </MagneticCard>
          </div>

          {/* Philosophy Section */}
          <div className="col-span-7">
            <MagneticCard>
              <GlassCard className="h-full">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                >
                  <span className="text-sm font-light tracking-widest text-neutral-500 mb-4 block">01</span>
                  <h2 className="text-4xl font-light tracking-wider mb-6">LA NOSTRA FILOSOFIA</h2>
                  <p className="text-xl font-light leading-relaxed text-neutral-300">
                    Minimalismo audace. Dettagli impeccabili.
                    Creiamo esperienze digitali che elevano il luxury
                    a nuove vette di raffinatezza.
                  </p>
                </motion.div>
              </GlassCard>
            </MagneticCard>
          </div>

          {/* Stats Grid */}
          <div className="col-span-5 grid grid-cols-2 gap-8">
            {[
              { number: "10+", label: "Anni di Esperienza" },
              { number: "50+", label: "Progetti Completati" },
              { number: "98%", label: "Clienti Soddisfatti" },
              { number: "24/7", label: "Supporto Dedicato" }
            ].map((stat, index) => (
              <MagneticCard key={index}>
                <GlassCard>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-light mb-2">{stat.number}</div>
                    <div className="text-sm text-neutral-400">{stat.label}</div>
                  </motion.div>
                </GlassCard>
              </MagneticCard>
            ))}
          </div>

          {/* Approach Section */}
          <div className="col-span-12 mt-8">
            <MagneticCard>
              <GlassCard>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="grid grid-cols-3 gap-16"
                >
                  {[
                    {
                      title: "Design",
                      description: "Creiamo interfacce che catturano l'essenza del lusso digitale"
                    },
                    {
                      title: "Sviluppo",
                      description: "Tecnologie all'avanguardia per performance eccezionali"
                    },
                    {
                      title: "Innovazione",
                      description: "Spingiamo i confini del possibile nel mondo digitale"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <h3 className="text-2xl font-light mb-4">{item.title}</h3>
                      <p className="text-neutral-400 font-light">{item.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </GlassCard>
            </MagneticCard>
          </div>
        </div>
      </div>

      {/* Ambient Light Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px] animate-pulse" />
      </div>
    </div>
  );
};

export default About;
