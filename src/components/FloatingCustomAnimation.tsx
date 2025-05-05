"use client"

import React, { FC, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { CustomTheme, CustomAnimation, customThemes, customAnimations } from './FloatingCustomComponents';

// Types pour les animations personnalisées
type AnimationPreset = 'bounce' | 'fade' | 'slide' | 'rotate' | 'scale' | 'custom';
type AnimationDirection = 'up' | 'down' | 'left' | 'right';

type FloatingCustomAnimationProps = {
  children: ReactNode;
  className?: string;
  theme?: CustomTheme;
  preset?: AnimationPreset;
  direction?: AnimationDirection;
  duration?: number;
  delay?: number;
  repeat?: number | 'infinity';
  custom?: CustomAnimation;
};

// Presets d'animations prédéfinis
const animationPresets: Record<AnimationPreset, (direction?: AnimationDirection) => Variants> = {
  bounce: (direction = 'up') => ({
    initial: { y: direction === 'up' ? 20 : -20 },
    animate: { y: 0 },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  }),

  fade: () => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }),

  slide: (direction = 'left') => {
    const offset = direction === 'left' || direction === 'right' ? 100 : 50;
    const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
    const initialValue = direction === 'left' || direction === 'up' ? offset : -offset;

    return {
      initial: { [axis]: initialValue, opacity: 0 },
      animate: { [axis]: 0, opacity: 1 },
      exit: { [axis]: initialValue, opacity: 0 },
    };
  },

  rotate: () => ({
    initial: { rotate: -180, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 180, opacity: 0 },
  }),

  scale: () => ({
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  }),

  custom: () => ({
    initial: {},
    animate: {},
  }),
};

// Composant FloatingCustomAnimation
export const FloatingCustomAnimation: FC<FloatingCustomAnimationProps> = ({
  children,
  className = '',
  theme = customThemes.modern,
  preset = 'fade',
  direction = 'up',
  duration = 0.5,
  delay = 0,
  repeat = 0,
  custom,
}) => {
  // Sélection de l'animation
  const selectedAnimation = preset === 'custom' && custom
    ? custom
    : animationPresets[preset](direction);

  // Configuration de la transition
  const transitionConfig = {
    duration,
    delay,
    repeat: repeat === 'infinity' ? Infinity : repeat,
    ease: 'easeOut',
  };

  return (
    <motion.div
      className={`${className}`}
      initial={selectedAnimation.initial}
      animate={selectedAnimation.animate}
      exit={selectedAnimation.exit}
      transition={transitionConfig}
    >
      {children}
    </motion.div>
  );
};

// Composant FloatingCustomSequence pour les animations en séquence
type SequenceItem = {
  element: ReactNode;
  animation: CustomAnimation;
  delay?: number;
};

type FloatingCustomSequenceProps = {
  items: SequenceItem[];
  className?: string;
  theme?: CustomTheme;
  staggerDelay?: number;
};

export const FloatingCustomSequence: FC<FloatingCustomSequenceProps> = ({
  items,
  className = '',
  theme = customThemes.modern,
  staggerDelay = 0.1,
}) => {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={item.animation.initial}
          animate={item.animation.animate}
          transition={{
            ...item.animation.transition,
            delay: (item.delay || 0) + index * staggerDelay,
          }}
        >
          {item.element}
        </motion.div>
      ))}
    </div>
  );
};