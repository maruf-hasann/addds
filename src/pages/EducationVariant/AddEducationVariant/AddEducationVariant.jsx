import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddEducationVariant = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
  };

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
        setName("");
        toast.success("Education variant added successfully");
      }, 2000);
    }
  }, [isLoading]);

  return (
    <div className="py-10">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold">Add Education Variant</h1>
        <Link
          to={"/all-education-variants"}
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-sky-700"
        >
          See All
        </Link>
      </div>
      <form className="max-w-md mx-auto p-4 border rounded-md mt-5">
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
          placeholder="English Medium"
          className="w-full p-2 mb-4 border rounded-md"
        />
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
  );
};

export default AddEducationVariant;
