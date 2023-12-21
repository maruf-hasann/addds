const ParentDetails = () => {
    return (
        <div className="pt-10 px-2">
            {/* Parent Info Image and Info */}
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 bg-white ">
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
                                        <h2 className="font-bold text-lg">
                                            ABC
                                        </h2>
                                    </div>
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Full Name
                                        </h4>
                                        <h2 className="font-bold text-lg">
                                            ABC
                                        </h2>
                                    </div>
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Full Name
                                        </h4>
                                        <h2 className="font-bold text-lg">
                                            ABC
                                        </h2>
                                    </div>
                                </div>
                                <div className="w-full rounded-md">
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Full Name
                                        </h4>
                                        <h2 className="font-bold text-lg">
                                            ABC
                                        </h2>
                                    </div>
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Full Name
                                        </h4>
                                        <h2 className="font-bold text-lg">
                                            ABC
                                        </h2>
                                    </div>
                                    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                        <h4 className="font-medium text-sm mb-1">
                                            Full Name
                                        </h4>
                                        <h2 className="font-bold text-lg">
                                            ABC
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <div>
                        <div className="p-3 w-full bg-white shadow-md rounded-lg">
                            <img
                                src="http://admin.carbangla.com/img/placeholder-profile.png"
                                className="inline-block w-full"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="my-4 rounded-md shadow-md">
                        <div className="w-full ">
                            <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                <h4 className="font-medium text-sm mb-1">
                                    Full Name
                                </h4>
                                <h2 className="font-bold text-lg">ABC</h2>
                            </div>
                            <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                <h4 className="font-medium text-sm mb-1">
                                    Full Name
                                </h4>
                                <h2 className="font-bold text-lg">ABC</h2>
                            </div>
                            <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                                <h4 className="font-medium text-sm mb-1">
                                    Full Name
                                </h4>
                                <h2 className="font-bold text-lg">ABC</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white ">
                        Student Information
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b ">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">Silver</td>
                            <td className="px-6 py-4">Laptop</td>
                            <td className="px-6 py-4">$2999</td>
                            <td className="px-6 py-4 text-right">
                                <span className="font-medium flex justify-start text-blue-600  hover:underline cursor-pointer">
                                    Edit
                                </span>
                            </td>
                        </tr>
                        <tr className="bg-white border-b ">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">Silver</td>
                            <td className="px-6 py-4">Laptop</td>
                            <td className="px-6 py-4">$2999</td>
                            <td className="px-6 py-4 text-right">
                                <span className="font-medium flex justify-start text-blue-600  hover:underline">
                                    Edit
                                </span>
                            </td>
                        </tr>
                        <tr className="bg-white border-b ">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">Silver</td>
                            <td className="px-6 py-4">Laptop</td>
                            <td className="px-6 py-4">$2999</td>
                            <td className="px-6 py-4 text-right">
                                <span className="font-medium flex justify-start text-blue-600  hover:underline">
                                    Edit
                                </span>
                            </td>
                        </tr>
                        <tr className="bg-white border-b ">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">Silver</td>
                            <td className="px-6 py-4">Laptop</td>
                            <td className="px-6 py-4">$2999</td>
                            <td className="px-6 py-4 text-right">
                                <span className="font-medium flex justify-start text-blue-600  hover:underline">
                                    Edit
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ParentDetails;
