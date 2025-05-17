
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = true;
      
      recognition.current.onstart = () => {
        setIsListening(true);
      };
      
      recognition.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        setInput(transcript);
      };
      
      recognition.current.onend = () => {
        setIsListening(false);
      };
      
      recognition.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          toast.error("Microphone access denied. Please enable it in your browser settings.");
        } else {
          toast.error("Speech recognition failed. Try again later.");
        }
      };
    } else {
      toast.error("Speech recognition is not supported in your browser.");
    }
    
    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
      
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  // Configure Text-to-Speech
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthesisRef.current = new SpeechSynthesisUtterance();
      
      // Get the best voice for English
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => voice.lang === 'en-US' && voice.name.includes('Google') && voice.name.includes('Female'));
      
      if (synthesisRef.current) {
        synthesisRef.current.voice = preferredVoice || null;
        synthesisRef.current.rate = 1;
        synthesisRef.current.pitch = 1;
        synthesisRef.current.volume = 0.8;
        
        synthesisRef.current.onstart = () => setIsSpeaking(true);
        synthesisRef.current.onend = () => setIsSpeaking(false);
        synthesisRef.current.onerror = () => setIsSpeaking(false);
      }
    }
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const toggleListening = async () => {
    if (!recognition.current) {
      toast.error("Speech recognition is not supported in your browser.");
      return;
    }
    
    if (isListening) {
      recognition.current.stop();
    } else {
      try {
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Stop any ongoing speech synthesis
        if (window.speechSynthesis && speechEnabled) {
          window.speechSynthesis.cancel();
        }
        
        recognition.current.start();
        
        toast.info("Listening...", {
          position: "bottom-center",
          duration: 2000,
        });
      } catch (err) {
        console.error('Microphone access error:', err);
        toast.error("Microphone access denied. Please enable it in your browser settings.");
      }
    }
  };
  
  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
    
    if (isSpeaking && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    
    toast.success(speechEnabled ? "Voice responses turned off" : "Voice responses turned on");
  };

  const speakText = (text: string) => {
    if (!speechEnabled || !window.speechSynthesis || !synthesisRef.current) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Set the text and speak
    synthesisRef.current.text = text;
    window.speechSynthesis.speak(synthesisRef.current);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const newUserMessage: Message = { id: Date.now(), text: input, isUser: true };
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
      const aiResponse: Message = { id: Date.now() + 1, text: response, isUser: false };
      setMessages(prev => [...prev, aiResponse]);

      // Text-to-speech for AI response
      speakText(response);
    }, 1000);
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
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

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <motion.button
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg z-50"
          variants={chatButtonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setIsOpen(true)}
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
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { 
                type: 'spring', 
                stiffness: 300, 
                damping: 25 
              } 
            }}
            exit={{ 
              scale: 0.8, 
              opacity: 0,
              transition: { duration: 0.2 } 
            }}
          >
            {/* Chat header */}
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
                  onClick={toggleSpeech}
                  className={cn(
                    "p-2 rounded-full hover:bg-white/10",
                    speechEnabled ? "text-white/80" : "text-white/40"
                  )}
                  title={speechEnabled ? "Turn off voice responses" : "Turn on voice responses"}
                >
                  {speechEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages container */}
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
                    onClick={() => !message.isUser && speakText(message.text)}
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

            {/* Input area */}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
