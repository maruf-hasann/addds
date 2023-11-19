import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { educationVariants } from "../../../data/educationVariant";

const AllEducationVariant = () => {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center pb-3">
        <h1 className="font-bold text-gray-800">All Education Variant</h1>
        <Link
          to={"/add-education-variant"}
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 bg-white"
        >
          Add New
        </Link>
      </div>
      <div className="overflow-x-auto border-x rounded  bg-white">
        <table className="w-full min-w-max table-auto text-left">
          {/* head */}
          <thead>
            <tr>
              <th className=" text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold">
                Sl
              </th>
              <th className=" text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold">
                Name
              </th>
              <th className=" text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold w-[120px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {educationVariants.map((variant, idx) => {
              const classes = "p-4 border-b border-blue-gray-50 text-base text-gray-800 font-normal";
              return (
                <tr key={variant.id} className={` ${idx % 2 !== 0 && 'bg-gray-50'}`}>
                  <th className={classes}>{idx + 1}</th>
                  <td className={classes}>{variant.name}</td>
                  <td className={`${classes} w-[120px]`}>
                    <div className="flex justify-evenly items-center">
                      <FaTrash
                        onClick={() =>
                          toast.success(
                            "Education variant deleted successfully"
                          )
                        }
                        className="cursor-pointer hover:text-red-500"
                      />{" "}
                      <FaEdit
                        onClick={() =>
                          toast.success(
                            "Education variant updated successfully"
                          )
                        }
                        className="cursor-pointer hover:text-blue-500"
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

export default AllEducationVariant;
