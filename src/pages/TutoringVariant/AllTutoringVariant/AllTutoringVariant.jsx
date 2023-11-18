import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import { useState } from "react";
import DeleteTutoringVariantModal from "./DeleteTutoringVariant/DeleteTutoringVariantModal";
import EditTutoringVariantModal from "./EditTutoringVariant/EditTutoringVariant";
import { useGetTutoringVariantsQuery } from "../../../store/service/tutoringVariant/tutoringVariantApiService";

const AllTutoringVariant = () => {
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
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-gray-800">All Tutoring Variant</h1>
          <Link
            to={"/add-tutoring-variant"}
            className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-blue-700"
          >
            Add New
          </Link>
        </div>
        <div className="overflow-x-auto border-x rounded  bg-white">
          <table className="w-full min-w-max table-auto text-left">
            {/* head */}
            <thead>
              <tr>
                <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold">
                  Sl
                </th>
                <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold">
                  Name
                </th>
                <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold w-[120px] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {tutoringVariants?.map((variant, idx) => {
                const classes = "p-4 border-b border-blue-gray-50 text-base text-gray-800 font-normal";
                return (
                  <tr key={variant._id} className={` ${idx % 2 !== 0 && 'bg-gray-50'}`}>
                    <th className={classes}>{idx + 1}</th>
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
    </>
  );
};

export default AllTutoringVariant;
