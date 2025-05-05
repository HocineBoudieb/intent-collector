"use client"

import React, { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { CustomTheme, CustomAnimation, customThemes, customAnimations } from './FloatingCustomComponents';

// Types spécifiques pour les boutons
type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

type FloatingCustomButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  theme?: CustomTheme;
  animation?: CustomAnimation;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
};

// Styles prédéfinis pour les variantes de boutons
const buttonVariants: Record<ButtonVariant, (theme: CustomTheme) => string> = {
  solid: (theme) => `
    ${theme.backgroundColor}
    ${theme.textColor}
    font-medium
    shadow-md
    hover:shadow-lg
    active:shadow-sm
  `,
  outline: (theme) => `
    bg-transparent
    ${theme.textColor}
    border-2
    ${theme.borderColor || 'border-current'}
    hover:bg-opacity-10
    active:bg-opacity-20
  `,
  ghost: (theme) => `
    bg-transparent
    ${theme.textColor}
    hover:bg-opacity-10
    active:bg-opacity-20
  `,
  link: (theme) => `
    bg-transparent
    ${theme.textColor}
    underline
    hover:opacity-80
    active:opacity-60
  `,
};

// Styles pour les différentes tailles de boutons
const buttonSizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

// Animations pour le chargement
const loadingAnimation = {
  animate: { rotate: 360 },
  transition: { duration: 1, ease: 'linear', repeat: Infinity },
};

// Composant FloatingCustomButton
export const FloatingCustomButton: FC<FloatingCustomButtonProps> = ({
  children,
  onClick,
  className = '',
  theme = customThemes.modern,
  animation = customAnimations.pulse,
  variant = 'solid',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
}) => {
  // Gestion du style du bouton
  const buttonStyle = buttonVariants[variant](theme);
  const sizeStyle = buttonSizes[size];
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  // Icône de chargement
  const LoadingIcon = () => (
    <motion.div
      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
      {...loadingAnimation}
    />
  );

  // Contenu du bouton
  const buttonContent = (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </>
      )}
    </>
  );

  return (
    <motion.button
      onClick={!disabled && !loading ? onClick : undefined}
      className={`
        inline-flex items-center justify-center
        rounded-lg
        transition-all
        ${buttonStyle}
        ${sizeStyle}
        ${disabledStyle}
        ${className}
      `}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
      whileHover={!disabled && !loading ? animation.hover : undefined}
      whileTap={!disabled && !loading ? animation.tap : undefined}
    >
      {buttonContent}
    </motion.button>
  );
};