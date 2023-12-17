import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { academicGrades } from "../../../data/academicGrades";
import { educationVariants } from "../../../data/educationVariant";

const AllAcademicGrade = () => {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center pb-3">
        <h1 className="font-bold text-2xl text-white">All Academic Grade</h1>
        <Link
          to={"/add-academic-grade"}
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
        >
          Add New
        </Link>
      </div>
      <div className="overflow-x-auto rounded bg-white">
        <table className="w-full min-w-max table-auto text-left border">
          {/* head */}
          <thead>
            <tr>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px]">
                Sl
              </th>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Name
              </th>

              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Variant
              </th>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {academicGrades.map((grade, idx) => {
              const classes =
                "p-4 text-base text-gray-800 font-normal border-b";
              return (
                <tr key={grade.id} className="hover">
                  <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                  <td className={classes}>{grade.name}</td>
                  <td className={classes}>
                    {
                      educationVariants.find(
                        (variant) => variant.id === grade.mediumId
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

export default AllAcademicGrade;
