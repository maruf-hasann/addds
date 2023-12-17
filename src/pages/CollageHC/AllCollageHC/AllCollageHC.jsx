import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import AddCollageHCModal from "./AddCollageHCModal/AddCollageHCModal";
import {
  useDeleteCollageHCMutation,
  useGetCollageHCQuery,
} from "../../../store/service/collageHC/collageHCApiService";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import EditCollageHCModal from "./EditCollageHCModal/EditCollageHCModal";

const AllCollageHC = () => {
  const [openCollageHCModal, setOpenCollageHCModal] = useState(false);

  const [deleteCollageHCData, setDeleteCollageHCData] = useState(null);
  const [openDeleteCollageHCModal, setOpenDeleteCollageHCModal] =
    useState(false);

  /* Edit */
  const [editCollageHCData, setEditCollageHCData] = useState(null);
  const [openEditCollageHCModal, setOpenEditCollageHCModal] = useState(false);

  const [deleteCollageHC] = useDeleteCollageHCMutation();

  const { data: allCollageHCData } = useGetCollageHCQuery();
  const allCollageHC = allCollageHCData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center pb-3">
        <h1 className="font-bold text-2xl text-white">All Collage HC</h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenCollageHCModal(true)}
        >
          Add New
        </div>
      </div>
      <div className="overflow-x-auto rounded bg-white">
        <table className="w-full min-w-max table-auto text-left border">
          {/* head */}
          <thead>
            <tr>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Sl
              </th>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Name
              </th>

              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Variant
              </th>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Division
              </th>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allCollageHC?.map((collageHC, idx) => {
              const classes =
                "p-4 text-base text-gray-800 font-normal border-b";
              return (
                <tr className={`hover:bg-blue-50`} key={collageHC?._id}>
                  <th className={classes}>{idx + 1}</th>
                  <td className={classes}>{collageHC?.collageName}</td>
                  <td className={classes}>{collageHC?.educationVariant}</td>
                  <td className={classes}>{collageHC?.division}</td>
                  <td className={`${classes} w-[120px] flex gap-3`}>
                    <span className="flex justify-evenly items-center">
                      <FaEdit
                        onClick={() => {
                          setEditCollageHCData(collageHC),
                            setOpenEditCollageHCModal(true);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />{" "}
                    </span>
                    <span className="flex justify-evenly items-center">
                      <FaTrash
                        onClick={() => {
                          setDeleteCollageHCData(collageHC),
                            setOpenDeleteCollageHCModal(true);
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
      {openCollageHCModal && (
        <AddCollageHCModal
          openAddCollageHCModal={openCollageHCModal}
          setOpenAddCollageHCModal={setOpenCollageHCModal}
        />
      )}

      {openEditCollageHCModal && (
        <EditCollageHCModal
          editData={editCollageHCData}
          openEditCollageHCModal={openEditCollageHCModal}
          setOpenEditCollageHCModal={setOpenEditCollageHCModal}
        />
      )}

      {openDeleteCollageHCModal && (
        <DeleteModal
          id={deleteCollageHCData?._id}
          name={deleteCollageHCData?.collageName}
          setDeleteData={setDeleteCollageHCData}
          openDeleteModal={openDeleteCollageHCModal}
          setOpenDeleteModal={setOpenDeleteCollageHCModal}
          deleteFunction={deleteCollageHC}
        />
      )}
    </div>
  );
};

export default AllCollageHC;
