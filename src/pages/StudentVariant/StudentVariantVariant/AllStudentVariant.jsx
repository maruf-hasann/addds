import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import DeleteStudentVariantModal from "./DeleteStudentVariant/DeleteStudentVariantModal";
import EditStudentVariantModal from "./EditStudentVariant/EditStudentVariant";
import { useGetStudentVariantsQuery } from "../../../store/service/studentVariant/studentVariantApiService";
import AddStudentVariantModal from "./AddStudentVariantModal/AddStudentVariantModal";

const AllStudentVariant = () => {
  const [openStudentVariantModal, setOpenStudentVariantModal] = useState(false);

  const [deleteStudentVariantData, setDeleteStudentVariantData] =
    useState(null);
  const [openDeleteStudentVariantModal, setOpenDeleteStudentVariantModal] =
    useState(false);

  const [editStudentVariantData, setEditStudentVariantData] = useState(null);
  const [openEditStudentVariantModal, setOpenEditStudentVariantModal] =
    useState(false);

  const { data: studentVariantsData } = useGetStudentVariantsQuery();
  const studentVariants = studentVariantsData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-2xl text-white">
            All Tutoring Category
          </h1>
          <div
            // to={"/add-student-variant"}
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenStudentVariantModal(true)}
          >
            Add New
          </div>
        </div>
        <div className="overflow-x-auto border-x rounded bg-white">
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
              {studentVariants?.map((variant, idx) => {
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
                            setDeleteStudentVariantData(variant),
                              setOpenDeleteStudentVariantModal(true);
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />{" "}
                        <FaEdit
                          onClick={() => {
                            setEditStudentVariantData(variant),
                              setOpenEditStudentVariantModal(true);
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
      {openDeleteStudentVariantModal && deleteStudentVariantData && (
        <DeleteStudentVariantModal
          deleteStudentVariantData={deleteStudentVariantData}
          openDeleteStudentVariantModal={openDeleteStudentVariantModal}
          setDeleteStudentVariantData={setDeleteStudentVariantData}
          setOpenDeleteStudentVariantModal={setOpenDeleteStudentVariantModal}
        />
      )}
      {openEditStudentVariantModal && editStudentVariantData && (
        <EditStudentVariantModal
          editStudentVariantData={editStudentVariantData}
          openEditStudentVariantModal={openEditStudentVariantModal}
          setEditStudentVariantData={setOpenEditStudentVariantModal}
          setOpenEditStudentVariantModal={setOpenEditStudentVariantModal}
        />
      )}
      {openStudentVariantModal && (
        <AddStudentVariantModal
          openAddStudentVariantModal={openStudentVariantModal}
          setOpenAddStudentVariantModal={setOpenStudentVariantModal}
        />
      )}
    </>
  );
};

export default AllStudentVariant;
