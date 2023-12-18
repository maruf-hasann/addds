import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import DeleteEducationVariantModal from "./DeleteEducationVariant/DeleteEducationVariantModal";
import { useGetEducationVariantsQuery } from "../../../store/service/educationVariant/educationVariantApiService";
import AddEducationVariantModal from "./AddEducationVariantModal/AddEducationVariantModal";

const AllEducationVariant = () => {
  const [openAddEducationVariantModal, setOpenAddEducationVariantModal] =
    useState(false);

  const [deleteEducationVariantData, setDeleteEducationVariantData] =
    useState(null);
  const [openDeleteEducationVariantModal, setOpenDeleteEducationVariantModal] =
    useState(false);

  const { data: educationVariantsData } = useGetEducationVariantsQuery();
  const educationVariants = educationVariantsData?.data;

  return (
    <>
      <div className="py-10 ">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-2xl text-white">
            All Education Variant
          </h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenAddEducationVariantModal(true)}
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
                <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {educationVariants?.map((variant, idx) => {
                const classes =
                  "p-4 text-base text-gray-800 font-normal border-b";
                return (
                  <tr key={variant._id} className={`hover:bg-blue-50`}>
                    <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                    <td className={classes}>{variant?.variantName}</td>
                    <td className={`${classes} w-[120px]`}>
                      <div className="flex justify-evenly items-center">
                        <FaTrash
                          onClick={() => {
                            setDeleteEducationVariantData(variant),
                              setOpenDeleteEducationVariantModal(true);
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />{" "}
                        {/* <FaEdit
                          className="cursor-pointer hover:text-sky-500"
                        /> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {openDeleteEducationVariantModal && deleteEducationVariantData && (
        <DeleteEducationVariantModal
          deleteEducationVariantData={deleteEducationVariantData}
          openDeleteEducationVariantModal={openDeleteEducationVariantModal}
          setDeleteEducationVariantData={setDeleteEducationVariantData}
          setOpenDeleteEducationVariantModal={
            setOpenDeleteEducationVariantModal
          }
        />
      )}

      {openAddEducationVariantModal && (
        <AddEducationVariantModal
          openAddEducationVariantModal={openAddEducationVariantModal}
          setOpenAddEducationVariantModal={setOpenAddEducationVariantModal}
        />
      )}
    </>
  );
};

export default AllEducationVariant;
