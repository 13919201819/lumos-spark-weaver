
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm CLUMOSS AI Assistant. How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      
      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      
      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
    };
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const newUserMessage = { id: Date.now(), text: input, isUser: true };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');

    // Process the input (in a real app, this would connect to an AI backend)
    setTimeout(() => {
      let response = "I'm processing your request...";
      
      const lowerInput = input.toLowerCase();
      
      // Simple navigation intent detection
      if (lowerInput.includes('about') || lowerInput.includes('who are you')) {
        response = "CLUMOSS is at the forefront of artificial intelligence innovation. You can learn more in our About section.";
      } else if (lowerInput.includes('subsidiaries') || lowerInput.includes('companies')) {
        response = "We have several specialized AI subsidiaries including MistrAI, Cura AI, Lawsuit AI, and more. Check our Subsidiaries section for details.";
        window.location.href = "#subsidiaries";
      } else if (lowerInput.includes('contact') || lowerInput.includes('talk to')) {
        response = "You can reach us through our Contact form. I'm taking you there now.";
        window.location.href = "#contact";
      } else if (lowerInput.includes('schedule') || lowerInput.includes('appointment') || lowerInput.includes('meeting') || lowerInput.includes('demo')) {
        response = "You can schedule a demo or consultation through our scheduling section. I'm directing you there now.";
        window.location.href = "#schedule";
      } else if (lowerInput.includes('domain') || lowerInput.includes('industries')) {
        response = "We serve various domains including AI Research, Medical, Legal, Defense, and more. I'll show you the details.";
        window.location.href = "#domains";
      } else {
        response = "Thank you for your message. How else can I assist you with CLUMOSS services? I can help you navigate to different sections or answer questions about our AI solutions.";
      }

      // Add AI response
      const aiResponse = { id: Date.now() + 1, text: response, isUser: false };
      setMessages(prev => [...prev, aiResponse]);

      // Text-to-speech for AI response
      if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(response);
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
      }
    }, 1000);
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <motion.button
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <MessageCircle size={24} />
        </motion.button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-background/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Chat header */}
            <div className="bg-primary/30 p-4 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <MessageCircle size={16} />
                </div>
                <span className="font-bold">CLUMOSS AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.isUser
                        ? 'bg-primary/30 border border-primary/50 text-white'
                        : 'bg-secondary/50 border border-white/10 text-white/90'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-secondary/30">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2 rounded-full ${isListening ? 'bg-red-600' : 'bg-primary/30'}`}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
                
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Ask anything..."
                />
                
                <button
                  type="submit"
                  className="p-2 rounded-full bg-primary/30 hover:bg-primary/50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
