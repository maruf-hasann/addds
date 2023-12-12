import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { FaSpinner } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

import { useGetEducationVariantsQuery } from "../../../../store/service/educationVariant/educationVariantApiService";
import { useEditMockPricingMutation } from "../../../../store/service/mockPricing/mockPricingApiService";
import { useGetMainSubjectQuery } from "../../../../store/service/mainSubject/mainSubjectApiService";
import { useGetTutoringClassPMQuery } from "../../../../store/service/tutoringClassPM/tutoringClassPMApiService";
import { useLazyGetSubSubjectByMainSubjectQuery } from "../../../../store/service/subSubject/subSubjectApiService";

const EditMockPricingModal = ({
    openEditMockPricingModal,
    setOpenEditMockPricingBoard,
    editData,
}) => {
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedSubSubjects, setSelectedSubSubjects] = useState([]);
    const [educationVariant, setEducationVariant] = useState("");

    /* redux call api */
    const [editMockPricing, { isLoading }] = useEditMockPricingMutation();
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
    /* react hook form */
    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            educationVariant: "",
            grade: "",
            mainSubject: "",
            price: "",
        },
    });

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

    // sub subject
    const [getSubSubjectByMainSubject] =
        useLazyGetSubSubjectByMainSubjectQuery();

    // get sub subject from api
    useEffect(() => {
        const fetch = async () => {
            if (selectedSubject) {
                const data = await getSubSubjectByMainSubject(selectedSubject);
                setSelectedSubSubjects(data?.data?.data);
            }
        };
        setSelectedSubject("");
        fetch();
    }, [selectedSubject, getSubSubjectByMainSubject, reset]);

    // get sub subject from api
    useEffect(() => {
        const fetch = async () => {
            if (!selectedSubSubjects?.length) {
                reset({
                    subSubject: "",
                });
            }
        };
        fetch();
    }, [selectedSubSubjects, reset]);

    /* handle edit submit data */
    const handleEditSubmit = async (data) => {
        const editModifyData = {
            id: editData?.mockId,
            data: {
                educationVariant: data?.educationVariant,
                grade: data?.grade,
                mainSubject: data?.mainSubject,
                subSubject: data?.subSubject || "",
                price: data?.price,
            },
        };
        const result = await editMockPricing(editModifyData);
        if (result?.data?.success) {
            toast.success(result?.data?.message);
            reset();
            setOpenEditMockPricingBoard(!openEditMockPricingModal);
        } else {
            toast.error(result?.error?.data?.message);
        }
    };

    /* Set updated values */
    useEffect(() => {
        reset({
            price: editData?.price,
            educationVariant: editData?.educationVariant,
            grade: editData?.grade,
            mainSubject: editData?.mainSubject,
        });
    }, [editData, reset]);

    // handle close modal
    const handleClose = () => {
        setOpenEditMockPricingBoard(!openEditMockPricingModal);
    };

    return (
        <div
            className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
                openEditMockPricingModal ? "block" : "hidden"
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
                                    Edit Mock Pricing
                                </h1>
                            </div>

                            <form
                                onSubmit={handleSubmit(handleEditSubmit)}
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
                                            <option value={editData?.grade}>
                                                {editData?.grade}
                                            </option>
                                            {gradeData
                                                ?.filter(
                                                    (grade) =>
                                                        grade?.className !==
                                                        editData?.grade
                                                )
                                                ?.map((grade, idx) => (
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
                                        <option value={editData?.mainSubject}>
                                            {editData?.mainSubject}
                                        </option>
                                        {mainSubjects
                                            ?.filter(
                                                (mainSubject) =>
                                                    mainSubject?.name !==
                                                    editData?.mainSubject
                                            )
                                            ?.map((mainSubject, idx) => (
                                                <option
                                                    key={idx}
                                                    value={mainSubject?.name}
                                                >
                                                    {mainSubject?.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                {selectedSubSubjects?.length ? (
                                    <div>
                                        <label
                                            htmlFor="subSubject"
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
                                            {editData?.subSubject ? (
                                                <option
                                                    value={editData?.subSubject}
                                                >
                                                    {editData?.subSubject}
                                                </option>
                                            ) : (
                                                <option value={""}>
                                                    Please select sub subject
                                                </option>
                                            )}

                                            {selectedSubSubjects
                                                ?.filter(
                                                    (mainSubject) =>
                                                        mainSubject?.subSubject !==
                                                        editData?.subSubject
                                                )
                                                ?.map((subSubject, idx) => (
                                                    <option
                                                        key={idx}
                                                        value={
                                                            subSubject?.subSubject
                                                        }
                                                    >
                                                        {subSubject?.subSubject}
                                                    </option>
                                                ))}
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

export default EditMockPricingModal;
