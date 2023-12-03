import toast from "react-hot-toast";
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

import { useGetSubjectVariantQuery } from "../../../../store/service/subjectVariant/subjectVariantApiService";
import { useEditMainSubjectMutation } from "../../../../store/service/mainSubject/mainSubjectApiService";

const EditMainSubjectModal = ({
    openEditMainSubjectModal,
    setOpenEditMainSubjectModal,
    editData,
}) => {
    /* redux api call */
    const [editMainSubject, { isLoading }] = useEditMainSubjectMutation();
    const { data: subjectVariantsData } = useGetSubjectVariantQuery();
    const subjectVariants = subjectVariantsData?.data;

    /* react hook form */
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            subjectVariant: "",
            name: "",
        },
    });

    /* handle edit submit */
    const handleEditSubmit = async (data) => {
        const editModifyData = {
            id: editData?._id,
            data: {
                ...data,
            },
        };
        const result = await editMainSubject(editModifyData);
        if (result?.data?.success) {
            toast.success(result?.data?.message);
            reset();
            setOpenEditMainSubjectModal(!openEditMainSubjectModal);
        } else {
            toast.error(result?.error?.data?.message);
        }
    };

    /* Set updated values */
    useEffect(() => {
        reset({
            subjectVariant: editData?.subjectVariant,
            name: editData?.name,
        });
    }, [editData, reset]);

    // handle close modal
    const handleClose = () => {
        setOpenEditMainSubjectModal(!openEditMainSubjectModal);
    };

    return (
        <div
            className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
                openEditMainSubjectModal ? "block" : "hidden"
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
                                    Edit Main Subject
                                </h1>
                            </div>

                            <form
                                onSubmit={handleSubmit(handleEditSubmit)}
                                className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white"
                            >
                                <div>
                                    <label
                                        htmlFor="subjectVariant"
                                        className="block mb-2 font-semibold text-sm text-gray-500"
                                    >
                                        Subject Variant
                                    </label>
                                    <select
                                        {...register("subjectVariant", {
                                            required:
                                                "Subject Variant is required!",
                                        })}
                                        className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                                    >
                                        <option
                                            value={editData?.subjectVariant}
                                        >
                                            {editData?.subjectVariant}
                                        </option>
                                        {subjectVariants
                                            ?.filter(
                                                (subVariant) =>
                                                    subVariant?.variant !==
                                                    editData?.subjectVariant
                                            )
                                            ?.map((subVariant, idx) => (
                                                <option
                                                    key={idx}
                                                    value={subVariant?.variant}
                                                >
                                                    {subVariant?.variant}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 font-semibold text-sm text-gray-500"
                                    >
                                        name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        {...register("name", {
                                            required: "name is required!",
                                        })}
                                        placeholder="Name"
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

export default EditMainSubjectModal;
