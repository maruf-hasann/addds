import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import DeleteTutoringProgramModal from "./DeleteTutoringProgram/DeleteTutoringProgramModal";
import EditTutoringProgramModal from "./EditTutoringProgram/EditTutoringProgram";
import { useGetTutoringProgramsQuery } from "../../../store/service/tutoringProgram/tutoringProgramApiService";


const AllTutoringProgram = () => {
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
          <h1 className="font-bold text-gray-800">All Tutoring Program</h1>
          <Link
            to={"/add-tutoring-program"}
            className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-sky-800"
          >
            Add New
          </Link>
        </div>
        <div className="overflow-x-auto border-x rounded">
          <table className="w-full min-w-max table-auto text-left">
            {/* head */}
            <thead>
              <tr>
                <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold">
                  Sl
                </th>
                <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold">
                  Name
                </th>
                <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold w-[120px] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {tutoringPrograms?.map((program, idx) => {
                const classes = "p-4 border-b border-blue-gray-50 text-base text-gray-800 font-normal";
                return (
                  <tr key={program._id} className={` ${idx % 2 !== 0 && 'bg-gray-50'}`}>
                    <th className={classes}>{idx + 1}</th>
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
    </>
  );
};

export default AllTutoringProgram;
