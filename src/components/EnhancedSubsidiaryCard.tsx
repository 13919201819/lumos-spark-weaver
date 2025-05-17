
import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { cn } from '@/lib/utils';

interface SubsidiaryCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const defaultTiltOptions = {
  max: 25,
  scale: 1.05,
  speed: 1000,
  glare: true,
  "max-glare": 0.25
};

const EnhancedSubsidiaryCard = ({ name, description, icon, color }: SubsidiaryCardProps) => {
  return (
    <Tilt options={defaultTiltOptions} className="group relative w-full">
      <motion.div 
        whileHover={{ y: -10 }}
        className={cn(
          "glass-card rounded-2xl p-6 md:p-8 h-full transition-all duration-500",
          "hover:bg-white/10 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]",
          "border border-white/10 hover:border-white/20"
        )}
      >
        <div className="relative">
          {/* Animated background glow */}
          <div className={`absolute -inset-2 rounded-full blur-xl opacity-30 group-hover:opacity-70 transition-opacity duration-500 ${color}`}></div>
          
          {/* Icon container with 3D hover effect */}
          <motion.div 
            whileHover={{ rotateY: 15, rotateX: -15 }}
            className={cn(
              "relative w-16 h-16 flex items-center justify-center rounded-2xl mb-6", 
              color,
              "transition-transform duration-300 z-10"
            )}
          >
            {icon}
            
            {/* Decorative elements */}
            <div className="absolute w-4 h-4 rounded-full bg-white/20 top-1 right-1"></div>
            <div className="absolute w-2 h-2 rounded-full bg-white/30 bottom-1 left-1"></div>
          </motion.div>
        </div>
        
        <h3 className="text-2xl font-bold mb-4 relative z-10">{name}</h3>
        
        <p className="text-white/70 mb-6 relative z-10">{description}</p>
        
        <motion.a 
          href="#" 
          className="inline-flex items-center text-white font-medium group group-hover:underline relative z-10"
          whileHover={{ x: 5 }}
        >
          Learn more
          <svg 
            className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </motion.a>
      </motion.div>
    </Tilt>
  );
};

export default EnhancedSubsidiaryCard;
