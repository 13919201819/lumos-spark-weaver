
import React from 'react';
import { cn } from '@/lib/utils';

interface SubsidiaryCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const SubsidiaryCard = ({ name, description, icon, color }: SubsidiaryCardProps) => {
  return (
    <div className="group relative w-full">
      <div 
        className={cn(
          "glass-card rounded-2xl p-6 md:p-8 h-full transition-all duration-500",
          "hover:bg-white/10 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]",
          "border border-white/10 hover:border-white/20"
        )}
      >
        <div className={cn("w-16 h-16 flex items-center justify-center rounded-2xl mb-6", color)}>
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold mb-4">{name}</h3>
        
        <p className="text-white/70 mb-6">{description}</p>
        
        <a 
          href="#" 
          className="inline-flex items-center text-white font-medium group-hover:underline"
        >
          Learn more
          <svg 
            className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SubsidiaryCard;
