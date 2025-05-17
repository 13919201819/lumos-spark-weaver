
import React from 'react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-purple-700/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-blue-700/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold gradient-text leading-tight">
            Advanced Intelligence Solutions
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            CLUMOSS pioneers cutting-edge AI technologies across multiple domains, 
            delivering innovative solutions to complex challenges.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-6">
            <a 
              href="#subsidiaries" 
              className="px-8 py-3 rounded-full bg-primary/90 hover:bg-primary text-white font-medium transition-all duration-300 text-lg"
            >
              Our Subsidiaries
            </a>
            <a 
              href="#domains" 
              className="px-8 py-3 rounded-full glass-button text-white font-medium text-lg"
            >
              Explore Domains
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white/50 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
