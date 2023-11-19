import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

import moment from "moment";
import { educationVariants } from "../../../data/educationVariant";
import { tutorInfos } from "../../../data/tutorInfo";
import { useState } from "react";
import AllTutorInfoModal from "./AllTutorInfoModal/AllTutorInfoModal";

const AllTutoringInfo = () => {
  const [viewTutorInfo, setViewTutorInfo] = useState(null);
  const [openTutorInfoModal, setOpenTutorInfoModal] = useState(false);

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
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center py-8">Sl</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center py-8">Type</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center py-8">Class</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center py-8">Subject</th>
              <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold whitespace-nowrap text-center py-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {tutorInfos.map((info, idx) => {
              const classes = "p-4 py-8 border-b border-blue-gray-50 text-base text-gray-800 font-normal";
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
                  <td className={`${classes} w-[120px]`}>
                    <div className="flex justify-evenly items-center">
                      <FaEye
                        title="All Info"
                        onClick={() => {
                          setOpenTutorInfoModal(true),
                            setViewTutorInfo(info);
                        }}
                        className="cursor-pointer"
                      />{" "}
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
      {openTutorInfoModal && viewTutorInfo && (
        <AllTutorInfoModal
          viewTutorInfo={viewTutorInfo}
          openTutorInfoModal={openTutorInfoModal}
          setViewTutorInfo={setViewTutorInfo}
          setOpenTutorInfoModal={setOpenTutorInfoModal}
        />
      )}
    </div>
  );
};

export default AllTutoringInfo;
