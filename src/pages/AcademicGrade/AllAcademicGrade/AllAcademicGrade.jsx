import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

import { educationVariants } from "../../../../data/educationVariant";
import { academicGrades } from "../../../../data/academicGrades";

const AllAcademicGrade = () => {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold">All Academic Grade</h1>
        <Link
          to={"/dashboard/add-academic-grade"}
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-sky-700"
        >
          Add New
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>

              <th>Variant</th>
              <th className="w-[120px] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {academicGrades.map((grade, idx) => (
              <tr key={grade.id} className="hover">
                <th>{idx + 1}</th>
                <td>{grade.name}</td>
                <td>
                  {
                    educationVariants.find(
                      (variant) => variant.id === grade.mediumId
                    ).name
                  }
                </td>
                <td className="w-[120px] flex justify-evenly items-center">
                  <FaTrash
                    onClick={() =>
                      toast.success("Academic Grade deleted successfully")
                    }
                    className="cursor-pointer hover:text-red-500"
                  />{" "}
                  <FaEdit
                    onClick={() =>
                      toast.success("Academic Grade updated successfully")
                    }
                    className="cursor-pointer hover:text-sky-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAcademicGrade;
