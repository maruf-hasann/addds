import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

import { useState } from "react";
import { useAddSubjectVariantMutation } from "../../../../store/service/subjectVariant/subjectVariantApiService";
import { useGetSubjectClassVariantsQuery } from "../../../../store/service/subjectClassVariant/subjectClassVariantApiService";

const AddSubjectVariantModal = ({
    openAddSubjectVariantModal,
    setOpenAddSubjectVariantModal,
}) => {
    /* state */
    const [variant, setVariant] = useState("");
    const [subjectClassVariant, setSubjectClassVariant] = useState("");

    /* redux api call */
    const [addSubjectVariant, { isLoading }] = useAddSubjectVariantMutation();
    const { data: subjectVariantsData } = useGetSubjectClassVariantsQuery();
    const subjectVariants = subjectVariantsData?.data;

    /* handle submit data */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!variant) return toast.error("Please add a variant");
        if (!subjectClassVariant)
            return toast.error("Please Add a subject class variant");

        const result = await addSubjectVariant({
            subjectClassVariant,
            variant,
        });
        if (result?.data?.success) {
            toast.success(result?.data?.message);
            setVariant("");
            setSubjectClassVariant("");
            setOpenAddSubjectVariantModal(!openAddSubjectVariantModal);
        } else {
            toast.error(result?.error?.data?.message);
        }
    };

    // handle close modal
    const handleClose = () => {
        setOpenAddSubjectVariantModal(!openAddSubjectVariantModal);
    };

    return (
        <div
            className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
                openAddSubjectVariantModal ? "block" : "hidden"
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
                                    Add Subject Variant
                                </h1>
                            </div>

                            <form className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white">
                                <div>
                                    <label
                                        htmlFor="educationVariant"
                                        className="block mb-2 font-semibold text-sm text-gray-500"
                                    >
                                        Subject Class Variant
                                    </label>
                                    <select
                                        type="text"
                                        id="educationVariant"
                                        name="educationVariant"
                                        onChange={(e) =>
                                            setSubjectClassVariant(
                                                e.target.value
                                            )
                                        }
                                        required
                                        defaultValue={""}
                                        className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                                    >
                                        <option value="" disabled>
                                            Select Subject Class Variant
                                        </option>
                                        {subjectVariants?.map(
                                            (subVariant, idx) => (
                                                <option
                                                    key={idx}
                                                    value={subVariant?.variant}
                                                >
                                                    {subVariant?.variant}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="curriculumName"
                                        className="block mb-2 font-semibold text-sm text-gray-500"
                                    >
                                        Variant
                                    </label>
                                    <input
                                        type="text"
                                        id="variant"
                                        name="variant"
                                        value={variant}
                                        onChange={(e) =>
                                            setVariant(e.target.value)
                                        }
                                        required
                                        placeholder="variant"
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

export default AddSubjectVariantModal;
