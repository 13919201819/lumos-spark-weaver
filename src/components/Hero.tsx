
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const controls = useAnimation();
  
  // Parallax effect
  const textX = useTransform(mouseX, [-300, 300], [30, -30]);
  const textY = useTransform(mouseY, [-300, 300], [30, -30]);
  
  const buttonX = useTransform(mouseX, [-300, 300], [20, -20]);
  const buttonY = useTransform(mouseY, [-300, 300], [20, -20]);
  
  // Background shapes parallax
  const shape1X = useTransform(mouseX, [-300, 300], [-20, 20]);
  const shape1Y = useTransform(mouseY, [-300, 300], [-20, 20]);
  const shape2X = useTransform(mouseX, [-300, 300], [20, -20]);
  const shape2Y = useTransform(mouseY, [-300, 300], [20, -20]);
  
  useEffect(() => {
    // Initial entrance animation
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", staggerChildren: 0.2 }
    });
    
    // Mouse move effect for entire container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [controls, mouseX, mouseY]);
  
  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden perspective-1000"
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
        
        {/* Additional floating elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.6,
            y: [0, -15, 0],
            rotateZ: [0, 5, 0],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-accent/10 rounded-full filter blur-xl"
        />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.7,
            y: [0, 20, 0],
            rotateZ: [0, -8, 0],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-primary/10 rounded-full filter blur-xl"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.div
            style={{ x: textX, y: textY }}
            className="relative transform-gpu"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold gradient-text leading-tight"
              style={{ textShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
            >
              Advanced Intelligence Solutions
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mt-6"
            >
              CLUMOSS pioneers cutting-edge AI technologies across multiple domains, 
              delivering innovative solutions to complex challenges.
            </motion.p>
          </motion.div>
          
          <motion.div 
            style={{ x: buttonX, y: buttonY }}
            className="flex flex-col md:flex-row gap-4 justify-center pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a 
              href="#subsidiaries" 
              className="px-8 py-3 rounded-full bg-primary/90 hover:bg-primary text-white font-medium transition-all duration-300 text-lg relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Our Subsidiaries</span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: { duration: 0.4 }
                }}
              />
            </motion.a>
            
            <motion.a 
              href="#domains" 
              className="px-8 py-3 rounded-full glass-button text-white font-medium text-lg relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Explore Domains</span>
              <motion.span 
                className="absolute inset-0 bg-white/10 rounded-full"
                initial={{ scale: 0, x: "-100%" }}
                whileHover={{ 
                  scale: 1, 
                  x: 0,
                  transition: { duration: 0.3 } 
                }}
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <a href="#about" className="text-white/50 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
