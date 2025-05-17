
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ContactCategory = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

const AIContactForm = () => {
  const [activeCategory, setActiveCategory] = useState<string>('client');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Contact categories
  const categories: ContactCategory[] = [
    {
      id: 'client', 
      name: 'Client Inquiry',
      icon: '🏢', 
      description: 'Get in touch about our AI solutions for your business'
    },
    {
      id: 'demo', 
      name: 'Request a Demo',
      icon: '🎮', 
      description: 'See our AI solutions in action with a personalized demonstration'
    },
    {
      id: 'intern', 
      name: 'Internship & Career',
      icon: '🎓', 
      description: 'Explore opportunities to join our innovative AI team'
    },
    {
      id: 'support', 
      name: 'Technical Support',
      icon: '🔧', 
      description: 'Need assistance with our products? Our team is ready to help'
    }
  ];
  
  // Generate AI suggestions based on user input
  useEffect(() => {
    if (subject && message) {
      if (!isTyping) {
        setIsTyping(true);
        
        const timer = setTimeout(() => {
          // Simple AI suggestion based on content (in real app would be API-driven)
          let suggestion = '';
          const loweredSubject = subject.toLowerCase();
          const loweredMessage = message.toLowerCase();
          
          if (activeCategory === 'client') {
            if (message.length < 50) {
              suggestion = "Consider providing more details about your business needs and timeline for implementing AI solutions.";
            } else if (loweredSubject.includes('price') || loweredMessage.includes('cost') || loweredMessage.includes('pricing')) {
              suggestion = "Our team will prepare a customized quote based on your specific requirements. To help us provide accurate pricing, consider mentioning your industry, company size, and specific use cases.";
            } else {
              suggestion = "Thank you for your detailed inquiry. Our team specializes in tailored AI solutions for your industry needs.";
            }
          } else if (activeCategory === 'demo') {
            suggestion = "To prepare the most relevant demonstration, consider sharing which specific CLUMOSS technologies you're interested in and your availability for a live demo session.";
          } else if (activeCategory === 'intern') {
            suggestion = "Please mention your relevant skills and experience with AI technologies, any academic background in machine learning, and your availability to start an internship.";
          } else {
            suggestion = "For faster technical assistance, please include any error messages you're encountering and the specific CLUMOSS product you're using.";
          }
          
          setAiSuggestion(suggestion);
          setIsTyping(false);
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    } else {
      setAiSuggestion('');
    }
  }, [subject, message, activeCategory, isTyping]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend
    console.log({
      category: activeCategory,
      name,
      email,
      subject,
      message
    });
    
    setSubmitted(true);
    
    // Reset form after a delay
    setTimeout(() => {
      setActiveCategory('client');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 5000);
  };
  
  return (
    <section id="contact" className="py-20 px-6 relative fade-in-section">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Get in Touch</h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Have questions about our AI solutions? Contact us through our AI-powered form for personalized assistance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-4">
              <div className="flex items-center">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mr-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </motion.div>
                <span className="text-white/80">+1 (555) 123-4567</span>
              </div>
              
              <div className="flex items-center">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mr-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </motion.div>
                <span className="text-white/80">contact@clumoss.ai</span>
              </div>
              
              <div className="flex items-center">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mr-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </motion.div>
                <span className="text-white/80">123 AI Avenue, Tech City, TC 12345</span>
              </div>
            </div>
            
            {/* 3D Rotating Element */}
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mt-12 relative hidden md:block"
            >
              <div className="w-64 h-64 mx-auto">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/30 rounded-full filter blur-xl animate-pulse-glow"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/10 rounded-full border border-accent/30 flex items-center justify-center">
                    <div className="text-4xl">AI</div>
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-4 h-4 bg-accent rounded-full"></div>
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-4 h-4 bg-accent rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="glass-card rounded-2xl p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-green-500/20 border border-green-500/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-white/80">
                  Thank you for reaching out. Our team will get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Categories */}
                <div className="mb-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((category) => (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "rounded-xl p-4 cursor-pointer text-center transition-all",
                          activeCategory === category.id 
                            ? "bg-primary/20 border-2 border-primary/50" 
                            : "bg-white/5 border border-white/10 hover:bg-white/10"
                        )}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <h3 className="text-sm font-medium">{category.name}</h3>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-white/70 text-sm mt-4">
                    {categories.find(c => c.id === activeCategory)?.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white/80 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white/80 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-white/80 mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white/80 mb-2">Message</label>
                  <textarea 
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="Tell us what you're looking for..."
                    required
                  ></textarea>
                </div>
                
                {/* AI Suggestion */}
                {isTyping ? (
                  <div className="bg-secondary/30 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-primary/50 rounded-full mr-3 animate-pulse"></div>
                      <span className="text-white/80">AI is analyzing your message...</span>
                    </div>
                  </div>
                ) : aiSuggestion ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-secondary/30 border border-white/10 rounded-lg p-4"
                  >
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary/30 rounded-full mr-3 flex items-center justify-center text-xs">
                        AI
                      </div>
                      <div>
                        <p className="text-sm text-white/90">{aiSuggestion}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
                
                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIContactForm;
