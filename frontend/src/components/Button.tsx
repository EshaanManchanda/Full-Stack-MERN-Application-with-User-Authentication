import React from 'react';
import { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  type = 'button',
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
}) => {
  const baseClasses = 'btn';
  const variantClasses = `btn-${variant}`;
  const loadingClasses = isLoading ? 'disabled' : '';
  const customClasses = className;

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${loadingClasses} ${customClasses}`}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button; 