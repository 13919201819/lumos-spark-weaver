
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { cn } from '@/lib/utils';

type TimeSlot = {
  id: number;
  time: string;
  available: boolean;
};

type DemoType = {
  id: number;
  name: string;
  description: string;
  duration: string;
};

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [selectedDemoType, setSelectedDemoType] = useState<DemoType | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  // Mock time slots - in a real app, these would come from backend
  const timeSlots: TimeSlot[] = [
    { id: 1, time: '09:00 AM', available: true },
    { id: 2, time: '10:00 AM', available: true },
    { id: 3, time: '11:00 AM', available: false },
    { id: 4, time: '12:00 PM', available: true },
    { id: 5, time: '01:00 PM', available: true },
    { id: 6, time: '02:00 PM', available: false },
    { id: 7, time: '03:00 PM', available: true },
    { id: 8, time: '04:00 PM', available: true },
  ];
  
  // Demo types
  const demoTypes: DemoType[] = [
    { id: 1, name: 'MistrAI Demo', description: 'Experience our large language model capabilities', duration: '30 min' },
    { id: 2, name: 'Cura AI Demo', description: 'Medical AI diagnostics and healthcare solutions', duration: '45 min' },
    { id: 3, name: 'Lawsuit AI Demo', description: 'Legal AI for document analysis and research', duration: '45 min' },
    { id: 4, name: 'Defense Systems Demo', description: 'Advanced security and defense AI solutions', duration: '60 min' },
    { id: 5, name: 'Vision AI Demo', description: 'Computer vision solutions for various industries', duration: '30 min' },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend
    console.log({
      name,
      email,
      company,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      demoType: selectedDemoType
    });
    
    setSubmitted(true);
    
    // Reset form after a delay
    setTimeout(() => {
      setSubmitted(false);
      setSelectedDate(null);
      setSelectedTimeSlot(null);
      setSelectedDemoType(null);
      setName('');
      setEmail('');
      setCompany('');
    }, 5000);
  };
  
  const isFormValid = name && email && selectedDate && selectedTimeSlot && selectedDemoType;
  
  return (
    <section id="schedule" className="py-20 px-6 relative fade-in-section">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Schedule a Demo</h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Experience the power of CLUMOSS AI solutions with a personalized demonstration
          </p>
        </motion.div>
        
        <div className="glass-card rounded-2xl p-8 max-w-4xl mx-auto">
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
              <h3 className="text-2xl font-bold mb-2">Your demo is scheduled!</h3>
              <p className="text-white/80 mb-4">
                We've sent a confirmation to your email with all the details.
              </p>
              <p className="text-primary">
                {selectedDemoType?.name} | {selectedDate?.toLocaleDateString()} | {selectedTimeSlot?.time}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Demo Types Section */}
                <div>
                  <h3 className="text-xl font-medium mb-4 text-white/90">Select Demo Type</h3>
                  <div className="space-y-4">
                    {demoTypes.map((demo) => (
                      <motion.div
                        key={demo.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "p-4 rounded-xl cursor-pointer transition-all",
                          selectedDemoType?.id === demo.id 
                            ? "bg-primary/20 border-2 border-primary/50"
                            : "bg-white/5 border border-white/10 hover:bg-white/10"
                        )}
                        onClick={() => setSelectedDemoType(demo)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-lg">{demo.name}</h4>
                            <p className="text-white/70 text-sm mt-1">{demo.description}</p>
                          </div>
                          <div className="text-sm text-white/60 px-2 py-1 rounded-full border border-white/20">
                            {demo.duration}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Calendar Section */}
                <div>
                  <h3 className="text-xl font-medium mb-4 text-white/90">Select Date & Time</h3>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      minDate={new Date()}
                      inline
                      calendarClassName="bg-background/80 border-white/10 rounded-lg"
                    />
                  </div>
                  
                  {selectedDate && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Available Time Slots</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {timeSlots.map((slot) => (
                          <motion.button
                            key={slot.id}
                            type="button"
                            whileHover={{ scale: slot.available ? 1.05 : 1 }}
                            whileTap={{ scale: slot.available ? 0.95 : 1 }}
                            disabled={!slot.available}
                            className={cn(
                              "py-2 px-4 rounded-lg text-center text-sm",
                              slot.available
                                ? selectedTimeSlot?.id === slot.id
                                  ? "bg-primary/30 border border-primary/50"
                                  : "bg-white/5 border border-white/10 hover:bg-white/10"
                                : "bg-white/5 border border-white/10 opacity-50 cursor-not-allowed"
                            )}
                            onClick={() => slot.available && setSelectedTimeSlot(slot)}
                          >
                            {slot.time}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4 text-white/90">Your Information</h3>
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
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="company" className="block text-white/80 mb-2">Company (Optional)</label>
                    <input 
                      type="text" 
                      id="company" 
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="Your company name"
                    />
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <motion.button
                  type="submit"
                  disabled={!isFormValid}
                  whileHover={{ scale: isFormValid ? 1.05 : 1 }}
                  whileTap={{ scale: isFormValid ? 0.95 : 1 }}
                  className={cn(
                    "w-full sm:w-auto bg-primary py-3 px-8 rounded-lg font-medium transition-colors duration-300",
                    isFormValid ? "hover:bg-primary/90" : "opacity-50 cursor-not-allowed"
                  )}
                >
                  Schedule Demo
                </motion.button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Scheduler;
