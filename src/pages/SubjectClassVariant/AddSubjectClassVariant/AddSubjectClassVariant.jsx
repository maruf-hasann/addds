import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAddSubjectClassVariantMutation } from "../../../store/service/subjectClassVariant/subjectClassVariantApiService";

const AddSubjectClassVariant = () => {
  /* redux api call */
  const [addSubjectClassVariant, { isLoading }] =
    useAddSubjectClassVariantMutation();

  /* handle submit  */
  const handleSubmit = async (e) => {
    const variantName = e.target.name.value;
    const result = await addSubjectClassVariant({ variantName });
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      e.target.reset();
    } else {
      toast.error(result?.error?.data?.message);
    }
  };

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          Add Subject Class Variant
        </h1>
        <Link
          to={"/all-tutoring-variants"}
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
        >
          See All
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white"
      >
        <label
          htmlFor="name"
          className="block mb-2 font-semibold text-sm text-gray-500"
        >
          Subject Class Variant Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Trainer"
          className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
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
  );
};

export default AddSubjectClassVariant;
