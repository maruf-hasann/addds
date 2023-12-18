import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import AddSubjectVariantModal from "./AddSubjectVariantModal/AddSubjectVariantModal";

import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import EditSubjectVariantModal from "./EditSubjectVariantModal/EditSubjectVariantModal";
import {
  useDeleteSubjectVariantMutation,
  useGetSubjectVariantQuery,
} from "../../../store/service/subjectVariant/subjectVariantApiService";

const AllSubjectVariant = () => {
  /* for delete state */
  const [openSubjectVariantModal, setOpenSubjectVariantModal] = useState(false);
  const [deleteSubjectVariantData, setDeleteSubjectVariantData] =
    useState(null);
  const [openDeleteSubjectVariantModal, setOpenDeleteSubjectVariantModal] =
    useState(false);

  /* Edit State */
  const [editSubjectVariantData, setEditSubjectVariantData] = useState(null);
  const [openEditSubjectVariantModal, setOpenEditSubjectVariantModal] =
    useState(false);

  /* Subject Variant Redux */
  const [deleteSubjectVariant] = useDeleteSubjectVariantMutation();
  const { data: allSubjectVariantData } = useGetSubjectVariantQuery();
  const allSubjectVariant = allSubjectVariantData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-2xl text-white">All Subject Variant</h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenSubjectVariantModal(true)}
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
                Variant
              </th>

              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Subject Class Variant
              </th>

              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* body */}
            {allSubjectVariant?.map((subjectVariant, idx) => {
              const classes =
                "p-4 text-base text-gray-800 font-normal border-b";
              return (
                <tr className={`hover:bg-blue-50`} key={subjectVariant?._id}>
                  <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                  <td className={classes}>{subjectVariant?.variant}</td>
                  <td className={classes}>
                    {subjectVariant?.subjectClassVariant}
                  </td>

                  <td className={`${classes} w-[120px] flex gap-4`}>
                    <span className="flex justify-evenly items-center">
                      <FaEdit
                        onClick={() => {
                          setEditSubjectVariantData(subjectVariant),
                            setOpenEditSubjectVariantModal(true);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />{" "}
                    </span>
                    <span className="flex justify-evenly items-center">
                      <FaTrash
                        onClick={() => {
                          setDeleteSubjectVariantData(subjectVariant),
                            setOpenDeleteSubjectVariantModal(true);
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
      {/* Open Subject Variant Modal  */}
      {openSubjectVariantModal && (
        <AddSubjectVariantModal
          openAddSubjectVariantModal={openSubjectVariantModal}
          setOpenAddSubjectVariantModal={setOpenSubjectVariantModal}
        />
      )}
      {/* Open Edit Subject Variant Modal  */}
      {openEditSubjectVariantModal && (
        <EditSubjectVariantModal
          editData={editSubjectVariantData}
          openEditSubjectVariantModal={openEditSubjectVariantModal}
          setOpenEditSubjectVariantBoard={setOpenEditSubjectVariantModal}
        />
      )}
      {/* Open Delete Subject Variant Modal  */}
      {openDeleteSubjectVariantModal && (
        <DeleteModal
          id={deleteSubjectVariantData?._id}
          name={deleteSubjectVariantData?.variant}
          setDeleteData={setDeleteSubjectVariantData}
          openDeleteModal={openDeleteSubjectVariantModal}
          setOpenDeleteModal={setOpenDeleteSubjectVariantModal}
          deleteFunction={deleteSubjectVariant}
        />
      )}
    </div>
  );
};

export default AllSubjectVariant;
