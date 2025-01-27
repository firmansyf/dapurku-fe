import React from 'react';

interface CardProps {
  title: string
  description?: string
  children?: React.ReactNode
  imageUrl?: string
  actions?: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, actions, children, className = 'max-w-sm' }) => {
  return (
    <div className={` ${className} bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden`}>
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="w-full h-52 object-cover"
          src={imageUrl}
          alt={title}
        />
      )}
      <div className="p-4">
        <h5 className="text-xl font-bold tracking-wide text-gray-900">
          {title}
        </h5>
        {description && <p className="mt-2 text-gray-500 text-wrap tracking-wide truncate text-sm h-14">{description}</p>}

        {children && <div className="mt-3">{children}</div>}

        {actions && <div className="mt-4 w-full flex space-x-2">{actions}</div>}
      </div>
    </div>
  );
};

export default Card;
