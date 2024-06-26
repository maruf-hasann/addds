import React from "react";
import { Button } from "@material-tailwind/react";
import { toast } from "react-hot-toast";

import { FaRegCircleXmark } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";

const EditBoardWiseSubjectModal = ({
  setEditBoardWiseSubjectData,
  editBoardWiseSubjectData,
  setOpenEditBoardWiseSubjectModal,
  openEditBoardWiseSubjectModal,
}) => {
  const editBoardWiseSubject = null;
  const isLoading = false;

  // handle close modal
  const handleClose = () => {
    setEditBoardWiseSubjectData(null);
    setOpenEditBoardWiseSubjectModal(!openEditBoardWiseSubjectModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subject = e.target.subject.value;
    const type = e.target.type.value;
    const result = await editBoardWiseSubject({ subject, type });
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      e.target.reset();
    } else {
      toast.error(result?.error?.data?.message);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm bg-white/5 ${
        openEditBoardWiseSubjectModal ? "block" : "hidden"
      }`}
    >
      <div className="relative w-full max-w-2xl  max-h-full mt-20 mx-auto px-2 md:px-5 lg:px-10 xl:px-20">
        <div
          className={`relative  rounded-lg shadow text-primary p-10 bg-white`}
        >
          {/* modal close button */}
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-3 right-2.5  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <FaRegCircleXmark className="text-3xl text-red-400 hover:text-red-500" />
          </button>
          {/* form start */}
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white"
          >
            <div className=" grid grid-cols-1 gap-5">
              <div>
                <label
                  htmlFor="board"
                  className="block mb-2 font-semibold text-sm text-gray-500"
                >
                  Board
                </label>
                <input
                  type="text"
                  id="board"
                  name="board"
                  required
                  defaultValue={editBoardWiseSubjectData?.board}
                  placeholder="Board Name"
                  className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                />
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block mb-2 font-semibold text-sm text-gray-500"
                >
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  required
                  defaultValue={editBoardWiseSubjectData?.type}
                  placeholder="Type Name"
                  className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 font-semibold text-sm text-gray-500"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  defaultValue={editBoardWiseSubjectData?.subject}
                  placeholder="Subject Name"
                  className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                />
              </div>
            </div>
            <div className="flex justify-end">
              {isLoading ? (
                <Button
                  disabled
                  className="bg-white text-blue-gray-700 border py-2 px-[39px] rounded-sm font-semibold cursor-wait "
                >
                  <FaSpinner className="animate-spin" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-white text-blue-gray-700 border py-2 px-8 rounded-sm font-semibold cursor-pointer"
                >
                  Update
                </Button>
              )}
            </div>
          </form>
          {/* form end */}
        </div>
      </div>
    </div>
  );
};

export default EditBoardWiseSubjectModal;
