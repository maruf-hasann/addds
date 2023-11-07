import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import { useState } from "react";
import { useGetSubjectsQuery } from "../../../store/service/boardWiseSubject/boardWiseSubjectApiService";
import DeleteBoardWiseSubjectModal from "./DeleteBoardWiseSubject/DeleteBoardWiseSubjectModal";
import EditBoardWiseSubjectModal from "./EditBoardWiseSubject/EditBoardWiseSubject";

const AllBoardWiseSubject = () => {
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
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="font-bold">All Tutoring Variant</h1>
          <Link
            to={"/dashboard/add-tutoring-variant"}
            className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-sky-700"
          >
            Add New
          </Link>
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
                  Board
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  Type
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  Name
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {boardWiseSubjects?.map((subject, idx) => {
                const classes = "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={subject._id} className="hover">
                    <th className={classes}>{idx + 1}</th>
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
    </>
  );
};

export default AllBoardWiseSubject;
