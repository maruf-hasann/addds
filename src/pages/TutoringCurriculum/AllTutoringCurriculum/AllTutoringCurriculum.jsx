import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import AddTutoringCurriculumModal from "./AddTutoringCurriculumModal/AddTutoringCurriculumModal";

import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import EditTutoringCurriculumModal from "./EditTutoringCurriculumModal/EditTutoringCurriculumModal";
import {
  useDeleteTutoringCurriculumMutation,
  useGetTutoringCurriculumQuery,
} from "../../../store/service/tutoringCurriculum/tutoringCurriculumApiService";

const AllTutoringCurriculum = () => {
  /* handle delete state handle */
  const [openTutoringCurriculumModal, setOpenTutoringCurriculumModal] =
    useState(false);
  const [deleteTutoringCurriculumData, setDeleteTutoringCurriculumData] =
    useState(null);
  const [
    openDeleteTutoringCurriculumModal,
    setOpenDeleteTutoringCurriculumModal,
  ] = useState(false);

  /* Edit state handle */
  const [editTutoringCurriculumData, setEditTutoringCurriculumData] =
    useState(null);
  const [openEditTutoringCurriculumModal, setOpenEditTutoringCurriculumModal] =
    useState(false);

  /* redux api call */
  const [deleteTutoringCurriculum] = useDeleteTutoringCurriculumMutation();
  const { data: allTutoringCurriculumData } = useGetTutoringCurriculumQuery();
  const allTutoringCurriculum = allTutoringCurriculumData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-2xl text-white">
          All Tutoring Curriculum
        </h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenTutoringCurriculumModal(true)}
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
                Curriculum Name
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
            {allTutoringCurriculum?.map((tutoringCurriculum, idx) => {
              const classes =
                "p-4 text-base text-gray-800 font-normal border-b";
              return (
                <tr
                  className={`hover:bg-blue-50`}
                  key={tutoringCurriculum?._id}
                >
                  <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                  <td className={classes}>
                    {tutoringCurriculum?.curriculumName}
                  </td>
                  <td className={classes}>
                    {tutoringCurriculum?.educationVariant}
                  </td>

                  <td className={`${classes} w-[120px] flex gap-3`}>
                    <span className="flex justify-evenly items-center">
                      <FaEdit
                        onClick={() => {
                          setEditTutoringCurriculumData(tutoringCurriculum),
                            setOpenEditTutoringCurriculumModal(true);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />{" "}
                    </span>
                    <span className="flex justify-evenly items-center">
                      <FaTrash
                        onClick={() => {
                          setDeleteTutoringCurriculumData(tutoringCurriculum),
                            setOpenDeleteTutoringCurriculumModal(true);
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

      {/* open add tutoring curriculum Modal */}
      {openTutoringCurriculumModal && (
        <AddTutoringCurriculumModal
          openAddTutoringCurriculumModal={openTutoringCurriculumModal}
          setOpenAddTutoringCurriculumModal={setOpenTutoringCurriculumModal}
        />
      )}

      {/* open edit tutoring curriculum Modal */}
      {openEditTutoringCurriculumModal && (
        <EditTutoringCurriculumModal
          editData={editTutoringCurriculumData}
          openEditTutoringCurriculumModal={openEditTutoringCurriculumModal}
          setOpenEditTutoringCurriculumBoard={
            setOpenEditTutoringCurriculumModal
          }
        />
      )}
      {/* open delete tutoring curriculum Modal */}
      {openDeleteTutoringCurriculumModal && (
        <DeleteModal
          id={deleteTutoringCurriculumData?._id}
          name={deleteTutoringCurriculumData?.curriculumName}
          setDeleteData={setDeleteTutoringCurriculumData}
          openDeleteModal={openDeleteTutoringCurriculumModal}
          setOpenDeleteModal={setOpenDeleteTutoringCurriculumModal}
          deleteFunction={deleteTutoringCurriculum}
        />
      )}
    </div>
  );
};

export default AllTutoringCurriculum;
