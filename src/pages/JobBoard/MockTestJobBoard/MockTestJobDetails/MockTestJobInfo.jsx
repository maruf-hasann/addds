import moment from "moment";
import { useNavigate } from "react-router-dom";

const MockTestJobInfo = ({ singleJob, title }) => {
    const navigate = useNavigate();

    return (
        <div className="shadow-md rounded-lg">
            <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
                <div>
                    <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                        {title} Mock Test Info
                    </h2>
                </div>
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-0 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Back
                    </button>
                </div>
            </div>
            <div className="px-5 py-5 bg-[#f1f5f9]">
                <div className="flex gap-5">
                    <div className="w-full rounded-md">
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">
                                Mock JobId
                            </h4>
                            <h2 className="capitalize font-bold text-lg">
                                {singleJob?.mockJobId}
                            </h2>
                        </div>
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">
                                Job Type
                            </h4>
                            <h2 className="capitalize font-bold text-lg">
                                {singleJob?.jobType}
                            </h2>
                        </div>
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">Salary</h4>
                            <h2 className="capitalize font-bold text-lg">
                                {singleJob?.salary}
                            </h2>
                        </div>
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">
                                Tutoring Place
                            </h4>
                            <h2 className="capitalize font-bold text-lg">
                                {singleJob?.tutoringPlace}
                            </h2>
                        </div>
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">
                                Tutoring Category
                            </h4>
                            <h2 className="font-bold text-lg">
                                {singleJob?.tutoringCategory}
                            </h2>
                        </div>
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">
                                Education Variant
                            </h4>
                            <h2 className="capitalize font-bold text-lg">
                                {singleJob?.educationVariant}
                            </h2>
                        </div>
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">
                                Tutoring Variant
                            </h4>
                            <h2 className="capitalize font-bold text-lg">
                                {singleJob?.tutoringVariant}
                            </h2>
                        </div>
                    </div>
                    <div className="w-full rounded-md">
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">
                                Student Gender
                            </h4>
                            <h2 className="capitalize font-bold text-lg">
                                {singleJob?.studentGender}
                            </h2>
                        </div>
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">
                                Preferred Gender
                            </h4>
                            <h2 className="capitalize font-bold text-lg">
                                {singleJob?.preferredGender}
                            </h2>
                        </div>
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">Grade</h4>
                            <h2 className="capitalize font-bold text-lg">
                                {singleJob?.grade}
                            </h2>
                        </div>

                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="capitalize font-medium text-sm mb-1">
                                Institute
                            </h4>
                            <h2 className="font-bold text-lg">
                                {singleJob?.institute}
                            </h2>
                        </div>
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">
                                Curriculum
                            </h4>
                            <h2 className="capitalize font-bold text-lg">
                                {singleJob?.curriculum
                                    ? singleJob?.curriculum
                                    : "No Info"}
                            </h2>
                        </div>
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">
                                Location
                            </h4>
                            <h2 className="capitalize font-bold text-lg">
                                {singleJob?.location
                                    ? singleJob?.location
                                    : "No Info"}
                            </h2>
                        </div>
                        <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                            <h4 className="font-medium text-sm mb-1">
                                Job Posted
                            </h4>
                            <h2 className="capitalize font-bold text-lg">
                                {moment(singleJob?.createdAt).format("ll")}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MockTestJobInfo;
