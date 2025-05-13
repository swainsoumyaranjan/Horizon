import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
    accent: 'bg-accent-600 hover:bg-accent-700 text-white',
    outline: 'border border-gray-300 hover:bg-gray-100 text-gray-700',
    ghost: 'hover:bg-gray-100 text-gray-700',
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5 rounded-md',
    md: 'text-base px-4 py-2 rounded-md',
    lg: 'text-lg px-6 py-3 rounded-lg',
  };

  const baseClasses = 'font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center';
  
  const classes = twMerge(
    clsx(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? 'w-full' : '',
      className
    )
  );

  return (
    <button className={classes} {...props}>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};