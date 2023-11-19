import React from "react";
import { Button} from "@material-tailwind/react";
import { toast } from "react-hot-toast";

import { FaRegCircleXmark } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";

const EditStudentVariantModal = ({
  setEditStudentVariantData,
  editStudentVariantData,
  setOpenEditStudentVariantModal,
  openEditStudentVariantModal,
}) => {

  const editStudentVariant = null
  const isLoading = false


  // handle close modal
  const handleClose = () => {
    setEditStudentVariantData(null);
    setOpenEditStudentVariantModal(!openEditStudentVariantModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const variantName = e.target.name.value;
    const result = await editStudentVariant({ variantName });
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
        openEditStudentVariantModal ? "block" : "hidden"
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
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-sm text-gray-500"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={editStudentVariantData?.variantName}
              placeholder="Trainer"
              className="w-full p-2 mb-4 border rounded-md"
            />
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

export default EditStudentVariantModal;
