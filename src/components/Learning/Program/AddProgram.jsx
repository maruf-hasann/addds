
import React, { useState } from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';
import AddProgramForm from './AddProgramForm';


const AddProgram = ({ modalOpen, setModalOpen }) => {
  // handle close modal
  const handleClose = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
        modalOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="w-full h-full z-0 absolute top-0 left-0"
        onClick={handleClose}
      ></div>
      <div className="relative z-50 w-full max-w-5xl  max-h-full mt-[8vh] mx-auto px-2  md:px-0">
        <div
          className={`relative  rounded-lg shadow text-primary px-10 bg-white`}
        >
          {/* modal close button */}
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-3 right-2.5  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <FaRegCircleXmark className="text-3xl text-red-400 hover:text-red-500" />
          </button>
          <>
            <div className="py-6">
              <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-blue-gray-800">Add Program</h1>
              </div>

             <AddProgramForm/>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default AddProgram;