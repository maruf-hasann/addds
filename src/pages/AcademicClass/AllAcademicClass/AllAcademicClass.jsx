import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { classes } from "../../../data/academicClasses";
import { educationVariants } from "../../../data/educationVariant";
import { schools } from "../../../data/school";

const AllAcademicClass = () => {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center pb-3">
        <h1 className="font-bold text-gray-800">All Academic Class</h1>
        <Link
          to={"/add-academic-class"}
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-sky-700 bg-white"
        >
          Add New
        </Link>
      </div>
      <div className="overflow-x-auto border-x rounded bg-white">
        <table className="w-full min-w-max table-auto text-left">
          {/* head */}
          <thead>
            <tr>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center py-5">Sl</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center py-5">Name</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center py-5">School</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center py-5">Variant</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap w-[120px] text-center py-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {classes.map((cls, idx) => {
              const classes = "p-4 py-5 border-b border-blue-gray-50 text-base text-gray-800 font-normal";
              return (
                <tr key={cls.id} className={` text-center ${idx % 2 !== 0 && 'bg-gray-50'}`}>
                  <td className={`${classes} `}>{idx + 1}</td>
                  <td className={`${classes} `}>{cls.name}</td>
                  <td className={`${classes} `}>
                    {schools.find((school) => school.id === cls.schoolId).name}
                  </td>
                  <td className={`${classes} `}>
                    {
                      educationVariants.find(
                        (variant) => variant.id === cls.mediumId
                      ).name
                    }
                  </td>
                  <td className={`${classes} w-[120px]`}>
                    <div className="flex justify-evenly items-center">
                      <FaTrash
                        onClick={() =>
                          toast.success("College deleted successfully")
                        }
                        className="cursor-pointer hover:text-red-500"
                      />{" "}
                      <FaEdit
                        onClick={() =>
                          toast.success("College updated successfully")
                        }
                        className="cursor-pointer hover:text-sky-500"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAcademicClass;
