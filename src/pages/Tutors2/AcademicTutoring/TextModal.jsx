import React, { useState } from "react";

const TextModal = ({ isOpen, onClose, children }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        modalOpen ? "" : "hidden"
      }`}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <span
          className="absolute top-0 right-0 p-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={closeModal}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default TextModal;
