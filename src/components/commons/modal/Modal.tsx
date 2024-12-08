import React, { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      const timer = setTimeout(() => setShowModal(false), 300); // Durasi sesuai dengan animasi
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!showModal && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white w-full max-w-lg mx-4 md:mx-0 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          {title && <h2 className="text-lg font-bold">{title}</h2>}
          <button
            className="text-gray-400 hover:text-gray-600 text-2xl bg-slate-200 w-8 rounded-full"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-4">{children}</div>

        {/* Footer */}
        {footer && <div className="p-4 border-t">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;