
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Message } from './types';

interface MessageListProps {
  messages: Message[];
  isSpeaking: boolean;
  speechEnabled: boolean;
  onSpeakMessage: (text: string) => void;
}

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  isSpeaking,
  speechEnabled, 
  onSpeakMessage 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-transparent to-background/30">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          variants={messageVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={cn(
              "max-w-[80%] rounded-2xl p-3",
              message.isUser
                ? "bg-primary/30 border border-primary/50 text-white"
                : "bg-secondary/50 border border-white/10 text-white/90"
            )}
            whileHover={{ scale: 1.02 }}
            onClick={() => !message.isUser && onSpeakMessage(message.text)}
            title={!message.isUser && speechEnabled ? "Click to hear this response again" : ""}
            style={{ 
              cursor: !message.isUser && speechEnabled ? 'pointer' : 'default'
            }}
          >
            {message.text}
            {!message.isUser && isSpeaking && (
              <motion.span 
                className="ml-2 inline-block bg-primary/50 w-2 h-2 rounded-full"
                animate={{ 
                  scaleY: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
        </motion.div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
