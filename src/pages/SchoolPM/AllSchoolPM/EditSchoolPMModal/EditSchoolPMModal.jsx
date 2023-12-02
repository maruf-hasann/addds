import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

import { useState, useEffect } from "react";
import { useEditSchoolPMMutation } from "../../../../store/service/schoolPM/schoolPMApiService";
import { useGetEducationVariantsQuery } from "../../../../store/service/educationVariant/educationVariantApiService";
import { useLazyGetCountryDistrictQuery } from "../../../../store/service/country/countryApiService";
import { useForm } from "react-hook-form";

const EditSchoolPMModal = ({
    openEditSchoolPMModal,
    setOpenEditSchoolPMModal,
    editData,
}) => {
    /* Set all the states data state */
    const [states, setStates] = useState([]);
    const [editSchoolPM, { isLoading }] = useEditSchoolPMMutation();

    const { data: educationVariantsData } = useGetEducationVariantsQuery();
    const educationVariants = educationVariantsData?.data;

    /* Get whole country district */
    const [getCountryDistrict] = useLazyGetCountryDistrictQuery();

    /* Set default values */
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            division: "",
            educationVariant: "",
            schoolName: "",
        },
    });

    const handleEditSubmit = async (data) => {
        const editModifyData = {
            id: editData?._id,
            data: {
                ...data,
            },
        };
        const result = await editSchoolPM(editModifyData);
        if (result?.data?.success) {
            toast.success(result?.data?.message);
            reset();
            setOpenEditSchoolPMModal(!openEditSchoolPMModal);
        } else {
            toast.error(result?.error?.data?.message);
        }
    };

    /* Set updated values */
    useEffect(() => {
        reset({
            division: editData?.division,
            educationVariant: editData?.educationVariant,
            schoolName: editData?.schoolName,
        });
    }, [editData, reset]);

    // fetch all states
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCountryDistrict("BD");
                setStates(response.data);
            } catch (error) {
                toast.error("Error fetching data:", error);
            }
        };
        fetchData();
        return () => {};
    }, [getCountryDistrict]);

    // handle close modal
    const handleClose = () => {
        setOpenEditSchoolPMModal(!openEditSchoolPMModal);
    };

    return (
        <div
            className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
                openEditSchoolPMModal ? "block" : "hidden"
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
                                    Edit School PM
                                </h1>
                            </div>

                            <form
                                onSubmit={handleSubmit(handleEditSubmit)}
                                className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white"
                            >
                                {/* city */}
                                <div className={`w-full`}>
                                    <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                                        Select Division
                                    </label>
                                    <select
                                        {...register("division", {
                                            required: "Division is required!",
                                        })}
                                        className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                                    >
                                        <option value={editData?.division}>
                                            {editData?.division}
                                        </option>
                                        {states
                                            ?.filter(
                                                (state) =>
                                                    state.name ===
                                                        "Dhaka Division" ||
                                                    state.name ===
                                                        "Chittagong Division" ||
                                                    state.name ===
                                                        "Khulna Division" ||
                                                    state.name ===
                                                        "Rajshahi Division" ||
                                                    state.name ===
                                                        "Barisal Division" ||
                                                    state.name ===
                                                        "Rangpur Division" ||
                                                    state.name ===
                                                        "Mymensingh Division" ||
                                                    state.name ===
                                                        "Sylhet Division"
                                            )
                                            ?.filter(
                                                (state) =>
                                                    state.name !==
                                                    editData?.division
                                            )
                                            ?.map((state, idx) => (
                                                <option
                                                    key={idx}
                                                    value={state?.name}
                                                >
                                                    {state?.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="educationVariant"
                                        className="block mb-2 font-semibold text-sm text-gray-500"
                                    >
                                        Education Variant
                                    </label>
                                    <select
                                        {...register("educationVariant", {
                                            required:
                                                "Education Variant is required!",
                                        })}
                                        className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                                    >
                                        <option
                                            value={editData?.educationVariant}
                                        >
                                            {editData?.educationVariant}
                                        </option>
                                        {educationVariants
                                            ?.filter(
                                                (variant) =>
                                                    variant?.variantName !==
                                                    editData?.educationVariant
                                            )
                                            ?.map((variant, idx) => (
                                                <option
                                                    key={idx}
                                                    value={variant?.variantName}
                                                >
                                                    {variant?.variantName}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="schoolName"
                                        className="block mb-2 font-semibold text-sm text-gray-500"
                                    >
                                        School Name
                                    </label>
                                    <input
                                        type="text"
                                        id="schoolName"
                                        name="schoolName"
                                        {...register("schoolName", {
                                            required:
                                                "School Name is required!",
                                        })}
                                        placeholder="School Name"
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

export default EditSchoolPMModal;
