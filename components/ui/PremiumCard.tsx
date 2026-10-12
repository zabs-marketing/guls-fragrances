'use client';

import React from 'react';

export type CardElevation = 'sm' | 'md' | 'lg' | 'elevated' | 'flat';

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevation?: CardElevation;
  hoverLift?: boolean;
  border?: boolean;
  className?: string;
  as?: React.ElementType;
}

/**
 * PremiumCard - Core container component enforcing our "Ultra-Premium Minimalist" aesthetic:
 * - Crisp white canvas background
 * - Soft layered 3D drop shadow (subtle depth without harsh lines)
 * - Optional hover elevation lift
 * - Whisper-thin, delicate luxury border with emerald accent hover state
 */
export const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
  (
    {
      children,
      elevation = 'elevated',
      hoverLift = true,
      border = true,
      className = '',
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    const elevationClasses = {
      flat: 'shadow-none',
      sm: 'shadow-soft-sm',
      md: 'shadow-soft-md',
      lg: 'shadow-soft-lg',
      elevated: 'shadow-soft-elevated',
    };

    const hoverClasses = hoverLift
      ? 'transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-soft-xl hover:border-brand-green/20'
      : 'transition-all duration-300 ease-in-out';

    const borderClasses = border
      ? 'border border-brand-black/5'
      : 'border-0';

    return (
      <Component
        ref={ref}
        className={`bg-brand-white rounded-md relative overflow-hidden ${elevationClasses[elevation]} ${borderClasses} ${hoverClasses} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

PremiumCard.displayName = 'PremiumCard';

export default PremiumCard;

