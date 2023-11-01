import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { schools } from "../../../data/school";
import { Button } from "@material-tailwind/react";
import { educationVariants } from "../../../data/educationVariant";

const AddAcademicClass = () => {
  const [name, setName] = useState("");
  const [educationVariant, setEducationVariant] = useState("");
  const [school, setSchool] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !school || !educationVariant) {
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
        setSchool("");
        setEducationVariant("");
        toast.success("AcademicClass added successfully");
      }, 2000);
    }
  }, [isLoading]);

  const classes = "p-4 border-b border-blue-gray-50";

  return (
    <div className="py-10">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold">Add AcademicClass</h1>
        <Link
          to={"/dashboard/all-academic-class"}
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-sky-700"
        >
          See All
        </Link>
      </div>
      <form className="max-w-md mx-auto p-4 border rounded-md mt-5">
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
            placeholder="Academic Class Name"
            className="w-full p-2 mb-4 border rounded-md"
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
            className="w-full p-2 mb-4 border rounded-md"
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
        <div>
          <label
            htmlFor="school"
            className="block mb-2 font-semibold text-sm text-gray-500"
          >
            School
          </label>
          <select
            type="text"
            id="school"
            name="school"
            onChange={(e) => setSchool(e.target.value)}
            required
            defaultValue={""}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="" disabled>
              Select School
            </option>
            {schools
              .filter((school) => school.mediumId === Number(educationVariant))
              .map((school, idx) => (
                <option key={idx} value={school.id}>
                  {school.name}
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
      {name || educationVariant || school ? (
        <div className="my-5">
          <div className="flex justify-between items-center border-b pb-3">
            <h1 className="font-bold">End View</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left">
              {/* head */}
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Name</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Variant</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">School</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover">
                  <td className={classes}>{name}</td>
                  <td className={classes}>
                    {
                      educationVariants.find(
                        (variant) => variant.id === Number(educationVariant)
                      )?.name
                    }
                  </td>
                  <td className={classes}>
                    {schools.find((scl) => scl.id === Number(school))?.name}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddAcademicClass;