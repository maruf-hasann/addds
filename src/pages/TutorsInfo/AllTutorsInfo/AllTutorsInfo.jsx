import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

import moment from "moment";
import { educationVariants } from "../../../data/educationVariant";
import { tutorInfos } from "../../../data/tutorInfo";

const AllTutoringInfo = () => {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center pb-3">
        <h1 className="font-bold text-gray-800">All Tutoring Info</h1>
        <Link
          to={"/add-tutor-info"}
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-sky-700 bg-white"
        >
          Add New
        </Link>
      </div>
      <div className="overflow-x-auto w-full bg-white rounded">
        <table className="w-full min-w-max table-auto text-left overflow-x-auto">
          {/* head */}
          <thead>
            <tr>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center">Sl</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center">Type</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center">Class</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center">Subject</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center">Meet Link</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center">Interview Time</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center">Emergency Contact Number</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center">Home Address</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {tutorInfos.map((info, idx) => {
              const classes = "p-4 border-b border-blue-gray-50 text-base text-gray-800 font-normal";
              return (
                <tr key={info.id} className={` text-center ${idx % 2 !== 0 && 'bg-gray-50'}`}>
                  <th className={classes}>{idx + 1}</th>
                  <td className={classes}>
                    {
                      educationVariants.find(
                        (variant) => variant.id === Number(info.tutoringType)
                      )?.name
                    }
                  </td>
                  <td className={classes}>{info.tutoringClass}</td>
                  <td className={classes}>{info.tutoringSubject}</td>
                  <td className={classes}>{info.meetLink}</td>
                  <td className={classes}>
                    {moment(info.interviewTime).format("DD MMM YYYY hh:mm A")}
                  </td>
                  <td className={classes}>{info.emergencyContactNumber}</td>
                  <td className={classes}>{info.homeAddress}</td>
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

export default AllTutoringInfo;
