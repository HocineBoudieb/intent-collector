"use client"

import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { pastelText } from './FloatingComponents';

// Composant pour afficher des équations mathématiques avec animation
const FloatingEquation: FC<{
  equation: string;
  color?: keyof typeof pastelText;
  size?: 'sm' | 'base' | 'lg' | 'xl';
  className?: string;
}> = ({ equation, color = 'blue', size = 'lg', className = '' }) => {
  // Fonction pour formater l'équation avec MathJax si disponible
  const formatEquation = (eq: string) => {
    // Remplacer les symboles mathématiques courants par leur équivalent HTML
    return eq
      .replace(/\*/g, '×') // Multiplication
      .replace(/\//g, '÷') // Division
      .replace(/\^(\d+)/g, '<sup>$1</sup>') // Exposants
      .replace(/sqrt\((.*?)\)/g, '√($1)') // Racine carrée
      .replace(/pi/g, 'π') // Pi
      .replace(/\btheta\b/g, 'θ') // Theta
      .replace(/\bdelta\b/g, 'Δ') // Delta
      .replace(/\bsum\b/g, '∑') // Somme
      .replace(/\binfty\b/g, '∞'); // Infini
  };

  // Taille de la police en fonction du paramètre size
  const textSize = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }[size];

  return (
    <motion.div
      className={`${className}`}
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
    >
      <div 
        className={`font-mono ${textSize} ${pastelText[color]} font-bold text-center p-3 bg-white bg-opacity-70 rounded-lg shadow-sm`}
        dangerouslySetInnerHTML={{ __html: formatEquation(equation) }}
      />
    </motion.div>
  );
};

export default FloatingEquation;