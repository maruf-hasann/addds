import React from "react";

const TableSkeleton = () => {
  return (
    <table style={{ width: "100%" }}>
      <tbody>
        <tr className="bg-white dark:bg-graydark animate-pulse ">
          <td className="p-4 border-b border-blue-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-gray-200 rounded-full"></div>
              <div className="flex flex-col">
                <div className="w-32 h-4 bg-blue-gray-200 rounded"></div>
                <div className="w-40 h-3 bg-blue-gray-200 rounded mt-2"></div>
              </div>
            </div>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <div className="flex flex-col">
              <div className="w-16 h-4 bg-blue-gray-200 rounded"></div>
              <div className="w-32 h-3 bg-blue-gray-200 rounded mt-2"></div>
            </div>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <div className="w-20 h-8 bg-blue-gray-200 rounded-full"></div>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <div className="w-24 h-4 bg-blue-gray-200 rounded"></div>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-gray-200 rounded-full"></div>
              <div className="w-6 h-6 bg-blue-gray-200 rounded-full"></div>
              <div className="w-6 h-6 bg-blue-gray-200 rounded-full"></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableSkeleton;
