
import React from 'react';
import { MessageCircle, Volume2, VolumeX, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChatHeaderProps {
  speechEnabled: boolean;
  onToggleSpeech: () => void;
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  speechEnabled, 
  onToggleSpeech, 
  onClose 
}) => {
  return (
    <div className="bg-primary/30 p-4 flex justify-between items-center border-b border-white/10">
      <div className="flex items-center space-x-3">
        <motion.div
          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
          animate={{ 
            boxShadow: ['0 0 0 rgba(139, 92, 246, 0.3)', '0 0 10px rgba(139, 92, 246, 0.7)', '0 0 0 rgba(139, 92, 246, 0.3)'] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
          }}
        >
          <MessageCircle size={16} />
        </motion.div>
        <span className="font-bold">CLUMOSS AI Assistant</span>
      </div>
      <div className="flex items-center space-x-2">
        <button 
          onClick={onToggleSpeech}
          className={cn(
            "p-2 rounded-full hover:bg-white/10",
            speechEnabled ? "text-white/80" : "text-white/40"
          )}
          title={speechEnabled ? "Turn off voice responses" : "Turn on voice responses"}
        >
          {speechEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
