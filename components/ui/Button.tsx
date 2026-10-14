import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ href, children, className = '', ...props }: ButtonProps) => {
  // Exact Figma styles: Padding 14px 42px, gold gradient, border, shadow, text styling
  const baseStyles = "inline-flex items-center justify-center uppercase font-sans font-semibold text-[13.1px] leading-[21px] tracking-[2.624px] text-[#05140E] py-[14px] px-[42px] bg-gradient-to-r from-[#C5A059] to-[#9A7632] border border-[#E2C887] shadow-[0px_6px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0px_8px_25px_rgba(197,160,89,0.3)] active:scale-95";

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};