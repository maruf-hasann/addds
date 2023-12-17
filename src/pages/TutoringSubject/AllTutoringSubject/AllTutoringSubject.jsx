import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { educationVariants } from "../../../data/educationVariant";
import { tutoringSubjects } from "../../../data/tutoringSubjects";
import AddTutoringSubjectModal from "./AddTutoringSubjectModal/AddTutoringSubjectModal";

const AllTutoringSubject = () => {
  const [openTutoringSubjectModal, setOpenTutoringSubjectModal] =
    useState(false);

  return (
    <div className="py-10">
      <div className="flex justify-between items-center pb-3">
        <h1 className="font-bold text-2xl text-white">All Tutoring Subject</h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenTutoringSubjectModal(true)}
        >
          Add New
        </div>
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
            {tutoringSubjects.map((subject, idx) => {
              const classes =
                "p-4 text-base text-gray-800 font-normal border-b";
              return (
                <tr key={subject.id} className={` hover:bg-blue-50`}>
                  <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                  <td className={classes}>{subject.name}</td>
                  <td className={classes}>
                    {
                      educationVariants.find(
                        (variant) => variant.id === subject.mediumId
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
      {openTutoringSubjectModal && (
        <AddTutoringSubjectModal
          openAddTutoringSubjectModal={openTutoringSubjectModal}
          setOpenAddTutoringSubjectModal={setOpenTutoringSubjectModal}
        />
      )}
    </div>
  );
};

export default AllTutoringSubject;
