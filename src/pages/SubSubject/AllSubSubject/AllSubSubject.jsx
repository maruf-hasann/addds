import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { educationVariants } from "../../../data/educationVariant";
import { tutoringSubjects } from "../../../data/tutoringSubjects";
import AddSubSubjectModal from "./AddSubSubjectModal/AddSubSubjectModal";
import {
    useDeleteSubSubjectMutation,
    useGetSubSubjectQuery,
} from "../../../store/service/subSubject/subSubjectApiService";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import EditSubSubjectModal from "./EditSubSubjectModal/EditSubSubjectModal";

const AllSubSubject = () => {
    const [openSubSubjectModal, setOpenSubSubjectModal] = useState(false);
    const [deleteSubSubjectData, setDeleteSubSubjectData] = useState(null);
    const [openDeleteSubSubjectModal, setOpenDeleteSubSubjectModal] =
        useState(false);

    /* Edit State */
    const [editSubSubjectData, setEditSubSubjectData] = useState(null);
    const [openEditSubSubjectModal, setOpenEditSubSubjectModal] =
        useState(false);

    const [deleteSubSubject] = useDeleteSubSubjectMutation();

    const { data: allSubSubjectData } = useGetSubSubjectQuery();
    const allSubSubject = allSubSubjectData?.data;

    return (
        <div className="py-10">
            <div className="flex justify-between items-center border-b pb-3">
                <h1 className="font-bold">All Sub Subject</h1>
                <div
                    className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 bg-white cursor-pointer"
                    onClick={() => setOpenSubSubjectModal(true)}
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
                                Main Subject
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                Sub Subject
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px]">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {allSubSubject?.map((subSubject, idx) => {
                            const classes = "p-4 border-b border-blue-gray-50";
                            return (
                                <tr className={classes} key={subSubject?._id}>
                                    <th className={classes}>{idx + 1}</th>
                                    <td className={classes}>
                                        {subSubject?.mainSubject}
                                    </td>
                                    <td className={classes}>
                                        {subSubject?.subSubject}
                                    </td>
                                    <td
                                        className={`${classes} w-[120px] flex gap-3`}
                                    >
                                        <span className="flex justify-evenly items-center">
                                            <FaEdit
                                                onClick={() => {
                                                    setEditSubSubjectData(
                                                        subSubject
                                                    ),
                                                        setOpenEditSubSubjectModal(
                                                            true
                                                        );
                                                }}
                                                className="cursor-pointer hover:text-red-500"
                                            />{" "}
                                        </span>
                                        <span className="flex justify-evenly items-center">
                                            <FaTrash
                                                onClick={() => {
                                                    setDeleteSubSubjectData(
                                                        subSubject
                                                    ),
                                                        setOpenDeleteSubSubjectModal(
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
            {openSubSubjectModal && (
                <AddSubSubjectModal
                    openAddSubSubjectModal={openSubSubjectModal}
                    setOpenAddSubSubjectModal={setOpenSubSubjectModal}
                />
            )}

            {/* Open Edit Subject Variant Modal  */}
            {openEditSubSubjectModal && (
                <EditSubSubjectModal
                    editData={editSubSubjectData}
                    openEditSubSubjectModal={openEditSubSubjectModal}
                    setOpenEditSubSubject={setOpenEditSubSubjectModal}
                />
            )}

            {openDeleteSubSubjectModal && (
                <DeleteModal
                    id={deleteSubSubjectData?._id}
                    name={deleteSubSubjectData?.subSubject}
                    setDeleteData={setDeleteSubSubjectData}
                    openDeleteModal={openDeleteSubSubjectModal}
                    setOpenDeleteModal={setOpenDeleteSubSubjectModal}
                    deleteFunction={deleteSubSubject}
                />
            )}
        </div>
    );
};

export default AllSubSubject;
