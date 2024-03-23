
import React, { useState } from 'react';
import AddProgramForm from './AddProgramForm';
import { RxCross2 } from 'react-icons/rx';
import { FaRegCircleXmark } from 'react-icons/fa6';


const AddProgram = ({ modalOpen, setModalOpen }) => {
  // handle close modal
  const handleClose = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <div
        className={`fixed inset-0 ${
          modalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-opacity duration-300 ease-in-out flex items-center justify-center z-50`}
      >
        <div className="fixed inset-0 backdrop-filter backdrop-blur-sm "></div>
        <div
          className="bg-white rounded-md z-10  max-w-[1000px] w-full relative mx-1 overflow-y-auto"
          style={{ height: "calc(100vh - 20vh)" }}
        >
          <div className="px-4 py-3  sticky top-0 z-50 backdrop-filter backdrop-blur-sm">
            {/* modal close button */}
            <button
              onClick={handleClose}
              type="button"
              className="absolute top-3 right-2.5  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <FaRegCircleXmark className="text-3xl text-red-400 hover:text-red-500" />
            </button>
            <>
              <div className="py-6 px-5">
                <div className="flex justify-between items-center mb-5">
                  <h1 className="font-bold text-blue-gray-800">Add Program</h1>
                </div>

                <AddProgramForm setModalOpen={setModalOpen} />
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProgram;