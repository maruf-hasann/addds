import { Button } from "@material-tailwind/react";
import React from "react";
import { BiSolidSchool } from "react-icons/bi";
import { FaBook, FaSchool } from "react-icons/fa";
import { FaBlog, FaSchoolFlag } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { RiParentFill } from "react-icons/ri";
import UserRegisterLineChart from "../../components/Shared/Charts/LineCharts/UserRegisterLineChart";
import UserStatisticsLineChart from "../../components/Shared/Charts/LineCharts/UserStatisticsLineChart";
import DashboardWidget from "../../components/Shared/Widgets/DashboardWidget";

const Dashboard = () => {
    return (
        <div className="">
            <div className="grid grid-cols-4 gap-4">
                <DashboardWidget amount={1000} name={"Total Tutors"}>
                    <GiTeacher size={24} className="text-white" />
                </DashboardWidget>
                <DashboardWidget amount={1000} name={"Total Parents"}>
                    <RiParentFill size={25} className="text-white" />
                </DashboardWidget>

                <DashboardWidget amount={1000} name={"Total Students"}>
                    <PiStudentBold size={24} className="text-white" />
                </DashboardWidget>

                <DashboardWidget amount={1000} name={"Total Blogs"}>
                    <FaBlog size={25} className="text-white" />
                </DashboardWidget>
                <DashboardWidget amount={1000} name={"Total School"}>
                    <FaSchool size={24} className="text-white" />
                </DashboardWidget>

                <DashboardWidget amount={1000} name={"Total University"}>
                    <BiSolidSchool size={25} className="text-white" />
                </DashboardWidget>

                <DashboardWidget amount={1000} name={"Total Collage"}>
                    <FaSchoolFlag size={24} className="text-white" />
                </DashboardWidget>

                <DashboardWidget amount={1000} name={" Total Subjects"}>
                    <FaBook size={25} className="text-white" />
                </DashboardWidget>
                {/* <DashboardWidget amount={1000} name={"Total Mock Test"}>
                    <MdOutlineAddHomeWork size={25} className="text-white" />
                </DashboardWidget>

                <DashboardWidget amount={1000} name={"Total Regular Test"}>
                    <MdAssuredWorkload size={25} className="text-white" />
                </DashboardWidget> */}
            </div>

            {/* Summary */}
            <div className="shadow-md rounded-lg mt-8">
                <div className="relative bg-white  shadow-md rounded-lg my-5 ">
                    <div className="flex justify-between  rounded-lg  bg-white pt-7 pb-3 px-4">
                        <h2 className="capitalize text-[24px] font-semibold text-gray-800 ">
                            Tutors Summary
                        </h2>

                        <div>
                            <Button
                                color="blue"
                                className="hover:-translate-y-1 transition-all duration-500"
                            >
                                See All
                            </Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100">
                        <table className="min-w-full overflow-hidden">
                            <thead className="bg-blue-50/30  cursor-pointer p-3 text-left whitespace-nowrap">
                                <tr className="text-sm">
                                    <th
                                        className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                    >
                                        <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                            <span className="relative  text-[13px]">
                                                TIME PERIOD
                                            </span>
                                        </div>
                                    </th>
                                    <th
                                        className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                    >
                                        <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                            <span className="relative  text-[13px]">
                                                ACCEPTED
                                            </span>
                                        </div>
                                    </th>

                                    <th
                                        className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                    >
                                        <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                            <span className="relative  text-[13px]">
                                                AUTO REJECTED
                                            </span>
                                        </div>
                                    </th>
                                    <th
                                        className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                    >
                                        <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                            <span className="relative  text-[13px]">
                                                REJECTED
                                            </span>
                                        </div>
                                    </th>
                                    <th
                                        className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                    >
                                        <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                            <span className="relative  text-[13px]">
                                                STARTED
                                            </span>
                                        </div>
                                    </th>
                                    <th
                                        className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                    >
                                        <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                            <span className="relative  text-[13px]">
                                                CANCELLED
                                            </span>
                                        </div>
                                    </th>
                                    <th
                                        className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                    >
                                        <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                            <span className="relative  text-[13px]">
                                                UNHANDLED
                                            </span>
                                        </div>
                                    </th>
                                    <th
                                        className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                    >
                                        <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                            <span className="relative  text-[13px]">
                                                COMPLETED
                                            </span>
                                        </div>
                                    </th>
                                    <th
                                        className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                    >
                                        <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                            <span className="relative  text-[13px]">
                                                Total
                                            </span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="border-blue-gray-10">
                                {[1, 2].map((num) => (
                                    <tr key={num}>
                                        <td
                                            className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                        >
                                            {num == 1 ? "Life Time" : "Today"}
                                        </td>

                                        <td
                                            className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                        >
                                            1
                                        </td>
                                        <td
                                            className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                        >
                                            1
                                        </td>
                                        <td
                                            className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                        >
                                            1
                                        </td>
                                        <td
                                            className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                        >
                                            1
                                        </td>
                                        <td
                                            className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                        >
                                            1
                                        </td>
                                        <td
                                            className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                        >
                                            1
                                        </td>
                                        <td
                                            className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                        >
                                            1
                                        </td>
                                        <td
                                            className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                        >
                                            1
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-5">
                <div className="shadow-md rounded-lg">
                    <div className="relative bg-white shadow-md  rounded-lg ">
                        <div className="flex justify-between  bg-white pt-7 pb-3 px-4 rounded-lg">
                            <h2 className="capitalize text-[24px] font-semibold text-gray-800 ">
                                Parents Summary
                            </h2>
                            <div>
                                <Button
                                    color="blue"
                                    className="hover:-translate-y-1 py-2.5 px-3.5 transition-all duration-500"
                                >
                                    See All
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100">
                            <table className="min-w-full overflow-hidden">
                                <thead className="bg-blue-50/30  cursor-pointer p-3 text-left whitespace-nowrap">
                                    <tr className="text-sm">
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    TIME PERIOD
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    ACCEPTED
                                                </span>
                                            </div>
                                        </th>

                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    AUTO REJECTED
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    REJECTED
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    STARTED
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    CANCELLED
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    UNHANDLED
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    COMPLETED
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    Total
                                                </span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="border-blue-gray-10">
                                    {[1, 2].map((num) => (
                                        <tr key={num}>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                {num == 1
                                                    ? "Life Time"
                                                    : "Today"}
                                            </td>

                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="shadow-md  rounded-lg">
                    <div className="relative bg-white shadow-md  rounded-lg">
                        <div className="flex justify-between rounded-lg bg-white pt-7 pb-3 px-4">
                            <h2 className="capitalize text-[24px] rounded-lg  font-semibold text-gray-800 ">
                                Students Summary
                            </h2>
                            <div>
                                <Button
                                    color="blue"
                                    className="hover:-translate-y-1 py-2.5 px-3.5 transition-all duration-500"
                                >
                                    See All
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100">
                            <table className="min-w-full overflow-hidden">
                                <thead className="bg-blue-50/30  cursor-pointer p-3 text-left whitespace-nowrap">
                                    <tr className="text-sm">
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    TIME PERIOD
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    ACCEPTED
                                                </span>
                                            </div>
                                        </th>

                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    AUTO REJECTED
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    REJECTED
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    STARTED
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    CANCELLED
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    UNHANDLED
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    COMPLETED
                                                </span>
                                            </div>
                                        </th>
                                        <th
                                            className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                        >
                                            <div className="flex items-center justify-start gap-1 text-gray-700 uppercase font-medium">
                                                <span className="relative  text-[13px]">
                                                    Total
                                                </span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="border-blue-gray-10">
                                    {[1, 2].map((num) => (
                                        <tr key={num}>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                {num == 1
                                                    ? "Life Time"
                                                    : "Today"}
                                            </td>

                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                            <td
                                                className={`py-4 px-3 font-normal border-t text-[14.5px] border-t-blue-gray-100 whitespace-normal align-middle`}
                                            >
                                                1
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shadow-md rounded-lg mt-8 bg-white mb-9 p-4">
                <UserRegisterLineChart />
            </div>
            <div className="shadow-md rounded-lg mt-8 bg-white mb-9 p-4">
                <UserStatisticsLineChart />
            </div>
            {/* Cart */}
        </div>
    );
};

export default Dashboard;
