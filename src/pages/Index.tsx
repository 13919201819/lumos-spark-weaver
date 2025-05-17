
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import StarfieldBackground from '../components/StarfieldBackground';
import CylindricalNavbar from '../components/CylindricalNavbar';
import Hero from '../components/Hero';
import EnhancedSubsidiaryCard from '../components/EnhancedSubsidiaryCard';
import Scheduler from '../components/Scheduler';
import AIContactForm from '../components/AIContactForm';
import ChatAssistant from '../components/ChatAssistant';
import Footer from '../components/Footer';

const Index = () => {
  // Fade-in animation for sections
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(section => {
      observer.observe(section);
      section.classList.add('opacity-0');
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-poppins">
      <StarfieldBackground />
      <CylindricalNavbar />
      <Hero />
      <ChatAssistant />

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative fade-in-section">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">About CLUMOSS</h2>
              <p className="text-white/80 mb-6 text-lg">
                CLUMOSS is at the forefront of artificial intelligence innovation, developing cutting-edge 
                solutions that transform how industries operate. Our mission is to harness the power of advanced 
                AI to solve complex challenges across multiple sectors.
              </p>
              <p className="text-white/80 text-lg">
                With a team of world-class researchers and engineers, we're building the next generation of 
                intelligent systems that augment human capabilities and drive progress in science, healthcare, 
                legal systems, and defense.
              </p>
            </motion.div>
            <motion.div 
              className="glass-card rounded-2xl p-1 animate-pulse-glow"
              initial={{ opacity: 0, rotateY: 45 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 rounded-2xl p-8 h-full">
                <div className="grid grid-cols-2 gap-6">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <h3 className="text-4xl font-bold text-white mb-2">5+</h3>
                    <p className="text-white/70">AI Subsidiaries</p>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <h3 className="text-4xl font-bold text-white mb-2">7+</h3>
                    <p className="text-white/70">Domains</p>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <h3 className="text-4xl font-bold text-white mb-2">20+</h3>
                    <p className="text-white/70">AI Models</p>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <h3 className="text-4xl font-bold text-white mb-2">100%</h3>
                    <p className="text-white/70">Innovation</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subsidiaries Section */}
      <section id="subsidiaries" className="py-20 px-6 relative fade-in-section">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Our Subsidiaries</h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Specialized divisions focused on delivering AI excellence in specific domains
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EnhancedSubsidiaryCard
              name="MistrAI"
              description="Developing state-of-the-art large language models for complex natural language understanding and generation tasks."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                  <path d="M3 15h14a2 2 0 1 1 0 4H7"></path>
                  <path d="M13 8h5"></path>
                  <path d="M13 16h5"></path>
                </svg>
              }
              color="bg-purple-700/30"
            />

            <EnhancedSubsidiaryCard
              name="Cura AI"
              description="AI-powered medical diagnostics and healthcare solutions for improved patient outcomes and more efficient clinical processes."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                  <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                  <circle cx="20" cy="10" r="2"></circle>
                </svg>
              }
              color="bg-blue-700/30"
            />

            <EnhancedSubsidiaryCard
              name="Lawsuit AI"
              description="Legal AI solutions that analyze case law, automate document review, and provide insights for legal professionals."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
                </svg>
              }
              color="bg-teal-700/30"
            />

            <EnhancedSubsidiaryCard
              name="Defense Systems"
              description="Advanced AI systems for defense applications, focusing on cybersecurity, threat detection, and strategic analysis."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  <path d="m12 8 3 3-3 3-3-3 3-3"></path>
                </svg>
              }
              color="bg-red-700/30"
            />

            <EnhancedSubsidiaryCard
              name="Vision AI"
              description="Computer vision solutions for automated image and video analysis across industrial inspection, autonomous vehicles, and more."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="2"></circle>
                  <path d="M12 19c-4 0-7.5-2.5-7.5-7.5S8 4 12 4c4 0 7.5 2.5 7.5 7.5"></path>
                  <path d="M12 19c-4 0-7.5-2.5-7.5-7.5"></path>
                  <path d="M12 19c4 0 7.5-2.5 7.5-7.5"></path>
                </svg>
              }
              color="bg-amber-700/30"
            />

            <EnhancedSubsidiaryCard
              name="Quantum Solutions"
              description="Exploring quantum computing approaches to AI, developing algorithms that leverage quantum advantages for next-gen problem solving."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M3.2 14.8a9 9 0 0 1 0-5.6"></path>
                  <path d="M20.8 14.8a9 9 0 0 0 0-5.6"></path>
                  <path d="M8.9 7.1C9.9 5.1 11 5 12 5s2.1.1 3.1 2.1"></path>
                  <path d="M15.1 16.9c-1 2-2.1 2.1-3.1 2.1s-2.1-.1-3.1-2.1"></path>
                </svg>
              }
              color="bg-violet-700/30"
            />
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section id="domains" className="py-20 px-6 relative fade-in-section">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Domains We Serve</h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Our AI solutions extend across diverse industries, each with specialized applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "AI Research", icon: "🧠" },
              { name: "Medical", icon: "🏥" },
              { name: "Legal", icon: "⚖️" },
              { name: "Defense", icon: "🛡️" },
              { name: "Finance", icon: "💰" },
              { name: "Education", icon: "🎓" },
              { name: "Automotive", icon: "🚗" },
              { name: "Energy", icon: "⚡" },
            ].map((domain, index) => (
              <motion.div 
                key={index} 
                className="hover-3d glass-card rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="text-4xl mb-4"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  {domain.icon}
                </motion.div>
                <h3 className="text-xl font-bold">{domain.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scheduler Section */}
      <Scheduler />

      {/* Contact Section */}
      <AIContactForm />

      <Footer />
    </div>
  );
};

export default Index;
