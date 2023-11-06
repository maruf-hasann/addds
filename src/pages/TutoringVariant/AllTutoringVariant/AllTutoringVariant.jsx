import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useGetTutoringVariantsQuery } from "../../../store/service/tutoringVariant/tutoringVariant";
import { useState } from "react";
import DeleteTutoringVariantModal from "./DeleteTutoringVariant/DeleteTutoringVariantModal";
import EditTutoringVariantModal from "./EditTutoringVariant/EditTutoringVariant";

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
                  Name
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {tutoringVariants?.map((variant, idx) => {
                const classes = "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={variant._id} className="hover">
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
