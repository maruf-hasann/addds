import { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { FaSpinner } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

import { useEditSubjectClassVariantMutation } from "../../../../store/service/subjectClassVariant/subjectClassVariantApiService";

const EditTutoringVariantModal = ({
  openEditSubjectClassVariantModal,
  setOpenEditSubjectClassVariantModal,
  editData,
}) => {
  /* Redux Api Call */
  const [editSubjectClassVariant, { isLoading }] =
    useEditSubjectClassVariantMutation();

  /* react hook form */
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      variant: "",
    },
  });

  /* handle submit */
  const handleEditSubmit = async (data) => {
    const editModifyData = {
      data: {
        ...data,
        id: editData?._id,
      },
    };
    const result = await editSubjectClassVariant(editModifyData);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      reset();
      setOpenEditSubjectClassVariantModal(!openEditSubjectClassVariantModal);
    } else {
      toast.error(result?.error?.data?.message);
    }
  };

  /* Set updated values */
  useEffect(() => {
    reset({
      variant: editData?.variant,
    });
  }, [editData, reset]);

  // handle close modal
  const handleClose = () => {
    setOpenEditSubjectClassVariantModal(!openEditSubjectClassVariantModal);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
        openEditSubjectClassVariantModal ? "block" : "hidden"
      }`}
    >
      <div
        className="w-full h-full z-0 absolute top-0 left-0"
        onClick={handleClose}
      ></div>
      <div className="relative z-50 w-full max-w-5xl  max-h-full mt-[20vh] mx-auto px-2 md:w-1/2 lg:w-1/3 md:px-0">
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
            <div className="py-10">
              <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-blue-gray-800">
                  Edit Subject Class Variant
                </h1>
              </div>

              <form
                onSubmit={handleSubmit(handleEditSubmit)}
                className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white"
              >
                <div>
                  <label
                    htmlFor="schoolName"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    Subject Class Variant
                  </label>
                  <input
                    type="text"
                    id="variant"
                    name="variant"
                    {...register("variant", {
                      required: "Variant is required!",
                    })}
                    placeholder="Subject Class Variant"
                    className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                  />
                </div>

                <div className="flex justify-end">
                  {isLoading ? (
                    <Button
                      disabled
                      type="submit"
                      className="bg-white text-blue-gray-700 border py-2 px-[39px] rounded-sm font-semibold cursor-wait "
                    >
                      <FaSpinner className="animate-spin" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-white text-blue-gray-700 border py-2 px-8 rounded-sm font-semibold cursor-pointer"
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default EditTutoringVariantModal;
