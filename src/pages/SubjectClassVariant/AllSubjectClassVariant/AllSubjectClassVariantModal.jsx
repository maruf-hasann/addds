import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import { useState } from "react";
import EditSubjectClassVariantModal from "./EditTutoringVariantModal/EditTutoringVariantModal";
import { useGetSubjectClassVariantsQuery } from "../../../store/service/subjectClassVariant/subjectClassVariantApiService";
import AddSubjectClassVariantModal from "./AddSubjectClassVariantModal/AddSubjectClassVariantModal";
import DeleteSubjectClassVariant from "./DeleteSubjectClassVariant/DeleteSubjectClassVariant";

const AllSubjectClassVariantModal = () => {
  /* delete state handling  */
  const [openSubjectClassVariantModal, setOpenSubjectClassVariantModal] =
    useState(false);
  const [deleteSubjectClassVariantData, setDeleteSubjectClassVariantData] =
    useState(null);
  const [
    openDeleteSubjectClassVariantModal,
    setOpenDeleteSubjectClassVariantModal,
  ] = useState(false);
  /* edit state handling*/
  const [editSubjectClassVariantData, setEditSubjectClassVariantData] =
    useState(null);
  const [
    openEditSubjectClassVariantModal,
    setOpenEditSubjectClassVariantModal,
  ] = useState(false);

  /* redux api call */
  const { data: subjectClassVariantsData } = useGetSubjectClassVariantsQuery();
  const SubjectClassVariants = subjectClassVariantsData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-xl md:text-2xl text-white">
            All Subject Class Variant
          </h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenSubjectClassVariantModal(true)}
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
              {/* body */}
              {SubjectClassVariants?.map((variant, idx) => {
                const classes =
                  "p-4 text-base text-gray-800 font-normal border-b";
                return (
                  <tr key={variant._id} className={` hover:bg-blue-50`}>
                    <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                    <td className={classes}>{variant?.variant}</td>
                    <td className={`${classes} w-[120px]`}>
                      <span className="flex justify-center gap-3 items-center">
                        <FaTrash
                          onClick={() => {
                            setDeleteSubjectClassVariantData(variant),
                              setOpenDeleteSubjectClassVariantModal(true);
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />{" "}
                        <FaEdit
                          onClick={() => {
                            setEditSubjectClassVariantData(variant),
                              setOpenEditSubjectClassVariantModal(true);
                          }}
                          className="cursor-pointer hover:text-sky-500"
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Open Delete Subject Class Variant Modal */}
      {openDeleteSubjectClassVariantModal && deleteSubjectClassVariantData && (
        <DeleteSubjectClassVariant
          deleteSubjectClassVariantData={deleteSubjectClassVariantData}
          openDeleteSubjectClassVariantModal={
            openDeleteSubjectClassVariantModal
          }
          setDeleteSubjectClassVariantData={setDeleteSubjectClassVariantData}
          setOpenDeleteSubjectClassVariantModal={
            setOpenDeleteSubjectClassVariantModal
          }
        />
      )}

      {/* Open Edit Subject Class Variant Modal */}
      {openEditSubjectClassVariantModal && editSubjectClassVariantData && (
        <EditSubjectClassVariantModal
          editData={editSubjectClassVariantData}
          openEditSubjectClassVariantModal={openEditSubjectClassVariantModal}
          setOpenEditSubjectClassVariantModal={
            setOpenEditSubjectClassVariantModal
          }
        />
      )}

      {/* Open Add Subject Class Variant Modal */}
      {openSubjectClassVariantModal && (
        <AddSubjectClassVariantModal
          openAddSubjectClassVariantModal={openSubjectClassVariantModal}
          setOpenAddSubjectClassVariantModal={setOpenSubjectClassVariantModal}
        />
      )}
    </>
  );
};

export default AllSubjectClassVariantModal;
