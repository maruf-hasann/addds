import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import AddMockPricingModal from "./AddMockPricingModal/AddMockPricingModal";

import DeleteMockPricingModal from "./DeleteMockPricingModal/DeleteMockPricingModal";
import EditMockPricingModal from "./EditMockPricingModal/EditMockPricingModal";
import {
  useDeleteMockPricingMutation,
  useGetMockPricingQuery,
} from "../../../store/service/mockPricing/mockPricingApiService";

const AllMockPricing = () => {
  /* handle delete state handle */
  const [openMockPricingModal, setOpenMockPricingModal] = useState(false);
  const [deleteMockPricingData, setDeleteMockPricingData] = useState(null);
  const [openDeleteMockPricingModal, setOpenDeleteMockPricingModal] =
    useState(false);

  /* Edit state handle */
  const [editMockPricingData, setEditMockPricingData] = useState(null);
  const [openEditMockPricingModal, setOpenEditMockPricingModal] =
    useState(false);

  /* redux api call */
  const [deleteMockPricing] = useDeleteMockPricingMutation();
  const { data: allMockPricingData } = useGetMockPricingQuery();
  const allMockPricing = allMockPricingData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          All Mock Pricing
        </h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenMockPricingModal(true)}
        >
          Add New
        </div>
      </div>
      <div className="overflow-x-auto rounded bg-white">
        <table className="w-full min-w-max table-auto text-left border">
          {/* head */}
          <thead>
            <tr>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px]">
                Sl
              </th>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Education Variant
              </th>

              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Main Subject
              </th>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Grade
              </th>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Sub Subject
              </th>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                Price
              </th>

              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allMockPricing?.map((mockPricing, idx) => {
              const classes =
                "p-4 text-base text-gray-800 font-normal border-b";
              return (
                <tr className={`hover:bg-blue-50`} key={mockPricing?.mockId}>
                  <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                  <td className={classes}>{mockPricing?.educationVariant}</td>
                  <td className={classes}>{mockPricing?.mainSubject}</td>
                  <td className={classes}>{mockPricing?.grade}</td>
                  <td className={classes}>{mockPricing?.subSubject}</td>
                  <td className={classes}>{mockPricing?.price}</td>
                  <td className={`${classes} w-[120px] flex gap-3`}>
                    <span className="flex justify-evenly items-center">
                      <FaEdit
                        onClick={() => {
                          setEditMockPricingData(mockPricing),
                            setOpenEditMockPricingModal(true);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />{" "}
                    </span>
                    <span className="flex justify-evenly items-center">
                      <FaTrash
                        onClick={() => {
                          setDeleteMockPricingData(mockPricing),
                            setOpenDeleteMockPricingModal(true);
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

      {/* open add tutoring curriculum Modal */}
      {openMockPricingModal && (
        <AddMockPricingModal
          openAddMockPricingModal={openMockPricingModal}
          setOpenAddMockPricingModal={setOpenMockPricingModal}
        />
      )}

      {/* open edit tutoring curriculum Modal */}
      {openEditMockPricingModal && (
        <EditMockPricingModal
          editData={editMockPricingData}
          openEditMockPricingModal={openEditMockPricingModal}
          setOpenEditMockPricingBoard={setOpenEditMockPricingModal}
        />
      )}
      {/* open delete tutoring curriculum Modal */}
      {openDeleteMockPricingModal && (
        <DeleteMockPricingModal
          id={deleteMockPricingData?.mockId}
          name={deleteMockPricingData?.price}
          setDeleteData={setDeleteMockPricingData}
          openDeleteModal={openDeleteMockPricingModal}
          setOpenDeleteModal={setOpenDeleteMockPricingModal}
          deleteFunction={deleteMockPricing}
        />
      )}
    </div>
  );
};

export default AllMockPricing;
