
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
    boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' 
  },
  tap: { scale: 0.9 }
};

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg z-50"
      variants={chatButtonVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
    >
      <MessageCircle size={24} />
    </motion.button>
  );
};

export default ChatButton;
