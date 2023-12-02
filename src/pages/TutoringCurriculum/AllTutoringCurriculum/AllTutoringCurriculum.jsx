import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import AddTutoringCurriculumModal from "./AddTutoringCurriculumModal/AddTutoringCurriculumModal";

import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import EditTutoringCurriculumModal from "./EditTutoringCurriculumModal/EditTutoringCurriculumModal";
import {
    useDeleteTutoringCurriculumMutation,
    useGetTutoringCurriculumQuery,
} from "../../../store/service/tutoringCurriculum/tutoringCurriculumApiService";

const AllTutoringCurriculum = () => {
    const [openTutoringCurriculumModal, setOpenTutoringCurriculumModal] =
        useState(false);

    const [deleteTutoringCurriculumData, setDeleteTutoringCurriculumData] =
        useState(null);

    const [
        openDeleteTutoringCurriculumModal,
        setOpenDeleteTutoringCurriculumModal,
    ] = useState(false);

    /* Edit */
    const [editTutoringCurriculumData, setEditTutoringCurriculumData] =
        useState(null);
    const [
        openEditTutoringCurriculumModal,
        setOpenEditTutoringCurriculumModal,
    ] = useState(false);

    const [deleteTutoringCurriculum] = useDeleteTutoringCurriculumMutation();

    const { data: allTutoringCurriculumData } = useGetTutoringCurriculumQuery();
    const allTutoringCurriculum = allTutoringCurriculumData?.data;

    return (
        <div className="py-10">
            <div className="flex justify-between items-center border-b pb-3">
                <h1 className="font-bold">All Tutoring Curriculum</h1>
                <div
                    className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 bg-white cursor-pointer"
                    onClick={() => setOpenTutoringCurriculumModal(true)}
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
                                Curriculum Name
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                Variant
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px]">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {allTutoringCurriculum?.map(
                            (TutoringCurriculum, idx) => {
                                const classes =
                                    "p-4 border-b border-blue-gray-50";
                                return (
                                    <tr
                                        className={classes}
                                        key={TutoringCurriculum?._id}
                                    >
                                        <th className={classes}>{idx + 1}</th>
                                        <td className={classes}>
                                            {TutoringCurriculum?.curriculumName}
                                        </td>
                                        <td className={classes}>
                                            {
                                                TutoringCurriculum?.educationVariant
                                            }
                                        </td>

                                        <td
                                            className={`${classes} w-[120px] flex gap-4`}
                                        >
                                            <span className="flex justify-evenly items-center">
                                                <FaEdit
                                                    onClick={() => {
                                                        setEditTutoringCurriculumData(
                                                            TutoringCurriculum
                                                        ),
                                                            setOpenEditTutoringCurriculumModal(
                                                                true
                                                            );
                                                    }}
                                                    className="cursor-pointer hover:text-red-500"
                                                />{" "}
                                            </span>
                                            <span className="flex justify-evenly items-center">
                                                <FaTrash
                                                    onClick={() => {
                                                        setDeleteTutoringCurriculumData(
                                                            TutoringCurriculum
                                                        ),
                                                            setOpenDeleteTutoringCurriculumModal(
                                                                true
                                                            );
                                                    }}
                                                    className="cursor-pointer hover:text-red-500"
                                                />{" "}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
            {openTutoringCurriculumModal && (
                <AddTutoringCurriculumModal
                    openAddTutoringCurriculumModal={openTutoringCurriculumModal}
                    setOpenAddTutoringCurriculumModal={
                        setOpenTutoringCurriculumModal
                    }
                />
            )}

            {openEditTutoringCurriculumModal && (
                <EditTutoringCurriculumModal
                    editData={editTutoringCurriculumData}
                    openEditTutoringCurriculumModal={
                        openEditTutoringCurriculumModal
                    }
                    setOpenEditTutoringCurriculumBoard={
                        setOpenEditTutoringCurriculumModal
                    }
                />
            )}

            {openDeleteTutoringCurriculumModal && (
                <DeleteModal
                    id={deleteTutoringCurriculumData?._id}
                    name={deleteTutoringCurriculumData?.curriculumName}
                    setDeleteData={setDeleteTutoringCurriculumData}
                    openDeleteModal={openDeleteTutoringCurriculumModal}
                    setOpenDeleteModal={setOpenDeleteTutoringCurriculumModal}
                    deleteFunction={deleteTutoringCurriculum}
                />
            )}
        </div>
    );
};

export default AllTutoringCurriculum;
