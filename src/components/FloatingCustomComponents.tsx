"use client"

import React, { FC, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

// Types pour les thèmes et styles personnalisés
export type CustomTheme = {
  backgroundColor: string;
  textColor: string;
  borderColor?: string;
  shadowColor?: string;
  gradientColors?: string[];
};

export type CustomAnimation = {
  initial?: any;
  animate?: any;
  transition?: any;
  hover?: any;
  tap?: any;
};

// Props de base pour les composants personnalisables
type CustomFloatingProps = {
  children: ReactNode;
  className?: string;
  theme?: CustomTheme;
  animation?: CustomAnimation;
};

// Thèmes prédéfinis
export const customThemes: Record<string, CustomTheme> = {
  modern: {
    backgroundColor: 'bg-gradient-to-br from-slate-50 to-slate-100',
    textColor: 'text-slate-800',
    borderColor: 'border-slate-200',
    shadowColor: 'shadow-slate-200',
  },
  neon: {
    backgroundColor: 'bg-black',
    textColor: 'text-white',
    borderColor: 'border-purple-500',
    shadowColor: 'shadow-purple-500',
    gradientColors: ['from-purple-500', 'via-pink-500', 'to-cyan-500'],
  },
  nature: {
    backgroundColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-200',
    shadowColor: 'shadow-emerald-200',
  },
  sunset: {
    backgroundColor: 'bg-gradient-to-br from-orange-50 to-rose-100',
    textColor: 'text-rose-800',
    borderColor: 'border-rose-200',
    shadowColor: 'shadow-rose-200',
  },
};

// Animations prédéfinies
export const customAnimations: Record<string, CustomAnimation> = {
  float: {
    animate: { y: [-5, 5, -5] },
    transition: { duration: 4, ease: 'easeInOut', repeat: Infinity },
  },
  pulse: {
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
  },
  wave: {
    animate: { rotate: [-2, 2, -2] },
    transition: { duration: 3, ease: 'easeInOut', repeat: Infinity },
  },
  sparkle: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: 'backOut' },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  },
};

// Composant FloatingCustomCard
export const FloatingCustomCard: FC<CustomFloatingProps> = ({
  children,
  className = '',
  theme = customThemes.modern,
  animation = customAnimations.float,
}) => {
  const gradientClass = theme.gradientColors
    ? `bg-gradient-to-br ${theme.gradientColors.join(' ')}`
    : theme.backgroundColor;

  return (
    <motion.div
      className={`
        rounded-2xl p-6 border
        ${gradientClass}
        ${theme.textColor}
        ${theme.borderColor || 'border-transparent'}
        ${theme.shadowColor ? `shadow-lg ${theme.shadowColor}` : 'shadow-lg'}
        ${className}
      `}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
      whileHover={animation.hover}
      whileTap={animation.tap}
    >
      {children}
    </motion.div>
  );
};

// Composant FloatingCustomText
export const FloatingCustomText: FC<
  CustomFloatingProps & { size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' }
> = ({
  children,
  className = '',
  theme = customThemes.modern,
  animation = customAnimations.wave,
  size = 'base',
}) => (
  <motion.p
    className={`
      font-medium
      ${theme.textColor}
      text-${size}
      ${className}
    `}
    initial={animation.initial}
    animate={animation.animate}
    transition={animation.transition}
    whileHover={animation.hover}
    whileTap={animation.tap}
  >
    {children}
  </motion.p>
);

// Composant FloatingCustomContainer
export const FloatingCustomContainer: FC<
  CustomFloatingProps & {
    layout?: 'grid' | 'flex' | 'block';
    columns?: number;
    gap?: number;
  }
> = ({
  children,
  className = '',
  theme = customThemes.modern,
  animation = customAnimations.sparkle,
  layout = 'block',
  columns = 1,
  gap = 4,
}) => {
  const layoutClass =
    layout === 'grid'
      ? `grid grid-cols-1 md:grid-cols-${columns} gap-${gap}`
      : layout === 'flex'
      ? `flex flex-wrap gap-${gap}`
      : '';

  return (
    <motion.div
      className={`
        ${layoutClass}
        ${theme.backgroundColor}
        ${className}
      `}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
      whileHover={animation.hover}
      whileTap={animation.tap}
    >
      {children}
    </motion.div>
  );
};