import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import AddMainSubjectModal from "./AddMainSubjectModal/AddMainSubjectModal";
import {
    useDeleteMainSubjectMutation,
    useGetMainSubjectQuery,
} from "../../../store/service/mainSubject/mainSubjectApiService";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import EditMainSubjectModal from "./EditMainSubjectModal/EditMainSubjectModal";

const AllMainSubject = () => {
    /* for delete state */
    const [openMainSubjectModal, setOpenMainSubjectModal] = useState(false);
    const [deleteMainSubjectData, setDeleteMainSubjectData] = useState(null);
    const [openDeleteMainSubjectModal, setOpenDeleteMainSubjectModal] =
        useState(false);

    /* Edit state */
    const [editMainSubjectData, setEditMainSubjectData] = useState(null);
    const [openEditMainSubjectModal, setOpenEditMainSubjectModal] =
        useState(false);

    /* redux api call */
    const [deleteMainSubject] = useDeleteMainSubjectMutation();
    const { data: allMainSubjectData } = useGetMainSubjectQuery();
    const allMainSubject = allMainSubjectData?.data;

    return (
        <div className="py-10">
            <div className="flex justify-between items-center border-b pb-3">
                <h1 className="font-bold">All Main Subject</h1>
                <div
                    className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 bg-white cursor-pointer"
                    onClick={() => setOpenMainSubjectModal(true)}
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
                                Name
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                Subject Variant
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px]">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {allMainSubject?.map((mainSubject, idx) => {
                            const classes = "p-4 border-b border-blue-gray-50";
                            return (
                                <tr className={classes} key={mainSubject?._id}>
                                    <th className={classes}>{idx + 1}</th>
                                    <td className={classes}>
                                        {mainSubject?.name}
                                    </td>
                                    <td className={classes}>
                                        {mainSubject?.subjectVariant}
                                    </td>
                                    <td
                                        className={`${classes} w-[120px] flex gap-3`}
                                    >
                                        <span className="flex justify-evenly items-center">
                                            <FaEdit
                                                onClick={() => {
                                                    setEditMainSubjectData(
                                                        mainSubject
                                                    ),
                                                        setOpenEditMainSubjectModal(
                                                            true
                                                        );
                                                }}
                                                className="cursor-pointer hover:text-red-500"
                                            />{" "}
                                        </span>
                                        <span className="flex justify-evenly items-center">
                                            <FaTrash
                                                onClick={() => {
                                                    setDeleteMainSubjectData(
                                                        mainSubject
                                                    ),
                                                        setOpenDeleteMainSubjectModal(
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

            {/* Open Add Main Subject Modal  */}
            {openMainSubjectModal && (
                <AddMainSubjectModal
                    openAddMainSubjectModal={openMainSubjectModal}
                    setOpenAddMainSubjectModal={setOpenMainSubjectModal}
                />
            )}

            {/* Open Edit Main Subject Modal  */}
            {openEditMainSubjectModal && (
                <EditMainSubjectModal
                    editData={editMainSubjectData}
                    openEditMainSubjectModal={openEditMainSubjectModal}
                    setOpenEditMainSubjectModal={setOpenEditMainSubjectModal}
                />
            )}

            {/* Open Delete Main Subject Modal  */}
            {openDeleteMainSubjectModal && (
                <DeleteModal
                    id={deleteMainSubjectData?._id}
                    name={deleteMainSubjectData?.name}
                    setDeleteData={setDeleteMainSubjectData}
                    openDeleteModal={openDeleteMainSubjectModal}
                    setOpenDeleteModal={setOpenDeleteMainSubjectModal}
                    deleteFunction={deleteMainSubject}
                />
            )}
        </div>
    );
};

export default AllMainSubject;