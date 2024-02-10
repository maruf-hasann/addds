import React from "react";

const TableSkeleton = ({ rowLength }) => {
    return (
        <div className="overflow-hidden relative z-[999999] pt-4 rounded-md bg-white dark:bg-graydark ">
            <div className="flex p-4 flex-col-reverse gap-5 md:flex-row items-center justify-between">
                <div className="flex items-center gap-2 ">
                    <div className="w-8 h-8 bg-blue-gray-200 rounded-full animate-pulse "></div>
                    <div className="w-8 h-8 bg-blue-gray-200 rounded-full animate-pulse "></div>
                </div>
                <div className="relative group mr-5">
                    <div className="w-56 h-8 bg-blue-gray-200 rounded-full animate-pulse "></div>
                </div>
            </div>
            <table style={{ width: "100%" }} className="mt-2">
                <tbody>
                    {Array.from({ length: rowLength }, (_, idx) => (
                        <tr key={idx} className="bg-white dark:bg-graydark ">
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-gray-200 rounded-full animate-pulse "></div>
                                    <div className="flex flex-col">
                                        <div className="w-32 h-4 bg-blue-gray-200 rounded animate-pulse "></div>
                                        <div className="w-40 h-3 bg-blue-gray-200 rounded animate-pulse  mt-2"></div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex flex-col">
                                    <div className="w-16 h-4 bg-blue-gray-200 rounded animate-pulse "></div>
                                    <div className="w-32 h-3 bg-blue-gray-200 rounded animate-pulse  mt-2"></div>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="w-20 h-8 bg-blue-gray-200 rounded-full animate-pulse "></div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="w-24 h-4 bg-blue-gray-200 rounded animate-pulse "></div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-blue-gray-200 rounded-full animate-pulse "></div>
                                    <div className="w-6 h-6 bg-blue-gray-200 rounded-full animate-pulse "></div>
                                    <div className="w-6 h-6 bg-blue-gray-200 rounded-full animate-pulse "></div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSkeleton;
