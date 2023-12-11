import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CiCircleRemove } from "react-icons/ci";
import { Button } from "@material-tailwind/react";
import { FaSpinner } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import toast from "react-hot-toast";

import { useGetEducationVariantsQuery } from "../../../../store/service/educationVariant/educationVariantApiService";
import { useAddMockPricingMutation } from "../../../../store/service/mockPricing/mockPricingApiService";
import { useGetMainSubjectQuery } from "../../../../store/service/mainSubject/mainSubjectApiService";
import { useGetTutoringClassPMQuery } from "../../../../store/service/tutoringClassPM/tutoringClassPMApiService";
import { useLazyGetSubSubjectByMainSubjectQuery } from "../../../../store/service/subSubject/subSubjectApiService";

const AddMockPricingModal = ({
    openAddMockPricingModal,
    setOpenAddMockPricingModal,
}) => {
    /* state handle */
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedSubSubjects, setSelectedSubSubjects] = useState([]);
    const [educationVariant, setEducationVariant] = useState("");

    /* redux api call */
    const [addMockPricing, { isLoading }] = useAddMockPricingMutation();
    // education variant data
    const { data: educationVariantsData } = useGetEducationVariantsQuery();
    const educationVariants = educationVariantsData?.data;

    // main subject data
    const { data: mainSubjectsData } = useGetMainSubjectQuery();
    const mainSubjects = mainSubjectsData?.data?.filter(
        (mainSubject) =>
            mainSubject?.subjectVariant?.toLowerCase() ===
            "Academic".toLowerCase()
    );

    // grade data
    const { data: allGradeData } = useGetTutoringClassPMQuery();
    const gradeData = allGradeData?.data?.filter(
        (grade) =>
            grade?.educationVariant?.toLowerCase() ===
            educationVariant?.toLowerCase()
    );

    // sub subject
    const [getSubSubjectByMainSubject] =
        useLazyGetSubSubjectByMainSubjectQuery();

    // get sub subject from api
    useEffect(() => {
        const fetch = async () => {
            const data = await getSubSubjectByMainSubject(selectedSubject);
            setSelectedSubSubjects(data?.data?.data);
        };
        setSelectedSubject("");
        fetch();
    }, [selectedSubject, getSubSubjectByMainSubject]);

    // react hook form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // get education variant and main subject
    const educationVariantWatch = watch("educationVariant");
    const mainSubjectWatch = watch("mainSubject");

    useEffect(() => {
        if (educationVariantWatch) {
            setEducationVariant(educationVariantWatch);
        }
    }, [educationVariantWatch]);

    useEffect(() => {
        if (mainSubjectWatch) {
            setSelectedSubject(mainSubjectWatch);
        }
    }, [mainSubjectWatch]);

    /* handle submit data */
    const onSubmitMockPricing = async (data) => {
       
        const result = await addMockPricing({
            ...data,
        });
        if (result?.data?.success) {
            toast.success(result?.data?.message);
            setOpenAddMockPricingModal(!openAddMockPricingModal);
        } else {
            toast.error(result?.error?.data?.message);
        }
        console.log(data, "data");
    };

    // handle close modal
    const handleClose = () => {
        setOpenAddMockPricingModal(!openAddMockPricingModal);
    };

    return (
        <div
            className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
                openAddMockPricingModal ? "block" : "hidden"
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
                                    Add Mock Pricing
                                </h1>
                            </div>

                            <form
                                onSubmit={handleSubmit(onSubmitMockPricing)}
                                className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white"
                            >
                                <div>
                                    <label
                                        htmlFor="educationVariant"
                                        className="block mb-2 font-semibold text-sm text-gray-500"
                                    >
                                        Education Variant
                                    </label>
                                    <select
                                        type="text"
                                        {...register("educationVariant", {
                                            required: true,
                                        })}
                                        className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                                    >
                                        <option value="">
                                            Select Education Variant
                                        </option>
                                        {educationVariants?.map(
                                            (variant, idx) => (
                                                <option
                                                    key={idx}
                                                    value={variant?.variantName}
                                                >
                                                    {variant?.variantName}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                {gradeData?.length ? (
                                    <div>
                                        <label
                                            htmlFor="grade"
                                            className="block mb-2 font-semibold text-sm text-gray-500"
                                        >
                                            {educationVariant ===
                                            "English Medium"
                                                ? "Grade"
                                                : "Class"}
                                        </label>
                                        <select
                                            type="text"
                                            {...register("grade", {
                                                required: true,
                                            })}
                                            className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                                        >
                                            <option value="">
                                                Select Grade
                                            </option>
                                            {gradeData?.map((grade, idx) => (
                                                <option
                                                    key={idx}
                                                    value={grade?.className}
                                                >
                                                    {grade?.className}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <div>
                                    <label
                                        htmlFor="educationVariant"
                                        className="block mb-2 font-semibold text-sm text-gray-500"
                                    >
                                        Main Subject
                                    </label>
                                    <select
                                        type="text"
                                        {...register("mainSubject", {
                                            required: true,
                                        })}
                                        className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                                    >
                                        <option value="">
                                            Select Main Subject
                                        </option>
                                        {mainSubjects?.map(
                                            (mainSubject, idx) => (
                                                <option
                                                    key={idx}
                                                    value={mainSubject?.name}
                                                >
                                                    {mainSubject?.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                                {selectedSubSubjects?.length ? (
                                    <div>
                                        <label
                                            htmlFor="educationVariant"
                                            className="block mb-2 font-semibold text-sm text-gray-500"
                                        >
                                            Sub Subject
                                        </label>
                                        <select
                                            type="text"
                                            {...register("subSubject", {
                                                required: true,
                                            })}
                                            className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                                        >
                                            <option value="">
                                                Select Sub Subject
                                            </option>
                                            {selectedSubSubjects?.map(
                                                (subSubject, idx) => (
                                                    <option
                                                        key={idx}
                                                        value={
                                                            subSubject?.subSubject
                                                        }
                                                    >
                                                        {subSubject?.subSubject}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                ) : (
                                    ""
                                )}

                                <div>
                                    <label
                                        htmlFor="price"
                                        className="block mb-2 font-semibold text-sm text-gray-500"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="text"
                                        {...register("price", {
                                            required: true,
                                        })}
                                        placeholder="add price"
                                        className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                                    />
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

export default AddMockPricingModal;
