
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const controls = useAnimation();
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  
  // Enhanced parallax effect
  const textX = useTransform(mouseX, [-300, 300], [50, -50]);
  const textY = useTransform(mouseY, [-300, 300], [50, -50]);
  
  const buttonX = useTransform(mouseX, [-300, 300], [30, -30]);
  const buttonY = useTransform(mouseY, [-300, 300], [30, -30]);
  
  // Background shapes parallax - even more depth
  const shape1X = useTransform(mouseX, [-300, 300], [-40, 40]);
  const shape1Y = useTransform(mouseY, [-300, 300], [-40, 40]);
  const shape2X = useTransform(mouseX, [-300, 300], [40, -40]);
  const shape2Y = useTransform(mouseY, [-300, 300], [40, -40]);
  const shape3X = useTransform(mouseX, [-300, 300], [60, -60]);
  const shape3Y = useTransform(mouseY, [-300, 300], [30, -30]);
  
  useEffect(() => {
    // Initial entrance animation
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", staggerChildren: 0.2 }
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

  // Auto-animation for mobile devices
  useEffect(() => {
    if (isMobile) {
      // Create subtle automatic animation for mobile
      const interval = setInterval(() => {
        mouseX.set(Math.sin(Date.now() / 2000) * 100);
        mouseY.set(Math.cos(Date.now() / 2000) * 100);
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isMobile, mouseX, mouseY]);
  
  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center pt-20 pb-10 relative overflow-hidden perspective-1000"
    >
      {/* Enhanced 3D background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ x: shape1X, y: shape1Y }}
          className="absolute top-1/3 -left-32 w-96 h-96 bg-purple-700/20 rounded-full filter blur-3xl"
        />
        <motion.div 
          style={{ x: shape2X, y: shape2Y }}
          className="absolute bottom-1/3 -right-32 w-96 h-96 bg-blue-700/20 rounded-full filter blur-3xl"
        />
        <motion.div 
          style={{ x: shape3X, y: shape3Y }}
          className="absolute top-2/3 left-1/4 w-80 h-80 bg-accent/20 rounded-full filter blur-3xl"
        />
        
        {/* Additional floating elements with enhanced animations */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            y: [0, -25, 0],
            rotateZ: [0, 8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/4 right-1/4 w-40 h-40 bg-accent/10 rounded-full filter blur-xl"
        />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.5, 0.9, 0.5],
            y: [0, 30, 0],
            rotateZ: [0, -12, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/10 rounded-full filter blur-xl"
        />
        
        {/* Additional geometric shapes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            rotateZ: [0, 360],
            x: [-10, 10, -10],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 right-1/3 w-64 h-64 border-2 border-white/10 rounded-lg filter blur-sm transform rotate-45"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.div
            style={!isMobile ? { x: textX, y: textY } : {}}
            className="relative transform-gpu"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600/20 to-accent/20 blur-xl opacity-70"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold gradient-text leading-tight relative"
              style={{ textShadow: "0 15px 40px rgba(0,0,0,0.3)" }}
            >
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#a78bfa" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Advanced
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#818cf8" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Intelligence
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#60a5fa" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Solutions
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mt-6 relative"
            >
              CLUMOSS pioneers cutting-edge AI technologies across multiple domains, 
              delivering innovative solutions to complex challenges.
            </motion.p>
          </motion.div>
          
          <motion.div 
            style={!isMobile ? { x: buttonX, y: buttonY } : {}}
            className="flex flex-col md:flex-row gap-4 justify-center pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a 
              href="#subsidiaries" 
              className="group px-8 py-3 rounded-full bg-primary/90 hover:bg-primary text-white font-medium transition-all duration-300 text-lg relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.7)"
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-accent/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              />
              
              <motion.span className="relative z-10 flex items-center justify-center">
                <span>Our Subsidiaries</span>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>
              </motion.span>
              
              <motion.span 
                className="absolute -inset-1 rounded-full blur opacity-30 bg-gradient-to-r from-purple-600 to-accent group-hover:opacity-100 transition-opacity duration-500"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.a>
            
            <motion.a 
              href="#domains" 
              className="group px-8 py-3 rounded-full glass-button text-white font-medium text-lg relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(255, 255, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="absolute inset-0 bg-white/10 rounded-full transform origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ 
                  scaleX: 1,
                  transition: { duration: 0.4 } 
                }}
              />
              <motion.span 
                className="absolute -inset-1 rounded-full blur opacity-30 bg-white/20 group-hover:opacity-70 transition-opacity duration-500"
                animate={{ 
                  scale: [1, 1.03, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span className="relative z-10 flex items-center justify-center">
                Explore Domains
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  whileHover={{ rotate: 45 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>
              </span>
            </motion.a>
          </motion.div>
          
          {/* Enhanced 3D floating badge */}
          <motion.div
            className="mt-12 perspective-1000"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.div
              className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 max-w-sm mx-auto transform-gpu preserve-3d"
              animate={{ 
                rotateX: [0, 5, 0, -5, 0],
                rotateY: [0, 10, 0, -10, 0],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <p className="text-white/90 text-sm">
                <motion.span 
                  className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary"
                  animate={{ 
                    backgroundPosition: ['0% center', '100% center', '0% center']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Cutting-edge AI
                </motion.span> technology that's transforming industries worldwide. Schedule a demo today!
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: [0.5, 1, 0.5], 
          y: [0, 10, 0] 
        }}
        transition={{ 
          delay: 1.5, 
          duration: 2,
          repeat: Infinity 
        }}
      >
        <a href="#about" className="text-white/60 hover:text-white transition-colors block p-2">
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
              y: [0, 5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
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
