import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import AddCollageHCModal from "./AddCollageHCModal/AddCollageHCModal";
import {
  useDeleteCollageHCMutation,
  useGetCollageHCQuery,
} from "../../../store/service/collageHC/collageHCApiService";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";

const AllCollageHC = () => {
  const [openCollageHCModal, setOpenCollageHCModal] = useState(false);

  const [deleteCollageHCData, setDeleteCollageHCData] = useState(null);
  const [openDeleteCollageHCModal, setOpenDeleteCollageHCModal] =
    useState(false);

  const [deleteCollageHC] = useDeleteCollageHCMutation();

  const { data: allCollageHCData } = useGetCollageHCQuery();
  const allCollageHC = allCollageHCData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold">All Collage HC</h1>
        <div
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenCollageHCModal(true)}
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
                Variant
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allCollageHC?.map((collageHC, idx) => {
              const classes = "p-4 border-b border-blue-gray-50";
              return (
                <tr className={classes} key={collageHC?._id}>
                  <th className={classes}>{idx + 1}</th>
                  <td className={classes}>{collageHC.collageName}</td>
                  <td className={classes}>{collageHC?.educationVariant}</td>
                  <td className={`${classes} w-[120px]`}>
                    <div className="flex justify-evenly items-center">
                      <FaTrash
                        onClick={() => {
                          setDeleteCollageHCData(collageHC),
                            setOpenDeleteCollageHCModal(true);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />{" "}
                    </div>
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
