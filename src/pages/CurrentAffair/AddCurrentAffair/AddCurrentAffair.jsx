import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAddCurrentAffairMutation } from "../../../store/service/currentAffair/currentAffairApiService";




const AddCurrentAffair = () => {
  const [addCurrentAffair, { isLoading }] = useAddCurrentAffairMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const affair = e.target.affair.value;
    const result = await addCurrentAffair({ affair });
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
        <h1 className="font-bold">Add Current Affair</h1>
        <Link
          to={"/dashboard/all-current-affairs"}
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-sky-700"
        >
          See All
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 border rounded-md mt-5"
      >
        <label
          htmlFor="name"
          className="block mb-2 font-semibold text-sm text-gray-500"
        >
          Name
        </label>
        <input
          type="text"
          id="affair"
          name="affair"
          required
          placeholder="affair"
          className="w-full p-2 mb-4 border rounded-md"
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

export default AddCurrentAffair;
