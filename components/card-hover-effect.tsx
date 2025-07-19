"use client";

import React, { useRef, useState, useEffect } from 'react';

interface CardHoverEffectProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // Tilt intensity
}

export const CardHoverEffect: React.FC<CardHoverEffectProps> = ({
  children,
  className = '',
  intensity = 15, // Default tilt intensity
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate position of mouse relative to the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const xRotation = ((y - rect.height / 2) / rect.height) * intensity * -1;
    const yRotation = ((x - rect.width / 2) / rect.width) * intensity;
    
    setCoords({ x: xRotation, y: yRotation });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Reset rotation
    setCoords({ x: 0, y: 0 });
  };

  const transformStyle = isHovering 
    ? `perspective(1000px) rotateX(${coords.x}deg) rotateY(${coords.y}deg) scale3d(1.02, 1.02, 1.02)` 
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`transform transition-all duration-300 ${className}`}
      style={{ 
        transform: transformStyle,
        transition: 'transform 0.2s ease'
      }}
    >
      {children}
    </div>
  );
};
