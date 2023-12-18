import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useState } from "react";
import { useAddMainSubjectMutation } from "../../../../store/service/mainSubject/mainSubjectApiService";
import { useGetSubjectVariantQuery } from "../../../../store/service/subjectVariant/subjectVariantApiService";

const AddMainSubjectModal = ({
  openAddMainSubjectModal,
  setOpenAddMainSubjectModal,
}) => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectVariant, setSubjectVariant] = useState("");

  /* redux api call */
  const { data: subjectVariantsData } = useGetSubjectVariantQuery();
  const subjectVariants = subjectVariantsData?.data;
  const [addMainSubject, { isLoading }] = useAddMainSubjectMutation();

  /* handle submit data */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectName) return toast.error("Please add a Subject");
    if (!subjectVariant) return toast.error("Please add a subject variant");

    const result = await addMainSubject({
      name: subjectName,
      subjectVariant,
    });
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setSubjectName("");
      setOpenAddMainSubjectModal(!openAddMainSubjectModal);
    } else {
      toast.error(result?.error?.data?.message);
    }
  };

  // handle close modal
  const handleClose = () => {
    setOpenAddMainSubjectModal(!openAddMainSubjectModal);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
        openAddMainSubjectModal ? "block" : "hidden"
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
                  Add Main Subject
                </h1>
              </div>

              <form className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white">
                <div>
                  <label
                    htmlFor="subjectVariant"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    Subject Variant
                  </label>
                  <select
                    type="text"
                    id="subjectVariant"
                    name="subjectVariant"
                    onChange={(e) => setSubjectVariant(e.target.value)}
                    required
                    defaultValue={""}
                    className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                  >
                    <option value="" disabled>
                      Select Subject Variant
                    </option>
                    {subjectVariants?.map((subVariant, idx) => (
                      <option key={idx} value={subVariant?.variant}>
                        {subVariant?.variant}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="subjectName"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="subjectName"
                    name="subjectName"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    required
                    placeholder="Main Subject Name"
                    className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                  />
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

export default AddMainSubjectModal;
