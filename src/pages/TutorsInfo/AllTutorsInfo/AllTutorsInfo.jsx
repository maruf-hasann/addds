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
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Type</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Meet Link</th>
              <th>Interview Time</th>
              <th>Emergency Contact Number</th>
              <th>Home Address</th>
              <th className="w-[120px] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {tutorInfos.map((info, idx) => (
              <tr key={info.id} className="hover">
                <th>{idx + 1}</th>
                <td>
                  {
                    educationVariants.find(
                      (variant) => variant.id === Number(info.tutoringType)
                    )?.name
                  }
                </td>
                <td>{info.tutoringClass}</td>
                <td>{info.tutoringSubject}</td>
                <td>{info.meetLink}</td>
                <td>
                  {moment(info.interviewTime).format("DD MMM YYYY hh:mm A")}
                </td>
                <td>{info.emergencyContactNumber}</td>
                <td>{info.homeAddress}</td>
                <td className="w-[120px] flex justify-evenly items-center">
                  <FaTrash
                    onClick={() =>
                      toast.success("Tutoring Info deleted successfully")
                    }
                    className="cursor-pointer hover:text-red-500"
                  />{" "}
                  <FaEdit
                    onClick={() =>
                      toast.success("Tutoring Info updated successfully")
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

export default AllTutoringInfo;
