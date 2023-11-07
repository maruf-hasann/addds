import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAddExtraSubjectMutation } from "../../../store/service/extraSubject/extraSubjectApiService";

const AddExtraSubject = () => {
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

  return (
    <div className="py-10">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold">Add Extra Subject</h1>
        <Link
          to={"/dashboard/all-extra-subjects"}
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-sky-700"
        >
          See All
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 border rounded-md mt-5"
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
              className="w-full p-2 mb-4 border rounded-md"
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
              className="w-full p-2 mb-4 border rounded-md"
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
  );
};

export default AddExtraSubject;
