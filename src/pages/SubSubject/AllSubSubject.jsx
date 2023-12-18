import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useDeleteSubSubjectMutation,
  useGetSubSubjectQuery,
} from "../../store/service/subSubject/subSubjectApiService";
import AddSubSubjectModal from "./AddSubSubjectModal/AddSubSubjectModal";
import EditSubSubjectModal from "./EditSubSubjectModal/EditSubSubjectModal";
import DeleteModal from "../../components/Shared/DeleteModal/DeleteModal";

const AllSubSubject = () => {
  const [openSubSubjectModal, setOpenSubSubjectModal] = useState(false);
  const [deleteSubSubjectData, setDeleteSubSubjectData] = useState(null);
  const [openDeleteSubSubjectModal, setOpenDeleteSubSubjectModal] =
    useState(false);

  /* Edit State */
  const [editSubSubjectData, setEditSubSubjectData] = useState(null);
  const [openEditSubSubjectModal, setOpenEditSubSubjectModal] = useState(false);

  const [deleteSubSubject] = useDeleteSubSubjectMutation();

  const { data: allSubSubjectData } = useGetSubSubjectQuery();
  const allSubSubject = allSubSubjectData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center pb-3">
        <h1 className="font-bold text-2xl text-white">All Sub Subject</h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenSubSubjectModal(true)}
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
                Main Subject
              </th>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Sub Subject
              </th>

              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allSubSubject?.map((subSubject, idx) => {
              const classes =
                "p-4 text-base text-gray-800 font-normal border-b";
              return (
                <tr className={`hover:bg-blue-50`} key={subSubject?._id}>
                  <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                  <td className={classes}>{subSubject?.mainSubject}</td>
                  <td className={classes}>{subSubject?.subSubject}</td>
                  <td className={`${classes} w-[120px] flex gap-3`}>
                    <span className="flex justify-evenly items-center">
                      <FaEdit
                        onClick={() => {
                          setEditSubSubjectData(subSubject),
                            setOpenEditSubSubjectModal(true);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />{" "}
                    </span>
                    <span className="flex justify-evenly items-center">
                      <FaTrash
                        onClick={() => {
                          setDeleteSubSubjectData(subSubject),
                            setOpenDeleteSubSubjectModal(true);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />{" "}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {openSubSubjectModal && (
        <AddSubSubjectModal
          openAddSubSubjectModal={openSubSubjectModal}
          setOpenAddSubSubjectModal={setOpenSubSubjectModal}
        />
      )}

      {/* Open Edit Subject Variant Modal  */}
      {openEditSubSubjectModal && (
        <EditSubSubjectModal
          editData={editSubSubjectData}
          openEditSubSubjectModal={openEditSubSubjectModal}
          setOpenEditSubSubject={setOpenEditSubSubjectModal}
        />
      )}

      {openDeleteSubSubjectModal && (
        <DeleteModal
          id={deleteSubSubjectData?._id}
          name={deleteSubSubjectData?.subSubject}
          setDeleteData={setDeleteSubSubjectData}
          openDeleteModal={openDeleteSubSubjectModal}
          setOpenDeleteModal={setOpenDeleteSubSubjectModal}
          deleteFunction={deleteSubSubject}
        />
      )}
    </div>
  );
};

export default AllSubSubject;
