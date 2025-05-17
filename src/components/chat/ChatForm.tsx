
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatFormProps {
  onSubmit: (text: string) => void;
  isListening: boolean;
  toggleListening: () => void;
}

const ChatForm: React.FC<ChatFormProps> = ({ onSubmit, isListening, toggleListening }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;
    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-secondary/30">
      <div className="flex items-center space-x-2">
        <motion.button
          type="button"
          onClick={toggleListening}
          className={cn(
            "p-2 rounded-full",
            isListening ? 'bg-red-600' : 'bg-primary/30'
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isListening ? {
            boxShadow: ['0 0 0 rgba(220, 38, 38, 0)', '0 0 10px rgba(220, 38, 38, 0.7)', '0 0 0 rgba(220, 38, 38, 0)'],
          } : {}}
          transition={{ 
            duration: 1.5,
            repeat: isListening ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </motion.button>
        
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Ask anything..."
        />
        
        <motion.button
          type="submit"
          className="p-2 rounded-full bg-primary/30 hover:bg-primary/50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={input.trim() === ''}
        >
          <Send size={18} />
        </motion.button>
      </div>
    </form>
  );
};

export default ChatForm;
