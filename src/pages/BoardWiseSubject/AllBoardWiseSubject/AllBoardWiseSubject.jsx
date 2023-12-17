import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import { useState } from "react";
import { useGetSubjectsQuery } from "../../../store/service/boardWiseSubject/boardWiseSubjectApiService";
import DeleteBoardWiseSubjectModal from "./DeleteBoardWiseSubject/DeleteBoardWiseSubjectModal";
import EditBoardWiseSubjectModal from "./EditBoardWiseSubject/EditBoardWiseSubject";
import AddBoardWiseSubjectModal from "./AddBoardWiseSubjectModal/AddBoardWiseSubjectModal";

const AllBoardWiseSubject = () => {
  const [openAddBoardWiseSubjectModal, setOpenAddBoardWiseSubjectModal] =
    useState(false);
  const [deleteBoardWiseSubjectData, setDeleteBoardWiseSubjectData] =
    useState(null);
  const [openDeleteBoardWiseSubjectModal, setOpenDeleteBoardWiseSubjectModal] =
    useState(false);
  const [editBoardWiseSubjectData, setEditBoardWiseSubjectData] =
    useState(null);
  const [openEditBoardWiseSubjectModal, setOpenEditBoardWiseSubjectModal] =
    useState(false);

  const { data: boardWiseSubjectsData } = useGetSubjectsQuery();
  const boardWiseSubjects = boardWiseSubjectsData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-2xl text-white">All Subjects</h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenAddBoardWiseSubjectModal(true)}
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
                  Board
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
              {boardWiseSubjects?.map((subject, idx) => {
                const classes =
                  "p-4 text-base text-gray-800 font-normal border-b";
                return (
                  <tr key={subject._id} className={` hover:bg-blue-50`}>
                    <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                    <td className={classes}>{subject?.board}</td>
                    <td className={classes}>{subject?.type}</td>
                    <td className={classes}>{subject?.subject}</td>
                    <td className={`${classes} w-[120px]`}>
                      <div className="flex justify-evenly items-center">
                        <FaTrash
                          onClick={() => {
                            setDeleteBoardWiseSubjectData(subject),
                              setOpenDeleteBoardWiseSubjectModal(true);
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />{" "}
                        <FaEdit
                          onClick={() => {
                            setEditBoardWiseSubjectData(subject),
                              setOpenEditBoardWiseSubjectModal(true);
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
      {openDeleteBoardWiseSubjectModal && deleteBoardWiseSubjectData && (
        <DeleteBoardWiseSubjectModal
          deleteBoardWiseSubjectData={deleteBoardWiseSubjectData}
          openDeleteBoardWiseSubjectModal={openDeleteBoardWiseSubjectModal}
          setDeleteBoardWiseSubjectData={setDeleteBoardWiseSubjectData}
          setOpenDeleteBoardWiseSubjectModal={
            setOpenDeleteBoardWiseSubjectModal
          }
        />
      )}
      {openEditBoardWiseSubjectModal && editBoardWiseSubjectData && (
        <EditBoardWiseSubjectModal
          editBoardWiseSubjectData={editBoardWiseSubjectData}
          openEditBoardWiseSubjectModal={openEditBoardWiseSubjectModal}
          setEditBoardWiseSubjectData={setOpenEditBoardWiseSubjectModal}
          setOpenEditBoardWiseSubjectModal={setOpenEditBoardWiseSubjectModal}
        />
      )}
      {openAddBoardWiseSubjectModal && (
        <AddBoardWiseSubjectModal
          openAddBoardWiseSubjectModal={openAddBoardWiseSubjectModal}
          setOpenAddBoardWiseSubjectModal={setOpenAddBoardWiseSubjectModal}
        />
      )}
    </>
  );
};

export default AllBoardWiseSubject;
