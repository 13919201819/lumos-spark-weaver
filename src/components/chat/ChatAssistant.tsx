
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import ChatButton from './ChatButton';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatForm from './ChatForm';
import { Message } from './types';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm CLUMOSS AI Assistant. How can I help you today?", isUser: false },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
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
        
        // Update the input value
        const customEvent = new Event('input', { bubbles: true });
        const inputElement = document.querySelector('form input[type="text"]');
        if (inputElement) {
          (inputElement as HTMLInputElement).value = transcript;
          inputElement.dispatchEvent(customEvent);
        }
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

  const handleSubmit = (inputText: string) => {
    // Add user message
    const newUserMessage: Message = { id: Date.now(), text: inputText, isUser: true };
    setMessages(prev => [...prev, newUserMessage]);

    // Process the input (in a real app, this would connect to an AI backend)
    setTimeout(() => {
      let response = "I'm processing your request...";
      
      const lowerInput = inputText.toLowerCase();
      
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

  return (
    <>
      {/* Chat button */}
      <AnimatePresence>
        {!isOpen && <ChatButton onClick={() => setIsOpen(true)} />}
      </AnimatePresence>

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
            <ChatHeader 
              speechEnabled={speechEnabled} 
              onToggleSpeech={toggleSpeech} 
              onClose={() => setIsOpen(false)} 
            />

            {/* Messages container */}
            <MessageList 
              messages={messages} 
              isSpeaking={isSpeaking} 
              speechEnabled={speechEnabled} 
              onSpeakMessage={speakText} 
            />

            {/* Input area */}
            <ChatForm 
              onSubmit={handleSubmit} 
              isListening={isListening} 
              toggleListening={toggleListening} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
