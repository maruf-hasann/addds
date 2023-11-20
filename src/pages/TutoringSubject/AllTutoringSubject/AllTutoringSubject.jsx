import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { educationVariants } from "../../../data/educationVariant";
import { tutoringSubjects } from "../../../data/tutoringSubjects";
import AddTutoringSubjectModal from "./AddTutoringSubjectModal/AddTutoringSubjectModal";

const AllTutoringSubject = () => {
  const [openTutoringSubjectModal, setOpenTutoringSubjectModal] = useState(false);

  return (
    <div className="py-10">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold">All Tutoring Subject</h1>
        <div
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenTutoringSubjectModal(true)}
        >
          Add New
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          {/* head */}
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Sl
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Name
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Variant
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {tutoringSubjects.map((subject, idx) => {
              const classes = "p-4 border-b border-blue-gray-50";
              return (
                <tr className={classes} key={subject.id}>
                  <th className={classes}>{idx + 1}</th>
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
