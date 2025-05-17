
import React, { useEffect } from 'react';
import StarfieldBackground from '../components/StarfieldBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SubsidiaryCard from '../components/SubsidiaryCard';
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
    <div className="min-h-screen bg-background text-foreground">
      <StarfieldBackground />
      <Navbar />
      <Hero />

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative fade-in-section">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
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
            </div>
            <div className="glass-card rounded-2xl p-1 animate-pulse-glow">
              <div className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 rounded-2xl p-8 h-full">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-white mb-2">5+</h3>
                    <p className="text-white/70">AI Subsidiaries</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-white mb-2">7+</h3>
                    <p className="text-white/70">Domains</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-white mb-2">20+</h3>
                    <p className="text-white/70">AI Models</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-white mb-2">100%</h3>
                    <p className="text-white/70">Innovation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subsidiaries Section */}
      <section id="subsidiaries" className="py-20 px-6 relative fade-in-section">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Our Subsidiaries</h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Specialized divisions focused on delivering AI excellence in specific domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SubsidiaryCard
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

            <SubsidiaryCard
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

            <SubsidiaryCard
              name="Lawsuit AI"
              description="Legal AI solutions that analyze case law, automate document review, and provide insights for legal professionals."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
                </svg>
              }
              color="bg-teal-700/30"
            />

            <SubsidiaryCard
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

            <SubsidiaryCard
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

            <SubsidiaryCard
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Domains We Serve</h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Our AI solutions extend across diverse industries, each with specialized applications
            </p>
          </div>

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
              <div key={index} className="glass-card rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-4">{domain.icon}</div>
                <h3 className="text-xl font-bold">{domain.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative fade-in-section">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Get in Touch</h2>
              <p className="text-white/80 mb-6 text-lg">
                Interested in learning more about our AI solutions? Reach out to discuss how CLUMOSS can transform your operations.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="text-white/80">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span className="text-white/80">contact@clumoss.ai</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-white/80">123 AI Avenue, Tech City, TC 12345</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white/80 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/80 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-white/80 mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="How can we help?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white/80 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="Tell us what you're looking for..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
