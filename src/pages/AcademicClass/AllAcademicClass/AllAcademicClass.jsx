import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

import { educationVariants } from "../../../../data/educationVariant";
import { classes } from "../../../../data/academicClasses";
import { schools } from "../../../../data/school";

const AllAcademicClass = () => {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold">All Academic Class</h1>
        <Link
          to={"/dashboard/add-academic-class"}
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
              <th>School</th>
              <th>Variant</th>
              <th className="w-[120px] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {classes.map((cls, idx) => (
              <tr key={cls.id} className="hover">
                <th>{idx + 1}</th>
                <td>{cls.name}</td>
                <td>
                  {schools.find((school) => school.id === cls.schoolId).name}
                </td>
                <td>
                  {
                    educationVariants.find(
                      (variant) => variant.id === cls.mediumId
                    ).name
                  }
                </td>
                <td className="w-[120px] flex justify-evenly items-center">
                  <FaTrash
                    onClick={() =>
                      toast.success("Academic Class deleted successfully")
                    }
                    className="cursor-pointer hover:text-red-500"
                  />{" "}
                  <FaEdit
                    onClick={() =>
                      toast.success("AcademicClass updated successfully")
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

export default AllAcademicClass;
