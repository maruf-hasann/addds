import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

import { useState } from "react";
import { useGetEducationVariantsQuery } from "../../../../store/service/educationVariant/educationVariantApiService";
import { useAddTutoringClassHCMutation } from "../../../../store/service/tutoringClassHC/tutoringClassHCApiService";
import { useGetCurriculumBoardsQuery } from "../../../../store/service/curriculumBoard/curriculumBoardApiService";

const AddTutoringClassHCModal = ({
  openAddTutoringClassHCModal,
  setOpenAddTutoringClassHCModal,
}) => {
  const [className, setClassName] = useState("");
  const [educationVariant, setEducationVariant] = useState("");
  const [curriculumBoard, setCurriculumBoard] = useState("");

  const [addClass, { isLoading }] = useAddTutoringClassHCMutation();

  const { data: educationVariantsData } = useGetEducationVariantsQuery();
  const educationVariants = educationVariantsData?.data;

  const { data: allCurriculumBoardData } = useGetCurriculumBoardsQuery();
  const allCurriculumBoard = allCurriculumBoardData?.data;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!className) return toast.error("Please add Class Name");
    if (!educationVariant) return toast.error("Please Add a education variant");
    if (!curriculumBoard) return toast.error("Please Add Curriculum Board");

    const result = await addClass({
      className,
      educationVariant,
      curriculumBoard,
    });
    console.log(result);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setClassName("");
      setEducationVariant("");
      setCurriculumBoard("");
      setOpenAddTutoringClassHCModal(!openAddTutoringClassHCModal);
    } else {
      toast.error(result?.error?.data?.message);
    }
  };

  // handle close modal
  const handleClose = () => {
    setOpenAddTutoringClassHCModal(!openAddTutoringClassHCModal);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
        openAddTutoringClassHCModal ? "block" : "hidden"
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
              <div className="flex justify-between items-center pb-3">
                <h1 className="font-bold text-blue-gray-800">
                  Add Tutoring Class HC
                </h1>
              </div>

              <form className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white">
                <div>
                  <label
                    htmlFor="className"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="className"
                    name="className"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    required
                    placeholder="Class Name"
                    className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="educationVariant"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    Education Variant
                  </label>
                  <select
                    type="text"
                    id="educationVariant"
                    name="educationVariant"
                    onChange={(e) => setEducationVariant(e.target.value)}
                    required
                    defaultValue={""}
                    className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                  >
                    <option value="" disabled>
                      Select Education Variant
                    </option>
                    {educationVariants?.map((variant, idx) => (
                      <option key={idx} value={variant?.variantName}>
                        {variant?.variantName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="curriculumBoard"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    Curriculum Board
                  </label>
                  <select
                    type="text"
                    id="curriculumBoard"
                    name="curriculumBoard"
                    onChange={(e) => setCurriculumBoard(e.target.value)}
                    required
                    defaultValue={""}
                    className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                  >
                    <option value="" disabled>
                      Select Curriculum Board
                    </option>
                    {allCurriculumBoard?.map((curriculumBoard, idx) => (
                      <option key={idx} value={curriculumBoard?.boardName}>
                        {curriculumBoard?.boardName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end">
                  {isLoading ? (
                    <Button
                      disabled
                      className="bg-white text-blue-gray-700 border py-2 px-[39px] rounded-sm font-semibold cursor-wait "
                      onClick={handleSubmit}
                    >
                      <FaSpinner className="animate-spin" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-white text-blue-gray-700 border py-2 px-8 rounded-sm font-semibold cursor-pointer"
                      onClick={handleSubmit}
                    >
                      Add
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

export default AddTutoringClassHCModal;
