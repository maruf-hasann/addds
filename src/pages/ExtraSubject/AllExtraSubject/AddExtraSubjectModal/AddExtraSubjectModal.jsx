import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useAddExtraSubjectMutation } from "../../../../store/service/extraSubject/extraSubjectApiService";

const AddExtraSubjectModal = ({
    openAddExtraSubjectModal,
    setOpenAddExtraSubjectModal,
}) => {

    const [addExtraSubject, { isLoading }] = useAddExtraSubjectMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const type = e.target.type.value;
        const subject = e.target.subject.value;
        const result = await addExtraSubject({ type, subject });
        if (result?.data?.success) {
            toast.success(result?.data?.message);
            e.target.reset();
        } else {
            toast.error(result?.error?.data?.message);
        }
    };


    // handle close modal
    const handleClose = () => {
        setOpenAddExtraSubjectModal(!openAddExtraSubjectModal);
    };


    return (
        <div
            className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${openAddExtraSubjectModal ? "block" : "hidden"
                }`}
        >
            <div
                className="w-full h-full z-0 absolute top-0 left-0"
                onClick={handleClose}
            >

            </div>
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
                                    Add Extra Subject
                                </h1>

                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white"
                            >
                                <div className=" grid grid-cols-1 gap-5">
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

                                            placeholder="Subject Name"
                                            className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50 outline-none focus:outline-primaryAlfa-50"
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

export default AddExtraSubjectModal;
