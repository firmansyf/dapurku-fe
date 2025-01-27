'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?:
    | 'small'
    | 'medium'
    | 'large'
    | 'doubleLarge'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl';
  iconClose?: boolean;
  closeOnOutsideClick?: boolean;
  plain?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  subTitle,
  size = 'medium',
  iconClose = false,
  closeOnOutsideClick = false,
  plain,
}) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Konfigurasi ukuran modal
  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-lg',
    large: 'max-w-xl',
    doubleLarge: 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
  };

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      const timer = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Menutup modal ketika klik di luar area modal jika fitur diaktifkan
  useEffect(() => {
    if (!closeOnOutsideClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, closeOnOutsideClick]);

  if (!showModal && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        ref={modalRef}
        className={`w-full bg-white ${!plain && 'p-3'} ${sizeClasses[size]} mx-4 transform overflow-auto rounded-lg shadow-sm transition-transform duration-300 md:mx-0 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        {/* Header */}
        {(title || subTitle) && (
          <div className={`flex items-center justify-between p-4`}>
            {title && (
              <div className="flex w-full items-center justify-between">
                <h2 className="text-lg font-bold">{title}</h2>
                {subTitle && <h3 className="text-sm">{subTitle}</h3>}
              </div>
            )}

            {iconClose && (
              <button
                className="flex h-8 w-8 items-center justify-center text-2xl text-gray-400 hover:rounded-full hover:bg-slate-200 hover:text-gray-600"
                onClick={onClose}
                aria-label="Close modal"
              >
                <span className="mb-2">&times;</span>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={`${!plain && 'p-4'}`}>{children}</div>

        {/* Footer */}
        {footer && <div className="border-t p-4">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
