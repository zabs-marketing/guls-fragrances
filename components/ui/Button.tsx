'use client';

import React from 'react';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      href,
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles: globally smooth transitions, subtle scaling on active click
    const baseStyles =
      'inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 ease-in-out active:scale-95 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30';

    // Size variants
    const sizeStyles = {
      sm: 'text-[11px] px-4 py-2 rounded-sm gap-1.5',
      md: 'text-[12px] px-6 py-3 rounded-sm gap-2',
      lg: 'text-[13px] px-8 py-4 rounded-sm gap-2.5',
    };

    // Theme variants matching "Ultra-premium minimalist"
    const variantStyles = {
      // Primary: Deep Charcoal/Black background, white text, subtle hover lift & soft elevation shadow, accent emerald touch on hover
      primary:
        'bg-brand-black text-brand-white shadow-soft-sm hover:shadow-soft-md hover:bg-brand-charcoal hover:-translate-y-0.5 border border-brand-black/90',

      // Secondary: Transparent with a refined thin border, subtle fill & emerald tint on hover
      secondary:
        'bg-transparent text-brand-black border border-brand-black/20 hover:border-brand-green hover:text-brand-green hover:bg-brand-green/5 hover:-translate-y-0.5 shadow-none hover:shadow-soft-sm',

      // Accent: Subtle Forest/Emerald Green for dedicated callouts
      accent:
        'bg-brand-green text-brand-white shadow-soft-sm hover:shadow-soft-md hover:bg-brand-green-dark hover:-translate-y-0.5 border border-brand-green',

      // Ghost: Borderless, minimal, clean hover background
      ghost:
        'bg-transparent text-brand-black hover:text-brand-green hover:bg-brand-offwhite border-transparent',
    };

    const combinedClasses = `
      ${baseStyles}
      ${sizeStyles[size]}
      ${variantStyles[variant]}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    const content = (
      <>
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={combinedClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

