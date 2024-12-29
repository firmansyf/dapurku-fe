import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'| 'success' ;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}) => {
  const baseStyles =
    'font-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-offset-2 transition duration-300';

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xs: 'px-2 py-1 text-xs'
  };

  const variantStyles = {
    primary:
      'bg-[#003A77] text-white',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 
      'border border-green-500 hover:bg-gray-200 focus:ring-green-400',
    success:
      'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${className} ${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        disabled ? disabledStyles : ''
      }`}
    >
      {text}
    </button>
  );
};

export default Button;