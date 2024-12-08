import React from 'react';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  description?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  message,
  description,
  icon,
  onClose,
}) => {
  const baseStyles =
    'p-4 rounded-lg flex items-start space-x-4 shadow-md';

  const typeStyles = {
    success: 'bg-green-100 text-green-700 border border-green-300',
    error: 'bg-red-100 text-red-700 border border-red-300',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
    info: 'bg-blue-100 text-blue-700 border border-blue-300',
  };

  const closeButtonStyles =
    'ml-auto text-gray-500 hover:text-gray-800 focus:outline-none';

  return (
    <div className={`${baseStyles} ${typeStyles[type]}`}>
      {icon && <div className="text-2xl">{icon}</div>}
      <div>
        <p className="font-bold">{message}</p>
        {description && <p className="mt-1 text-sm">{description}</p>}
      </div>
      {onClose && (
        <button
          className={closeButtonStyles}
          onClick={onClose}
          aria-label="Close alert"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
