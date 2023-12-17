import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGetSemestersQuery } from "../../../store/service/semester/semesterApiService";
import DeleteSemesterModal from "./DeleteSemester/DeleteSemesterModal";
import AddSemesterModal from "./AddSemesterModal/AddSemesterModal";

const AllSemester = () => {
  const [openSemesterModal, setOpenSemesterModal] = useState(false);

  const [deleteSemesterData, setDeleteSemesterData] = useState(null);
  const [openDeleteSemesterModal, setOpenDeleteSemesterModal] = useState(false);

  const { data: semestersData } = useGetSemestersQuery();
  const semesters = semestersData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-2xl text-white">All Semesters</h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenSemesterModal(true)}
          >
            Add New
          </div>
        </div>
        <div className="overflow-x-auto border-x rounded  bg-white">
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
                <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {semesters?.map((variant, idx) => {
                const classes =
                  "p-4 text-base text-gray-800 font-normal border-b";
                return (
                  <tr key={variant._id} className={` hover:bg-blue-50`}>
                    <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                    <td className={classes}>{variant?.value}</td>
                    <td className={`${classes} w-[120px]`}>
                      <div className="flex justify-evenly items-center">
                        <FaTrash
                          onClick={() => {
                            setDeleteSemesterData(variant),
                              setOpenDeleteSemesterModal(true);
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />{" "}
                        <FaEdit
                          onClick={() =>
                            toast.success("Semester updated successfully")
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
      {openDeleteSemesterModal && deleteSemesterData && (
        <DeleteSemesterModal
          deleteSemesterData={deleteSemesterData}
          openDeleteSemesterModal={openDeleteSemesterModal}
          setDeleteSemesterData={setDeleteSemesterData}
          setOpenDeleteSemesterModal={setOpenDeleteSemesterModal}
        />
      )}
      {openSemesterModal && (
        <AddSemesterModal
          openAddSemesterModal={openSemesterModal}
          setOpenAddSemesterModal={setOpenSemesterModal}
        />
      )}
    </>
  );
};

export default AllSemester;
