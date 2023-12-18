import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import { useState } from "react";
import DeleteTutoringVariantModal from "./DeleteTutoringVariant/DeleteTutoringVariantModal";
import EditTutoringVariantModal from "./EditTutoringVariant/EditTutoringVariant";
import { useGetTutoringVariantsQuery } from "../../../store/service/tutoringVariant/tutoringVariantApiService";
import AddTutoringVariantModal from "./AddTutoringVariantModal/AddTutoringVariantModal";

const AllTutoringVariant = () => {
  const [openTutoringVariantModal, setOpenTutoringVariantModal] =
    useState(false);
  const [deleteTutoringVariantData, setDeleteTutoringVariantData] =
    useState(null);
  const [openDeleteTutoringVariantModal, setOpenDeleteTutoringVariantModal] =
    useState(false);
  const [editTutoringVariantData, setEditTutoringVariantData] = useState(null);
  const [openEditTutoringVariantModal, setOpenEditTutoringVariantModal] =
    useState(false);

  const { data: tutoringVariantsData } = useGetTutoringVariantsQuery();
  const tutoringVariants = tutoringVariantsData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-xl md:text-2xl text-white">
            All Tutoring Variant
          </h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenTutoringVariantModal(true)}
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
              {/* row 1 */}
              {tutoringVariants?.map((variant, idx) => {
                const classes =
                  "p-4 text-base text-gray-800 font-normal border-b";
                return (
                  <tr key={variant._id} className={` hover:bg-blue-50`}>
                    <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                    <td className={classes}>{variant?.variantName}</td>
                    <td className={`${classes} w-[120px]`}>
                      <div className="flex justify-evenly items-center">
                        <FaTrash
                          onClick={() => {
                            setDeleteTutoringVariantData(variant),
                              setOpenDeleteTutoringVariantModal(true);
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />{" "}
                        <FaEdit
                          onClick={() => {
                            setEditTutoringVariantData(variant),
                              setOpenEditTutoringVariantModal(true);
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
      {openDeleteTutoringVariantModal && deleteTutoringVariantData && (
        <DeleteTutoringVariantModal
          deleteTutoringVariantData={deleteTutoringVariantData}
          openDeleteTutoringVariantModal={openDeleteTutoringVariantModal}
          setDeleteTutoringVariantData={setDeleteTutoringVariantData}
          setOpenDeleteTutoringVariantModal={setOpenDeleteTutoringVariantModal}
        />
      )}
      {openEditTutoringVariantModal && editTutoringVariantData && (
        <EditTutoringVariantModal
          editTutoringVariantData={editTutoringVariantData}
          openEditTutoringVariantModal={openEditTutoringVariantModal}
          setEditTutoringVariantData={setOpenEditTutoringVariantModal}
          setOpenEditTutoringVariantModal={setOpenEditTutoringVariantModal}
        />
      )}
      {openTutoringVariantModal && (
        <AddTutoringVariantModal
          openAddTutoringVariantModal={openTutoringVariantModal}
          setOpenAddTutoringVariantModal={setOpenTutoringVariantModal}
        />
      )}
    </>
  );
};

export default AllTutoringVariant;
