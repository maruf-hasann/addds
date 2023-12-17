import { FaStreetView } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetTutorInfoFilterDataQuery } from "../../../store/service/tutorInfoFilter/tutorInfoFilterApiService";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { CiCircleRemove } from "react-icons/ci";
import { useState } from "react";

const AcademicTutoring = () => {
  const [openTextForModal, setOpenTextForModal] = useState(false);
  const [textForModal, setTextForModal] = useState(null);
  const [openPromoImagesModal, setOpenPromoImagesModal] = useState(false);
  const [promoImages, setPromoImages] = useState([]);
  const [openPromoVideosModal, setOpenPromoVideosModal] = useState(false);
  const [promoVideos, setPromoVideos] = useState([]);

  const handleOpenTextModal = () => {
    setOpenTextForModal(!openTextForModal);
    setTextForModal(null);
  };

  const handleOpenPromoImagesModal = () => {
    setOpenPromoImagesModal(!openPromoImagesModal);
    setPromoImages([]);
  };

  const handleOpenPromoVideosModal = () => {
    setOpenPromoVideosModal(!openPromoVideosModal);
    setPromoVideos([]);
  };

  const { data: tutorsInfoData } =
    useGetTutorInfoFilterDataQuery("8801708666342");
  const tutorsInfo = tutorsInfoData?.data[0];
  console.log(tutorsInfo);

  const tableDataClasses =
    "px-4 py-3 border-b border-blue-gray-50 whitespace-nowrap";
  const tableDataArrayClasses =
    "bg-gray-200 mx-1 px-2 py-1 hover:text-[#1C6AAF] hover:bg-light-blue-100";
  const tableHeadClasses =
    "text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold whitespace-nowrap";

  const transformSubjectArray = (inputArray) => {
    // Check if the input is an array
    if (!Array.isArray(inputArray)) {
      return;
    }

    return inputArray.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.mainSubject === item.mainSubject);

      if (existingItem) {
        if (item.subSubject) {
          existingItem.subSubjects.push(item.subSubject);
        }
      } else {
        acc.push({
          mainSubject: item.mainSubject,
          subSubjects: item.subSubject ? [item.subSubject] : [],
        });
      }

      return acc;
    }, []);
  };

  const handlePromoImageClick = (index) => {
    // Move the clicked image to the front of the order

    const newOrder = [
      promoImages.find((img, idx) => idx === index),
      ...promoImages.filter((img, idx) => idx !== index),
    ];
    setPromoImages(newOrder);
  };

  const handlePromoVideoClick = (index) => {
    console.log(index);

    // Move the clicked image to the front of the order
    const newOrder = [
      promoVideos.find((video, idx) => idx === index),
      ...promoVideos.filter((video, idx) => idx !== index),
    ];
    console.log(newOrder);
    setPromoVideos(newOrder);
  };

  return (
    <div className="py-10 w-full">
      <div className="flex justify-between items-center pb-3">
        <h1 className="font-bold text-2xl text-white">All Academic Tutoring</h1>
      </div>
      <div className="overflow-x-scroll rounded bg-white">
        <table className="w-full text-left h-auto">
          {/* head */}
          <thead>
            <tr>
              <th className={tableHeadClasses}>Sl</th>
              <th className={tableHeadClasses}>Name</th>
              <th className={tableHeadClasses}>Number</th>
              <th className={tableHeadClasses}>Tutoring Variant</th>
              <th className={tableHeadClasses}>Tutoring Grade</th>
              <th className={tableHeadClasses}>Tutoring Curriculum</th>
              <th className={tableHeadClasses}>Tutoring Subjects</th>
              <th className={tableHeadClasses}>Teach Test Papers</th>
              <th className={tableHeadClasses}>Test Paper Subjects</th>
              <th className={tableHeadClasses}>Teach Admission Test</th>
              <th className={tableHeadClasses}>Admission Test Subjects</th>
              <th className={tableHeadClasses}>Grow Tutoring Program</th>
              <th className={tableHeadClasses}>Tutoring Programs</th>
              <th className={tableHeadClasses}>Tutoring Training</th>
              <th className={tableHeadClasses}>Teaching Experience</th>
              <th className={tableHeadClasses}>Years of Experience</th>
              <th className={tableHeadClasses}>Teaching History</th>
              <th className={tableHeadClasses}>Tutoring Place</th>
              <th className={tableHeadClasses}>Student Variant</th>
              <th className={tableHeadClasses}>Min. Exp. Salary</th>
              <th className={tableHeadClasses}>Max. Exp. Salary</th>
              <th className={tableHeadClasses}>Tutoring Location</th>
              <th className={tableHeadClasses}>Personal Statement</th>
              <th className={`${tableHeadClasses} text-center`}>Promotion</th>
              <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {[tutorsInfo, tutorsInfo]?.map((info, idx) => (
              <tr className={`hover:bg-blue-50`} key={idx}>
                <th className={tableDataClasses}>{idx + 1}</th>
                <td className={tableDataClasses}>
                  {tutorsInfo?.personalInfo?.fullName}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.personalInfo?.phoneNumber}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.tutoringVariant?.map(
                    (variant, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {variant?.variantName}
                      </span>
                    )
                  )}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.tutoringGrade?.map(
                    (grade, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {grade?.gradeName}
                      </span>
                    )
                  )}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.tutoringCurriculum?.map(
                    (curriculum, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {curriculum?.curriculumBoard}
                      </span>
                    )
                  )}
                </td>
                <td className={tableDataClasses}>
                  <div className="flex">
                    {transformSubjectArray(
                      tutorsInfo?.tutoringInfo?.tutoringSubjects
                    )?.map((subject, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {subject.subSubjects?.length
                          ? `${subject.mainSubject}(${subject?.subSubjects?.map(
                              (subSub) => subSub
                            )})`
                          : subject?.mainSubject}
                      </span>
                    ))}
                  </div>
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.isTeachTestPapers ? "Yes" : "No"}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.isTeachTestPapers ? (
                    <div className="flex">
                      {transformSubjectArray(
                        tutorsInfo?.tutoringInfo?.teachTestPapers
                      )?.map((subject, idx) => (
                        <span key={idx} className={tableDataArrayClasses}>
                          {subject.subSubjects?.length
                            ? `${
                                subject.mainSubject
                              }(${subject?.subSubjects?.map(
                                (subSub) => subSub
                              )})`
                            : subject?.mainSubject}
                        </span>
                      ))}
                    </div>
                  ) : (
                    "Empty"
                  )}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.isTeachAdmissionTest
                    ? "Yes"
                    : "No"}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.tutoringInfo?.isTeachAdmissionTest ? (
                    <div className="flex">
                      {transformSubjectArray(
                        tutorsInfo?.tutoringInfo?.teachAdmissionTest
                      )?.map((subject, idx) => (
                        <span key={idx} className={tableDataArrayClasses}>
                          {subject.subSubjects?.length
                            ? `${
                                subject.mainSubject
                              }(${subject?.subSubjects?.map(
                                (subSub) => subSub
                              )})`
                            : subject?.mainSubject}
                        </span>
                      ))}
                    </div>
                  ) : (
                    "Empty"
                  )}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.isGrowTutoringProgram
                    ? "Yes"
                    : "No"}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.tutoringProgram?.map(
                    (program, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {program?.programName}
                      </span>
                    )
                  )}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.isTutoringTraining
                    ? "Yes"
                    : "No"}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.isTeachingExperience
                    ? "Yes"
                    : "No"}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.yearsOfExperience}
                </td>
                <td className={tableDataClasses}>
                  <div>
                    {tutorsInfo?.additionalInfo?.teachingHistory?.length >
                    30 ? (
                      <p>
                        {tutorsInfo?.additionalInfo?.teachingHistory?.slice(
                          0,
                          30
                        )}
                        <span
                          onClick={() => {
                            setOpenTextForModal(!openTextForModal);
                            setTextForModal(
                              tutorsInfo?.additionalInfo?.teachingHistory
                            );
                          }}
                          className="cursor-pointer text-[#1D6AAF]"
                        >
                          ...See More
                        </span>
                      </p>
                    ) : (
                      tutorsInfo?.additionalInfo?.teachingHistory
                    )}
                  </div>
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.tutoringPlace?.map(
                    (place, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {place?.placeName}
                      </span>
                    )
                  )}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.studentVariant?.map(
                    (variant, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {variant?.variantName}
                      </span>
                    )
                  )}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.minExpectedSalary}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.maxExpectedSalary}
                </td>
                <td className={tableDataClasses}>
                  {tutorsInfo?.additionalInfo?.tutoringLocation?.map(
                    (location, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {location?.locationName}
                      </span>
                    )
                  )}
                </td>
                <td className={tableDataClasses}>
                  <div>
                    {tutorsInfo?.additionalInfo?.personalStatement?.length >
                    30 ? (
                      <p>
                        {tutorsInfo?.additionalInfo?.personalStatement?.slice(
                          0,
                          30
                        )}
                        <span
                          onClick={() => {
                            setOpenTextForModal(!openTextForModal);
                            setTextForModal(
                              tutorsInfo?.additionalInfo?.personalStatement
                            );
                          }}
                          className="cursor-pointer text-[#1D6AAF]"
                        >
                          ...See More
                        </span>
                      </p>
                    ) : (
                      tutorsInfo?.additionalInfo?.personalStatement
                    )}
                  </div>
                </td>
                <td className={tableDataClasses}>
                  <div className="flex justify-between">
                    {tutorsInfo?.promoInfo?.mediaGallery?.length ? (
                      <p
                        onClick={() => {
                          setOpenPromoImagesModal(!openPromoImagesModal);
                          setPromoImages(tutorsInfo?.promoInfo?.mediaGallery);
                        }}
                        className="border-r  w-full px-5 cursor-pointer hover:text-[#1D6AAF]"
                      >
                        Show Images
                      </p>
                    ) : (
                      <p className="border-r  w-full px-5 ">No Image</p>
                    )}

                    {tutorsInfo?.promoInfo?.mediaGallery?.length ? (
                      <p
                        onClick={() => {
                          setOpenPromoVideosModal(!openPromoVideosModal);
                          setPromoVideos(tutorsInfo?.promoInfo?.videoGallery);
                        }}
                        className="border-l  w-full px-5 cursor-pointer hover:text-[#1D6AAF]"
                      >
                        Show Videos
                      </p>
                    ) : (
                      <p className="border-l  w-full px-5 ">No Video</p>
                    )}
                  </div>
                </td>
                <td
                  className={`${tableDataClasses} w-[120px] flex gap-3 border-b-0`}
                >
                  <Link
                    to={`/tutor-profile/${tutorsInfo?.personalInfo?.phoneNumber}`}
                    className="text-center flex justify-center mx-auto"
                  >
                    <FaStreetView
                      title="View Profile"
                      className="text-center mx-auto cursor-pointer hover:text-blue-500"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* show large text modal */}
      {textForModal && openTextForModal ? (
        <Dialog open={openTextForModal} handler={handleOpenTextModal}>
          <DialogBody className="relative p-5 pr-10">
            <CiCircleRemove
              onClick={handleOpenTextModal}
              className="cursor-pointer text-4xl text-red-500 absolute top-0 right-0"
            />
            {textForModal}
          </DialogBody>
        </Dialog>
      ) : (
        ""
      )}

      {/* Show all promotion media */}
      {promoImages?.length && openPromoImagesModal ? (
        <Dialog
          size={"lg"}
          open={openPromoImagesModal}
          handler={handleOpenPromoImagesModal}
        >
          <DialogBody className="relative p-10">
            <div className="overflow-y-auto max-h-[600px]">
              <CiCircleRemove
                onClick={handleOpenPromoImagesModal}
                className="cursor-pointer text-4xl text-red-500 absolute top-0 right-0"
              />
              <div
                className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5`}
              >
                {promoImages?.map((image, idx) => (
                  <img
                    key={idx}
                    onClick={() => handlePromoImageClick(idx)}
                    src={image?.imgUrl}
                    className={`${
                      idx === 0
                        ? "col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 w-auto mx-auto h-96"
                        : "h-40 w-full"
                    } object-cover cursor-pointer`}
                  />
                ))}
              </div>
            </div>
          </DialogBody>
        </Dialog>
      ) : (
        ""
      )}
      {/* Show all promotion video */}
      {promoVideos && openPromoVideosModal ? (
        <Dialog
          size={"lg"}
          open={openPromoVideosModal}
          handler={handleOpenPromoVideosModal}
        >
          <DialogBody className="relative p-10">
            <div className="overflow-y-auto max-h-[600px]">
              <CiCircleRemove
                onClick={handleOpenPromoVideosModal}
                className="cursor-pointer text-4xl text-red-500 absolute top-0 right-0"
              />
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-5`}>
                {promoVideos?.map((video, idx) => (
                  <video key={idx} controls width="100%" className={``}>
                    <source src={video?.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ))}
              </div>
            </div>
          </DialogBody>
        </Dialog>
      ) : (
        ""
      )}
    </div>
  );
};

export default AcademicTutoring;
