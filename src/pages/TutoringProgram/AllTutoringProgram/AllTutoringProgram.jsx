import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import DeleteTutoringProgramModal from "./DeleteTutoringProgram/DeleteTutoringProgramModal";
import EditTutoringProgramModal from "./EditTutoringProgram/EditTutoringProgram";
import { useGetTutoringProgramsQuery } from "../../../store/service/tutoringProgram/tutoringProgramApiService";
import AddTutoringProgramModal from "./AddTutoringProgramModal/AddTutoringProgramModal";

const AllTutoringProgram = () => {
  const [openTutoringProgramModal, setOpenTutoringProgramModal] =
    useState(false);

  const [deleteTutoringProgramData, setDeleteTutoringProgramData] =
    useState(null);
  const [openDeleteTutoringProgramModal, setOpenDeleteTutoringProgramModal] =
    useState(false);

  const [editTutoringProgramData, setEditTutoringProgramData] = useState(null);
  const [openEditTutoringProgramModal, setOpenEditTutoringProgramModal] =
    useState(false);

  const { data: tutoringProgramsData } = useGetTutoringProgramsQuery();
  const tutoringPrograms = tutoringProgramsData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-2xl text-white">
            All Tutoring Program
          </h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenTutoringProgramModal(true)}
          >
            Add New
          </div>
        </div>
        <div className="overflow-x-auto border-x rounded bg-white">
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
              {tutoringPrograms?.map((program, idx) => {
                const classes =
                  "p-4 text-base text-gray-800 font-normal border-b";
                return (
                  <tr key={program._id} className={` hover:bg-blue-50`}>
                    <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                    <td className={classes}>{program?.programName}</td>
                    <td className={`${classes} w-[120px]`}>
                      <div className="flex justify-evenly items-center">
                        <FaTrash
                          onClick={() => {
                            setDeleteTutoringProgramData(program),
                              setOpenDeleteTutoringProgramModal(true);
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />{" "}
                        <FaEdit
                          onClick={() => {
                            setEditTutoringProgramData(program),
                              setOpenEditTutoringProgramModal(true);
                          }}
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
      {openDeleteTutoringProgramModal && deleteTutoringProgramData && (
        <DeleteTutoringProgramModal
          deleteTutoringProgramData={deleteTutoringProgramData}
          openDeleteTutoringProgramModal={openDeleteTutoringProgramModal}
          setDeleteTutoringProgramData={setDeleteTutoringProgramData}
          setOpenDeleteTutoringProgramModal={setOpenDeleteTutoringProgramModal}
        />
      )}
      {openEditTutoringProgramModal && editTutoringProgramData && (
        <EditTutoringProgramModal
          editTutoringProgramData={editTutoringProgramData}
          openEditTutoringProgramModal={openEditTutoringProgramModal}
          setEditTutoringProgramData={setOpenEditTutoringProgramModal}
          setOpenEditTutoringProgramModal={setOpenEditTutoringProgramModal}
        />
      )}
      {openTutoringProgramModal && (
        <AddTutoringProgramModal
          openAddTutoringProgramModal={openTutoringProgramModal}
          setOpenAddTutoringProgramModal={setOpenTutoringProgramModal}
        />
      )}
    </>
  );
};

export default AllTutoringProgram;
