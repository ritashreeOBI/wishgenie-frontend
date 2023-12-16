import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black opacity-50 "></div>
      <div className="bg-white rounded-lg p-8 z-10 min-w-[350px]">
        {children}
      </div>
    </div>
  );
};

export default Modal;
