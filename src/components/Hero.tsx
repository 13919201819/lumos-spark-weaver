
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sparkles, Cube, Layers } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const controls = useAnimation();
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  
  // Enhanced parallax effect with more depth
  const textX = useTransform(mouseX, [-300, 300], [70, -70]);
  const textY = useTransform(mouseY, [-300, 300], [70, -70]);
  
  const buttonX = useTransform(mouseX, [-300, 300], [50, -50]);
  const buttonY = useTransform(mouseY, [-300, 300], [50, -50]);
  
  // Background shapes parallax - with increased depth perception
  const shape1X = useTransform(mouseX, [-300, 300], [-80, 80]);
  const shape1Y = useTransform(mouseY, [-300, 300], [-80, 80]);
  const shape2X = useTransform(mouseX, [-300, 300], [80, -80]);
  const shape2Y = useTransform(mouseY, [-300, 300], [80, -80]);
  const shape3X = useTransform(mouseX, [-300, 300], [100, -100]);
  const shape3Y = useTransform(mouseY, [-300, 300], [60, -60]);
  
  useEffect(() => {
    // Initial entrance animation with staggered timing
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: "easeOut", staggerChildren: 0.3 }
    });
    
    // Mouse move effect for entire container - not on mobile
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [controls, mouseX, mouseY, isMobile]);

  // Enhanced auto-animation for mobile devices
  useEffect(() => {
    if (isMobile) {
      // Create more dynamic automatic animation for mobile
      const interval = setInterval(() => {
        mouseX.set(Math.sin(Date.now() / 1500) * 150);
        mouseY.set(Math.cos(Date.now() / 1800) * 150);
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [isMobile, mouseX, mouseY]);
  
  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center pt-20 pb-10 relative overflow-hidden perspective-3000"
    >
      {/* Enhanced 3D background elements with more dynamic animations */}
      <div className="absolute inset-0 z-0">
        {/* Primary background shapes with deeper 3D effect */}
        <motion.div 
          style={{ x: shape1X, y: shape1Y }}
          className="absolute top-1/3 -left-32 w-[600px] h-[600px] bg-purple-700/20 rounded-full filter blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          style={{ x: shape2X, y: shape2Y }}
          className="absolute bottom-1/3 -right-32 w-[500px] h-[500px] bg-blue-700/20 rounded-full filter blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          style={{ x: shape3X, y: shape3Y }}
          className="absolute top-2/3 left-1/4 w-[450px] h-[450px] bg-accent/20 rounded-full filter blur-[90px]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Additional ambient particles and elements */}
        <div className="absolute inset-0 z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.7, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Floating geometric elements with enhanced 3D rotation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            rotateZ: [0, 360],
            rotateX: [0, 45, 0],
            rotateY: [0, -45, 0],
            x: [-30, 30, -30],
            y: [-20, 20, -20],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 right-1/4 w-64 h-64 border-2 border-white/20 rounded-lg filter blur-sm transform rotate-45 preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            rotateZ: [45, 405],
            rotateX: [20, -20, 20],
            rotateY: [-30, 30, -30],
            x: [20, -20, 20],
            y: [30, -30, 30],
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            delay: 3
          }}
          className="absolute bottom-1/4 left-1/5 w-80 h-80 border-2 border-accent/20 rounded-full filter blur-sm transform"
          style={{ transformStyle: 'preserve-3d' }}
        />

        {/* Animated cuboid overlay for enhanced 3D feeling */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-3/4 h-[120%] max-w-7xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="w-full h-full preserve-3d">
            <motion.div 
              className="absolute inset-0 border border-white/5 rounded-xl"
              animate={{ 
                rotateX: [0, 2, 0, -2, 0], 
                rotateY: [0, 5, 0, -5, 0],
                z: [0, 30, 0, -30, 0]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ 
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                transformOrigin: 'center center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-xl" />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className="max-w-5xl mx-auto text-center space-y-10"
        >
          {/* Enhanced 3D text container with more dramatic parallax */}
          <motion.div
            style={!isMobile ? { x: textX, y: textY } : {}}
            className="relative transform-gpu preserve-3d"
            whileHover={{ scale: 1.03 }}
          >
            {/* Animated glow effect */}
            <motion.div 
              className="absolute -inset-14 rounded-3xl bg-gradient-to-r from-purple-600/10 via-blue-600/5 to-accent/10 blur-[100px] opacity-70"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* 3D hovering elements */}
            <motion.div
              className="absolute -top-20 right-10 md:right-40 opacity-60"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cube size={40} className="text-accent/70" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-16 left-10 md:left-40 opacity-60"
              animate={{
                y: [0, 15, 0],
                rotate: [0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Layers size={40} className="text-primary/70" />
            </motion.div>
            
            {/* Enhanced main title with custom animations for each word */}
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold gradient-text leading-tight relative"
              style={{ 
                textShadow: "0 20px 50px rgba(0,0,0,0.4)",
                fontWeight: 800
              }}
            >
              <motion.div className="inline-block overflow-hidden">
                <motion.span 
                  className="inline-block"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ 
                    scale: 1.05, 
                    color: "#a78bfa",
                    rotateX: 10,
                    textShadow: "0 30px 60px rgba(0,0,0,0.6)"
                  }}
                  style={{ display: 'inline-block' }}
                >
                  <span className="relative">
                    Advanced
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-1 bg-accent/70 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0 }}
                    />
                  </span>
                </motion.span>
              </motion.div>{" "}
              
              <motion.div className="inline-block overflow-hidden">
                <motion.span 
                  className="inline-block"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  whileHover={{ 
                    scale: 1.05, 
                    color: "#818cf8",
                    rotateX: 10,
                    textShadow: "0 30px 60px rgba(0,0,0,0.6)"
                  }}
                  style={{ display: 'inline-block' }}
                >
                  <span className="relative">
                    Intelligence
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-1 bg-primary/70 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0 }}
                    />
                  </span>
                </motion.span>
              </motion.div>{" "}
              
              <motion.div className="inline-block overflow-hidden">
                <motion.span 
                  className="inline-block"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  whileHover={{ 
                    scale: 1.05, 
                    color: "#60a5fa",
                    rotateX: 10,
                    textShadow: "0 30px 60px rgba(0,0,0,0.6)"
                  }}
                  style={{ display: 'inline-block' }}
                >
                  <span className="relative">
                    Solutions
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500/70 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0 }}
                    />
                  </span>
                </motion.span>
              </motion.div>
            </motion.h1>
            
            {/* Animated subtitle with floating sparkles */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-2xl md:text-3xl text-white/80 max-w-3xl mx-auto mt-8 relative"
              >
                <motion.span
                  className="absolute -left-8 top-0"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 10, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="h-6 w-6 text-accent/80" />
                </motion.span>
                
                <motion.span
                  className="absolute -right-8 top-0"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, -10, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <Sparkles className="h-6 w-6 text-primary/80" />
                </motion.span>
                
                CLUMOSS pioneers cutting-edge AI technologies across multiple domains, 
                <span className="relative inline-block">
                  <motion.span 
                    className="relative z-10"
                    whileHover={{ color: "#a78bfa" }}
                  >
                    &nbsp;delivering innovative solutions&nbsp;
                  </motion.span>
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-1 bg-accent/50 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: [0, 1, 1, 0], 
                      opacity: [0, 1, 1, 0] 
                    }}
                    transition={{ 
                      duration: 4, 
                      times: [0, 0.3, 0.7, 1],
                      repeat: Infinity, 
                      repeatDelay: 5 
                    }}
                  />
                </span> 
                to complex challenges.
              </motion.p>
            </motion.div>
          </motion.div>
          
          {/* Enhanced 3D buttons with better hover effects */}
          <motion.div 
            style={!isMobile ? { x: buttonX, y: buttonY } : {}}
            className="flex flex-col md:flex-row gap-6 justify-center pt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {/* Primary CTA button with enhanced effects */}
            <motion.a 
              href="#subsidiaries" 
              className="group relative px-10 py-4 rounded-full overflow-hidden transform-gpu"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button background glow and animations */}
              <motion.span 
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"
                animate={{
                  backgroundPosition: ['0% center', '200% center'],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Button hover glow effect */}
              <motion.span 
                className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-600/60 to-blue-500/60 blur-lg transition-opacity duration-500"
                animate={{
                  scale: [0.85, 1.05, 0.85],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center font-semibold text-lg text-white">
                <span>Our Subsidiaries</span>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                >
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>
              </span>
            </motion.a>
            
            {/* Secondary CTA with enhanced glass effect */}
            <motion.a 
              href="#domains" 
              className="group relative px-10 py-4 rounded-full overflow-hidden transform-gpu border border-white/20 backdrop-blur-lg"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button subtle background */}
              <motion.span 
                className="absolute inset-0 bg-white/10 rounded-full"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Button hover effect - radial gradient spreading */}
              <motion.span 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ 
                  scale: 1,
                  transition: { duration: 0.4 } 
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
                  transformOrigin: 'center'
                }}
              />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center font-medium text-lg text-white">
                Explore Domains
                <motion.span 
                  className="ml-2"
                  animate={{ rotate: [0, 360] }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.span>
              </span>
            </motion.a>
          </motion.div>
          
          {/* Enhanced 3D floating badge with more impressive effects */}
          <motion.div
            className="mt-16 perspective-1000 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <motion.div
              className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 max-w-lg mx-auto transform-gpu preserve-3d shadow-2xl"
              animate={{ 
                rotateX: [0, 6, 0, -6, 0],
                rotateY: [0, 12, 0, -12, 0],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Add inner 3D layers */}
              <motion.div
                className="absolute inset-0 bg-white/5 rounded-2xl transform"
                style={{ transform: 'translateZ(40px)', opacity: 0.6 }}
              />
              
              <motion.div className="relative z-10">
                <motion.div 
                  className="flex items-center justify-center mb-3"
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <Sparkles size={24} className="text-accent mr-2" />
                </motion.div>
                
                <p className="text-white/90 text-lg text-center">
                  <motion.span 
                    className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-purple-400"
                    animate={{ 
                      backgroundPosition: ['0% center', '100% center', '0% center']
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    Cutting-edge AI
                  </motion.span>{" "}
                  technology that's transforming industries worldwide.{" "}
                  <motion.span
                    className="relative inline-block"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span
                      className="absolute -inset-1 rounded blur-sm bg-accent/20"
                      animate={{
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                    <span className="relative text-white font-semibold">Schedule a demo today!</span>
                  </motion.span>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: [0.5, 1, 0.5], 
          y: [0, 15, 0] 
        }}
        transition={{ 
          delay: 2, 
          duration: 3,
          repeat: Infinity 
        }}
      >
        <a href="#about" className="text-white/70 hover:text-white transition-colors flex flex-col items-center p-2">
          <motion.span 
            className="text-sm font-medium mb-2 tracking-wider"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            EXPLORE
          </motion.span>
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            animate={{
              y: [0, 8, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </motion.svg>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
