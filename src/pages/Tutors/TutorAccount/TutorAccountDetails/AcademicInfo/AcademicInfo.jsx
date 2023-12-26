import React from "react";

const CommonComponent = ({ name, value }) => {
  return (
    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
      <h4 className="font-medium text-sm mb-1">{name}</h4>
      <h2 className="font-bold text-lg">{value}</h2>
    </div>
  );
};

const AcademicInfo = ({ academicInfo, number }) => {
  return (
    // <div>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">Education Variant: </span>{" "}
    //     {academicInfo?.educationVariant}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">School Name: </span>{" "}
    //     {academicInfo?.schoolName}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">High School Board: </span>{" "}
    //     {academicInfo?.highSchoolBoard}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">High School Result: </span>{" "}
    //     {academicInfo?.highSchoolResult}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">Collage Name: </span>{" "}
    //     {academicInfo?.collageName}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">Collage Board: </span>{" "}
    //     {academicInfo?.collageBoard}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">Collage Result: </span>{" "}
    //     {academicInfo?.collageResult}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">University Name: </span>{" "}
    //     {academicInfo?.universityName}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">Subject Name: </span>{" "}
    //     {academicInfo?.subjectsName}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">University Running Year: </span>{" "}
    //     {academicInfo?.universityRunningYear}
    //   </p>
    //   <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
    //     <TbSquareRoundedCheckFilled />{" "}
    //     <span className="font-semibold">Current Affair: </span>{" "}
    //     {academicInfo?.currentAffair}
    //   </p>
    // </div>
    <div>
      <div className="col-span-12 xl:col-span-8 bg-white  my-10">
        <div className="shadow-md rounded-lg">
          <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
            <div>
              <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                Academic Info
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
            <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-2  gap-x-2">
              <CommonComponent
                name={"Education Variant"}
                value={academicInfo?.educationVariant}
              />
              <CommonComponent
                name={"School Name"}
                value={academicInfo?.schoolName}
              />
              <CommonComponent
                name={"High School Board"}
                value={academicInfo?.highSchoolBoard}
              />
              <CommonComponent
                name={"High School Result"}
                value={academicInfo?.highSchoolResult}
              />
              <CommonComponent
                name={"Collage Name"}
                value={academicInfo?.collageName}
              />
              <CommonComponent
                name={"Collage Board"}
                value={academicInfo?.collageBoard}
              />
              <CommonComponent
                name={"Collage Result"}
                value={academicInfo?.collageResult}
              />
              <CommonComponent
                name={"University Name"}
                value={academicInfo?.universityName}
              />
              <CommonComponent
                name={"Subject Name"}
                value={academicInfo?.subjectsName}
              />
              <CommonComponent
                name={"University Running Year"}
                value={academicInfo?.universityRunningYear}
              />
              <CommonComponent
                name={"Current Affair"}
                value={academicInfo?.currentAffair}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicInfo;
