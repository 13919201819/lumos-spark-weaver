
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatButtonProps {
  onClick: () => void;
}

const chatButtonVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: 'spring', 
      stiffness: 260, 
      damping: 20 
    }
  },
  exit: { 
    scale: 0, 
    opacity: 0,
    transition: { duration: 0.2 } 
  },
  hover: { 
    scale: 1.1,
    rotate: [0, -5, 5, 0],
    transition: {
      scale: { type: 'spring', stiffness: 400 },
      rotate: { duration: 0.5, ease: 'easeInOut' }
    }
  },
  tap: { scale: 0.9 }
};

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  const isMobile = useIsMobile();

  return (
    <motion.button
      className={`fixed ${isMobile ? 'bottom-4 right-4 w-12 h-12' : 'bottom-6 right-6 w-14 h-14'} rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center shadow-lg z-50 overflow-hidden`}
      variants={chatButtonVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
    >
      <motion.span 
        className="absolute inset-0 bg-white/20 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0, 0.3, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        className="relative z-10"
        animate={{ 
          rotateY: [0, 360],
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity, 
          ease: "linear"
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <MessageCircle size={isMobile ? 20 : 24} />
      </motion.div>
    </motion.button>
  );
};

export default ChatButton;
