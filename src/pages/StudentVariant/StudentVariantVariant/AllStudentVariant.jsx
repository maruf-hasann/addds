import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import DeleteStudentVariantModal from "./DeleteStudentVariant/DeleteStudentVariantModal";
import EditStudentVariantModal from "./EditStudentVariant/EditStudentVariant";
import { useGetStudentVariantsQuery } from "../../../store/service/studentVariant/studentVariantApiService";

const AllStudentVariant = () => {
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
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="font-bold">All Student Variant</h1>
          <Link
            to={"/dashboard/add-student-variant"}
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
              {studentVariants?.map((variant, idx) => {
                const classes = "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={variant._id} className="hover">
                    <th className={classes}>{idx + 1}</th>
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
    </>
  );
};

export default AllStudentVariant;