import React from 'react';

const AshokaEmblem: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className} ashoka-emblem`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ashoka Chakra - Simplified version */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        fill="none" 
        stroke="#003d7a" 
        strokeWidth="3"
      />
      <circle 
        cx="50" 
        cy="50" 
        r="35" 
        fill="none" 
        stroke="#003d7a" 
        strokeWidth="2"
      />
      
      {/* 24 spokes of Ashoka Chakra */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360) / 24;
        const radians = (angle * Math.PI) / 180;
        const x1 = 50 + 15 * Math.cos(radians);
        const y1 = 50 + 15 * Math.sin(radians);
        const x2 = 50 + 35 * Math.cos(radians);
        const y2 = 50 + 35 * Math.sin(radians);
        
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#003d7a"
            strokeWidth="1.5"
          />
        );
      })}
      
      {/* Center circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="8" 
        fill="#003d7a"
      />
    </svg>
  );
};

export default AshokaEmblem;