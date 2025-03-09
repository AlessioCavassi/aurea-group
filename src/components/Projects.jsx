import React from 'react';
import { motion } from 'framer-motion';
import DiamondCard from './cards/DiamondCard';
import WatchCard from './cards/WatchCard';
import GolfCard from './cards/GolfCard';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Projects = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="relative min-h-screen bg-neutral-900 pt-32 pb-24 overflow-hidden">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: {
            color: "transparent",
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1,
              straight: false,
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
              },
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.1,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false,
              },
            },
          },
          detectRetina: true,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: ["grab", "bubble"],
                parallax: {
                  enable: true,
                  force: 60,
                  smooth: 10,
                },
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 200,
                links: {
                  opacity: 0.3,
                },
              },
              bubble: {
                distance: 250,
                size: 10,
                duration: 2,
                opacity: 0.4,
              },
              push: {
                quantity: 4,
              },
            },
          },
        }}
        style={{ 
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-extralight tracking-wider mb-6 bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
            Our Projects
          </h1>
          <p className="text-xl text-neutral-400 font-light max-w-2xl mx-auto">
            A collection of our finest digital experiences, where innovation meets elegance
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-64">
          <div className="-ml-[400px]">
            <DiamondCard />
          </div>
          
          <div className="-mt-[500px] ml-[600px]">
            <WatchCard />
          </div>

          <div className="-mt-[400px] -ml-[700px]">
            <GolfCard />
          </div>
        </div>
      </div>

      {/* Ambient Light Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] bg-purple-600/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px] animate-pulse" />
      </div>
    </div>
  );
};

export default Projects;