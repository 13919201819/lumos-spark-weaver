
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, MessageCircle, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const CylindricalNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3 px-6 md:px-12",
        isScrolled ? 
          "bg-background/80 backdrop-blur-lg border-b border-white/10" : 
          "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className={cn(
          "flex justify-between items-center rounded-full transition-all duration-300",
          isScrolled ? 
            "bg-secondary/50 backdrop-blur-md border border-white/10 px-6 py-2" : 
            "bg-transparent"
        )}>
          <div className="flex items-center">
            <motion.a 
              href="#" 
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              CLUMOSS
            </motion.a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['About', 'Subsidiaries', 'Domains', 'Contact'].map((item) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-white/80 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, color: '#ffffff' }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowChatModal(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-all"
            >
              <MessageCircle size={18} />
            </motion.button>
            
            <motion.a
              href="#schedule"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-all"
            >
              <Calendar size={18} />
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cyber-button px-6 py-2"
            >
              Contact Us
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-2 rounded-2xl bg-background/95 backdrop-blur-lg border border-white/10 overflow-hidden"
          >
            <div className="flex flex-col space-y-4 p-6">
              {['About', 'Subsidiaries', 'Domains', 'Contact'].map((item) => (
                <motion.a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ x: 10, color: '#ffffff' }}
                >
                  {item}
                </motion.a>
              ))}
              
              <div className="flex space-x-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowChatModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/30"
                >
                  <MessageCircle size={18} />
                  <span>Chat</span>
                </motion.button>
                
                <motion.a
                  href="#schedule"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/30"
                >
                  <Calendar size={18} />
                  <span>Schedule</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Chat Modal - Will be implemented in the ChatAssistant component */}
    </motion.nav>
  );
};

export default CylindricalNavbar;
