import { FaEdit, FaTrash } from "react-icons/fa";

import { useState } from "react";
import { useGetExtraSubjectsQuery } from "../../../store/service/extraSubject/extraSubjectApiService";
import EditExtraSubjectModal from "./EditExtraSubject/EditExtraSubject";
import DeleteExtraSubjectModal from "./DeleteExtraSubject/DeleteExtraSubjectModal";
import AddExtraSubjectModal from "./AddExtraSubjectModal/AddExtraSubjectModal";

const AllExtraSubject = () => {
  const [openAddExtraSubjectModal, setOpenAddExtraSubjectModal] =
    useState(false);

  const [deleteExtraSubjectData, setDeleteExtraSubjectData] = useState(null);
  const [openDeleteExtraSubjectModal, setOpenDeleteExtraSubjectModal] =
    useState(false);

  const [editExtraSubjectData, setEditExtraSubjectData] = useState(null);
  const [openEditExtraSubjectModal, setOpenEditExtraSubjectModal] =
    useState(false);

  const { data: extraSubjectsData } = useGetExtraSubjectsQuery();
  const extraSubjects = extraSubjectsData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-2xl text-white">All Extra Subjects</h1>
          <div
            // to={"/add-extra-subject"}
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer cursor-pointer"
            onClick={() => setOpenAddExtraSubjectModal(true)}
          >
            Add New
          </div>
        </div>
        <div className="overflow-x-auto border-x rounded bg-white">
          <table className="w-full min-w-max table-auto text-left border">
            {/* head */}
            <thead>
              <tr>
                <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                  Sl
                </th>
                <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                  Type
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
              {extraSubjects?.map((subject, idx) => {
                const classes =
                  "p-4 text-base text-gray-800 font-normal border-b";
                return (
                  <tr key={subject._id} className={` hover:bg-blue-50`}>
                    <th className={classes}>{idx + 1}</th>
                    <td className={classes}>{subject?.type}</td>
                    <td className={classes}>{subject?.subject}</td>
                    <td className={`${classes} w-[120px]`}>
                      <div className="flex justify-evenly items-center">
                        <FaTrash
                          onClick={() => {
                            setDeleteExtraSubjectData(subject),
                              setOpenDeleteExtraSubjectModal(true);
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />{" "}
                        <FaEdit
                          onClick={() => {
                            setEditExtraSubjectData(subject),
                              setOpenEditExtraSubjectModal(true);
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
      {openDeleteExtraSubjectModal && deleteExtraSubjectData && (
        <DeleteExtraSubjectModal
          deleteExtraSubjectData={deleteExtraSubjectData}
          openDeleteExtraSubjectModal={openDeleteExtraSubjectModal}
          setDeleteExtraSubjectData={setDeleteExtraSubjectData}
          setOpenDeleteExtraSubjectModal={setOpenDeleteExtraSubjectModal}
        />
      )}
      {openEditExtraSubjectModal && editExtraSubjectData && (
        <EditExtraSubjectModal
          editExtraSubjectData={editExtraSubjectData}
          openEditExtraSubjectModal={openEditExtraSubjectModal}
          setEditExtraSubjectData={setOpenEditExtraSubjectModal}
          setOpenEditExtraSubjectModal={setOpenEditExtraSubjectModal}
        />
      )}
      {openAddExtraSubjectModal && (
        <AddExtraSubjectModal
          openAddExtraSubjectModal={openAddExtraSubjectModal}
          setOpenAddExtraSubjectModal={setOpenAddExtraSubjectModal}
        />
      )}
    </>
  );
};

export default AllExtraSubject;
