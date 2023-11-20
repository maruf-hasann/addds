import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { educationVariants } from "../../../../data/educationVariant";
import { useState, useEffect } from "react";

const AddTutoringSubjectModal = ({
    openAddTutoringSubjectModal,
    setOpenAddTutoringSubjectModal,
}) => {

    const [name, setName] = useState("");
    const [educationVariant, setEducationVariant] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !educationVariant) {
            toast.error("Please fill up all fields");
            return;
        }
        setIsLoading(true);
    };


    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                setIsLoading(false);
                setName("");
                setEducationVariant("");
                toast.success("Tutoring Subject added successfully");
            }, 2000);
        }
    }, [isLoading]);

    // handle close modal
    const handleClose = () => {
        setOpenAddTutoringSubjectModal(!openAddTutoringSubjectModal);
    };


    return (
        <div
            className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${openAddTutoringSubjectModal ? "block" : "hidden"
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
                                    Add Education Variant
                                </h1>

                            </div>

                            <form className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white">
                                <div>
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Tutoring Subject Name"
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
                                        {educationVariants.map((variant, idx) => (
                                            <option key={idx} value={variant.id}>
                                                {variant.name}
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

export default AddTutoringSubjectModal;
