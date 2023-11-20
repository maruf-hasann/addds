import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useAddEducationVariantMutation } from "../../../../store/service/educationVariant/educationVariantApiService";

const AddEducationVariantModal = ({
    openAddEducationVariantModal,
    setOpenAddEducationVariantModal,
}) => {


    const [addEducationVariant, { isLoading }] = useAddEducationVariantMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const variantName = e.target.name.value;
        const result = await addEducationVariant({ variantName });
        if (result?.data?.success) {
            toast.success(result?.data?.message);
            e.target.reset();
        } else {
            toast.error(result?.error?.data?.message);
        }
    };


    // handle close modal
    const handleClose = () => {
        setOpenAddEducationVariantModal(!openAddEducationVariantModal);
    };


    return (
        <div
            className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${openAddEducationVariantModal ? "block" : "hidden"
                }`}
        >
            <div
                className="w-full h-full z-0 absolute top-0 left-0"
                onClick={handleClose}
            >

            </div>
            <div className="relative z-50 w-full max-w-5xl  max-h-full mt-[30vh] mx-auto px-2 md:w-1/2 lg:w-1/3 md:px-0">
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
                                    Add Education Variant
                                </h1>

                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className=" mx-auto p-4 border rounded-md bg-white"
                            >
                                <label
                                    htmlFor="name"
                                    className="block mb-5 font-semibold text-sm text-gray-500"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="One to One"
                                    className="w-full p-2 mb-5 border rounded-md outline-none focus:outline-primaryAlfa-50"
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

export default AddEducationVariantModal;
