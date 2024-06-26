import { useParams } from "react-router-dom";
import { useGetParentInfoFilterDataQuery } from "../../../store/service/parentInfoFilter/parentInfoFilterApiService";

const ParentDetails = () => {
    const param = useParams();
    const { data: parentsInfoData } = useGetParentInfoFilterDataQuery(
        param?.number
    );

    const parentsInfo = parentsInfoData?.data?.[0];

    let content = null;
    if (parentsInfo?.contactInfo?.childrenInfo?.length) {
        content = parentsInfo?.contactInfo?.childrenInfo?.map((ci) => (
            <tr key={ci?._id} className="bg-[#f1f5f9] text-gray-700 border-b ">
                <td className="px-6 py-4">{ci?.name}</td>
                <td className="px-6 py-4">{ci?.studentGender}</td>
                <td className="px-6 py-4">{ci?.educationVariant}</td>
                <td className="px-6 py-4">{ci?.grade}</td>
                <td className="px-6 py-4">{ci?.institute}</td>
                <td className="px-6 py-4">{ci?.curriculum}</td>
            </tr>
        ));
    }
    if (!parentsInfo?.contactInfo?.childrenInfo?.length) {
        content = (
            <tr className="bg-[#f1f5f9] text-gray-700 border-b ">
                <td
                    colSpan={6}
                    className="px-6 py-7 text-center font-bold text-gray-700"
                >
                    No Children Info Found!
                </td>
            </tr>
        );
    }

    return (
        <div className="pt-10 px-2">
            {/* Parent Info Image and Info */}
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 ">
                    <div className="shadow-md rounded-lg">
                        <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
                            <div>
                                <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                                    personal Info
                                </h2>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-0 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className="px-5 py-5 bg-[#f1f5f9]">
                            <div className="flex gap-5">
                                <div className="w-full rounded-md">
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Full Name
                                        </h4>
                                        <h2 className="capitalize font-bold text-lg">
                                            {
                                                parentsInfo?.personalInfo
                                                    ?.fullName
                                            }
                                        </h2>
                                    </div>
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Email
                                        </h4>
                                        <h2 className="font-bold text-lg">
                                            {parentsInfo?.personalInfo?.email}
                                        </h2>
                                    </div>
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Gender
                                        </h4>
                                        <h2 className="capitalize font-bold text-lg">
                                            {parentsInfo?.personalInfo?.gender}
                                        </h2>
                                    </div>
                                </div>
                                <div className="w-full rounded-md">
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Country
                                        </h4>
                                        <h2 className="capitalize font-bold text-lg">
                                            {parentsInfo?.personalInfo?.country}
                                        </h2>
                                    </div>
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="capitalize font-medium text-sm mb-1">
                                            City
                                        </h4>
                                        <h2 className="font-bold text-lg">
                                            {parentsInfo?.personalInfo?.city}
                                        </h2>
                                    </div>
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            What's App Number
                                        </h4>
                                        <h2 className="capitalize font-bold text-lg">
                                            {parentsInfo?.contactInfo
                                                ?.whatsappNumber
                                                ? parentsInfo?.contactInfo
                                                      ?.whatsappNumber
                                                : "No Info"}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-md rounded-lg my-5">
                        <div className="relative bg-[#f1f5f9] overflow-x-auto shadow-md sm:rounded-lg my-5">
                            <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
                                <div>
                                    <h2 className="capitalize text-[24px] font-semibold text-gray-800 ">
                                        Children Information
                                    </h2>
                                </div>
                            </div>
                            <table className="w-full bg-[#f1f5f9] text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-md text-gray-800 capitalize  bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Student Gender
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Education Variant
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Grade
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Institute
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Curriculum
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-[#f1f5f9]">{content}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <div>
                        <div className="p-3 w-full bg-white shadow-md rounded-lg h-[362px]">
                            {parentsInfo?.identity?.personalPhoto ? (
                                <img
                                    className="inline-block w-full rounded-full h-full"
                                    src={parentsInfo?.identity?.personalPhoto}
                                    alt={parentsInfo?.identity?.fullName}
                                />
                            ) : (
                                <img
                                    src="http://admin.carbangla.com/img/placeholder-profile.png"
                                    className="inline-block w-full h-full"
                                    alt=""
                                />
                            )}
                        </div>
                    </div>
                    <div className="my-4 rounded-md shadow-md">
                        <div className="w-full ">
                            <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                <h4 className="font-medium text-sm mb-1">
                                    Phone Number
                                </h4>
                                <h2 className="font-bold text-lg">
                                    {parentsInfo?.personalInfo?.phoneNumber}
                                </h2>
                            </div>
                            <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                <h4 className="font-medium text-sm mb-1">
                                    Home Address
                                </h4>
                                <h2 className="font-bold text-lg">
                                    {parentsInfo?.personalInfo?.homeAddress
                                        ? parentsInfo?.personalInfo?.homeAddress
                                        : "No Info"}
                                </h2>
                            </div>
                            <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                <h4 className="font-medium text-sm mb-1">
                                    Area
                                </h4>
                                <h2 className="font-bold text-lg">
                                    {parentsInfo?.personalInfo?.area
                                        ? parentsInfo?.personalInfo?.area
                                        : "No Info"}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentDetails;
