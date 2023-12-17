import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import AddMainSubjectModal from "./AddMainSubjectModal/AddMainSubjectModal";
import {
  useDeleteMainSubjectMutation,
  useGetMainSubjectQuery,
} from "../../../store/service/mainSubject/mainSubjectApiService";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import EditMainSubjectModal from "./EditMainSubjectModal/EditMainSubjectModal";

const AllMainSubject = () => {
  /* for delete state */
  const [openMainSubjectModal, setOpenMainSubjectModal] = useState(false);
  const [deleteMainSubjectData, setDeleteMainSubjectData] = useState(null);
  const [openDeleteMainSubjectModal, setOpenDeleteMainSubjectModal] =
    useState(false);

  /* Edit state */
  const [editMainSubjectData, setEditMainSubjectData] = useState(null);
  const [openEditMainSubjectModal, setOpenEditMainSubjectModal] =
    useState(false);

  /* redux api call */
  const [deleteMainSubject] = useDeleteMainSubjectMutation();
  const { data: allMainSubjectData } = useGetMainSubjectQuery();
  const allMainSubject = allMainSubjectData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center pb-3">
        <h1 className="font-bold text-2xl text-white">All Main Subject</h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenMainSubjectModal(true)}
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
                Subject Variant
              </th>

              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allMainSubject?.map((mainSubject, idx) => {
              const classes =
                "p-4 text-base text-gray-800 font-normal border-b";
              return (
                <tr className={`hover:bg-blue-50`} key={mainSubject?._id}>
                  <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                  <td className={classes}>{mainSubject?.name}</td>
                  <td className={classes}>{mainSubject?.subjectVariant}</td>
                  <td className={`${classes} w-[120px] flex gap-3`}>
                    <span className="flex justify-evenly items-center">
                      <FaEdit
                        onClick={() => {
                          setEditMainSubjectData(mainSubject),
                            setOpenEditMainSubjectModal(true);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />{" "}
                    </span>
                    <span className="flex justify-evenly items-center">
                      <FaTrash
                        onClick={() => {
                          setDeleteMainSubjectData(mainSubject),
                            setOpenDeleteMainSubjectModal(true);
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

      {/* Open Add Main Subject Modal  */}
      {openMainSubjectModal && (
        <AddMainSubjectModal
          openAddMainSubjectModal={openMainSubjectModal}
          setOpenAddMainSubjectModal={setOpenMainSubjectModal}
        />
      )}

      {/* Open Edit Main Subject Modal  */}
      {openEditMainSubjectModal && (
        <EditMainSubjectModal
          editData={editMainSubjectData}
          openEditMainSubjectModal={openEditMainSubjectModal}
          setOpenEditMainSubjectModal={setOpenEditMainSubjectModal}
        />
      )}

      {/* Open Delete Main Subject Modal  */}
      {openDeleteMainSubjectModal && (
        <DeleteModal
          id={deleteMainSubjectData?._id}
          name={deleteMainSubjectData?.name}
          setDeleteData={setDeleteMainSubjectData}
          openDeleteModal={openDeleteMainSubjectModal}
          setOpenDeleteModal={setOpenDeleteMainSubjectModal}
          deleteFunction={deleteMainSubject}
        />
      )}
    </div>
  );
};

export default AllMainSubject;
