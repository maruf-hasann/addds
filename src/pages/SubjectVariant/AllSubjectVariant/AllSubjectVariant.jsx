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
    const [openSubjectVariantModal, setOpenSubjectVariantModal] =
        useState(false);
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
            <div className="flex justify-between items-center border-b pb-3">
                <h1 className="font-bold">All Subject Variant</h1>
                <div
                    className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 bg-white cursor-pointer"
                    onClick={() => setOpenSubjectVariantModal(true)}
                >
                    Add New
                </div>
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
                                Variant
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                Subject Class Variant
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px]">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* body */}
                        {allSubjectVariant?.map((subjectVariant, idx) => {
                            const classes = "p-4 border-b border-blue-gray-50";
                            return (
                                <tr
                                    className={classes}
                                    key={subjectVariant?._id}
                                >
                                    <th className={classes}>{idx + 1}</th>
                                    <td className={classes}>
                                        {subjectVariant?.variant}
                                    </td>
                                    <td className={classes}>
                                        {subjectVariant?.subjectClassVariant}
                                    </td>

                                    <td
                                        className={`${classes} w-[120px] flex gap-4`}
                                    >
                                        <span className="flex justify-evenly items-center">
                                            <FaEdit
                                                onClick={() => {
                                                    setEditSubjectVariantData(
                                                        subjectVariant
                                                    ),
                                                        setOpenEditSubjectVariantModal(
                                                            true
                                                        );
                                                }}
                                                className="cursor-pointer hover:text-red-500"
                                            />{" "}
                                        </span>
                                        <span className="flex justify-evenly items-center">
                                            <FaTrash
                                                onClick={() => {
                                                    setDeleteSubjectVariantData(
                                                        subjectVariant
                                                    ),
                                                        setOpenDeleteSubjectVariantModal(
                                                            true
                                                        );
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
                    setOpenEditSubjectVariantBoard={
                        setOpenEditSubjectVariantModal
                    }
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
