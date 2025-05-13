import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false,
  onClick
}) => {
  return (
    <div 
      className={twMerge(
        'bg-white rounded-lg shadow-md p-4 overflow-hidden', 
        hover && 'transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CardImage: React.FC<CardImageProps> = ({ src, alt, className }) => {
  return (
    <div className={twMerge('w-full h-48 overflow-hidden rounded-t-md -mt-4 -mx-4 mb-4', className)}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
  return (
    <h3 className={twMerge('text-xl font-semibold font-heading text-gray-900 mb-2', className)}>
      {children}
    </h3>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return (
    <div className={twMerge('text-gray-600', className)}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return (
    <div className={twMerge('mt-4 pt-4 border-t border-gray-100 flex items-center justify-between', className)}>
      {children}
    </div>
  );
};

interface CardBadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export const CardBadge: React.FC<CardBadgeProps> = ({ 
  children, 
  color = 'bg-primary-100 text-primary-800', 
  className 
}) => {
  return (
    <span className={twMerge(`text-xs px-2 py-1 rounded-full ${color}`, className)}>
      {children}
    </span>
  );
};