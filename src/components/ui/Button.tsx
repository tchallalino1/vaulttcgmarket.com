'use client';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
  secondary:
    'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 shadow-sm',
  outline:
    'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 active:bg-gray-100',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}
