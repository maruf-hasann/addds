import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

import moment from "moment";
import { educationVariants } from "../../../data/educationVariant";
import { tutorInfos } from "../../../data/tutorInfo";

const AllTutoringInfo = () => {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold">All Tutoring Info</h1>
        <Link
          to={"/dashboard/add-tutoring-Info"}
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-sky-700"
        >
          Add New
        </Link>
      </div>
      <div className="overflow-x-auto max-w-5xl">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Sl</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Type</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Class</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Subject</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Meet Link</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Interview Time</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Emergency Contact Number</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Home Address</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap w-[120px] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {tutorInfos.map((info, idx) => {
              const classes = "p-4 border-b border-blue-gray-50";
              return (
                <tr key={info.id}>
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
