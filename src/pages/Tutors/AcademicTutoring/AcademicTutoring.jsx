import { FaStreetView } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetListOfTutorWithTutoringInfoQuery } from "../../../store/service/tutorInfoFilter/tutorInfoFilterApiService";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { CiCircleRemove } from "react-icons/ci";
import { useState } from "react";
import DataTable from "../../../components/Shared/DataTable/DataTable";

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

  const { data: tutorsInfoData, isLoading } =
    useGetListOfTutorWithTutoringInfoQuery();
  const tutorsInfo = tutorsInfoData?.data;

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

  return (
    <div className="py-10 w-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          All Academic Tutoring
        </h1>
      </div>
      <DataTable
        isLoading={isLoading}
        F
        error={false}
        tableData={tutorsInfo}
        handleSelectedRowItem={(data) => console.log(data)}
        columns={[
          // personal info start
          {
            name: "Profile",
            render: ({ item }) => (
              <div>
                {item?.identityInfo?.personalPhoto ? (
                  <img
                    src={item?.identityInfo?.personalPhoto}
                    alt=""
                    className="h-12 w-12 object-cover rounded-full"
                  />
                ) : (
                  "N/A"
                )}
              </div>
            ),
          },
          {
            name: "Name",
            dataIndex: "personalInfo",
            dataIndex2: "fullName",
            key: "_id",
          },
          {
            name: "Number",
            dataIndex: "personalInfo",
            dataIndex2: "phoneNumber",
            key: "_id",
          },
          // tutoring info
          {
            name: "Tutoring Variant",
            render: ({ item }) => (
              <div>
                {item?.tutoringInfo?.tutoringVariant?.length
                  ? item?.tutoringInfo?.tutoringVariant?.map((variant, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {variant?.variantName}
                      </span>
                    ))
                  : "N/A"}
              </div>
            ),
          },
          {
            name: "Tutoring Grade",
            render: ({ item }) => (
              <div>
                {item?.tutoringInfo?.tutoringGrade?.length
                  ? item?.tutoringInfo?.tutoringGrade?.map((grade, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {grade?.gradeName}
                      </span>
                    ))
                  : "N/A"}
              </div>
            ),
          },
          {
            name: "Tutoring Curriculum",
            render: ({ item }) => (
              <div>
                {item?.tutoringInfo?.tutoringCurriculum?.length
                  ? item?.tutoringInfo?.tutoringCurriculum?.map(
                      (curriculum, idx) => (
                        <span key={idx} className={tableDataArrayClasses}>
                          {curriculum?.curriculumBoard}
                        </span>
                      )
                    )
                  : "N/A"}
              </div>
            ),
          },
          {
            name: "Tutoring Subjects",
            render: ({ item }) => (
              <div className="flex">
                {item?.tutoringInfo?.tutoringSubjects?.length
                  ? transformSubjectArray(
                      item?.tutoringInfo?.tutoringSubjects
                    )?.map((subject, idx) => (
                      <span key={idx} className={tableDataArrayClasses}>
                        {subject.subSubjects?.length
                          ? `${subject.mainSubject}(${subject?.subSubjects?.map(
                              (subSub) => subSub
                            )})`
                          : subject?.mainSubject}
                      </span>
                    ))
                  : "N/A"}
              </div>
            ),
          },
          {
            name: "Teach Test Papers",
            render: ({ item }) => (
              <div>{item?.tutoringInfo?.isTeachTestPapers ? "Yes" : "No"}</div>
            ),
          },
          {
            name: "Test Paper Subjects",
            render: ({ item }) => (
              <div>
                {item?.tutoringInfo?.isTeachTestPapers ? (
                  <div className="flex">
                    {transformSubjectArray(
                      item?.tutoringInfo?.teachTestPapers
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
                ) : (
                  "N/A"
                )}
              </div>
            ),
          },
          {
            name: "Teach Admission Test",
            render: ({ item }) => (
              <div>
                {item?.tutoringInfo?.isTeachAdmissionTest ? "Yes" : "No"}
              </div>
            ),
          },
          {
            name: "Admission Test Subjects",
            render: ({ item }) => (
              <div>
                {item?.tutoringInfo?.isTeachAdmissionTest ? (
                  <div className="flex">
                    {transformSubjectArray(
                      item?.tutoringInfo?.teachAdmissionTest
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
                ) : (
                  "N/A"
                )}
              </div>
            ),
          },
          // additional tutoring info
          {
            name: "Grow Tutoring Program",
            render: ({ item }) => (
              <div>
                {item?.additionalTutoringInfo?.isGrowTutoringProgram
                  ? "Yes"
                  : "No"}
              </div>
            ),
          },
          {
            name: "Tutoring Programs",
            render: ({ item }) => (
              <div>
                {item?.additionalTutoringInfo?.tutoringProgram?.length
                  ? item?.additionalTutoringInfo?.tutoringProgram?.map(
                      (program, idx) => (
                        <span key={idx} className={tableDataArrayClasses}>
                          {program?.programName}
                        </span>
                      )
                    )
                  : "N/A"}
              </div>
            ),
          },
          {
            name: "Tutoring Training",
            render: ({ item }) => (
              <div>
                {item?.additionalTutoringInfo?.isGrowTutoringProgram
                  ? "Yes"
                  : "No"}
              </div>
            ),
          },
          {
            name: "Teaching Experience",
            render: ({ item }) => (
              <div>
                {item?.additionalTutoringInfo?.isGrowTutoringProgram
                  ? "Yes"
                  : "No"}
              </div>
            ),
          },
          {
            name: "Years of Experience",
            dataIndex: "additionalTutoringInfo",
            dataIndex2: "yearsOfExperience",
            key: "_id",
          },

          {
            name: "Teaching History",
            render: ({ item }) => (
              <div>
                {item?.additionalTutoringInfo?.teachingHistory ? (
                  item?.additionalTutoringInfo?.teachingHistory?.length > 30 ? (
                    <p>
                      {item?.additionalTutoringInfo?.teachingHistory?.slice(
                        0,
                        30
                      )}
                      <span
                        onClick={() => {
                          setOpenTextForModal(!openTextForModal);
                          setTextForModal(
                            item?.additionalTutoringInfo?.teachingHistory
                          );
                        }}
                        className="cursor-pointer text-[#1D6AAF]"
                      >
                        ...See More
                      </span>
                    </p>
                  ) : (
                    item?.additionalTutoringInfo?.teachingHistory
                  )
                ) : (
                  "N/A"
                )}
              </div>
            ),
          },
          {
            name: "Tutoring Place",
            render: ({ item }) => (
              <div>
                {item?.additionalTutoringInfo?.tutoringPlace?.length
                  ? item?.additionalTutoringInfo?.tutoringPlace?.map(
                      (place, idx) => (
                        <span key={idx} className={tableDataArrayClasses}>
                          {place?.placeName}
                        </span>
                      )
                    )
                  : "N/A"}
              </div>
            ),
          },
          {
            name: "Student Variant",
            render: ({ item }) => (
              <div>
                {item?.additionalTutoringInfo?.studentVariant?.length
                  ? item?.additionalTutoringInfo?.studentVariant?.map(
                      (variant, idx) => (
                        <span key={idx} className={tableDataArrayClasses}>
                          {variant?.variantName}
                        </span>
                      )
                    )
                  : "N/A"}
              </div>
            ),
          },
          {
            name: "Min. Exp. Salary",
            dataIndex: "additionalTutoringInfo",
            dataIndex2: "minExpectedSalary",
            key: "_id",
          },
          {
            name: "Max. Exp. Salary",
            dataIndex: "additionalTutoringInfo",
            dataIndex2: "maxExpectedSalary",
            key: "_id",
          },
          {
            name: "Tutoring Location",
            render: ({ item }) => (
              <div>
                {item?.additionalTutoringInfo?.tutoringLocation?.length
                  ? item?.additionalTutoringInfo?.tutoringLocation?.map(
                      (location, idx) => (
                        <span key={idx} className={tableDataArrayClasses}>
                          {location?.locationName}
                        </span>
                      )
                    )
                  : "N/A"}
              </div>
            ),
          },
          {
            name: "Personal Statement",
            render: ({ item }) => (
              <div>
                {item?.additionalTutoringInfo?.personalStatement?.length ? (
                  item?.additionalTutoringInfo?.personalStatement?.length >
                  30 ? (
                    <p>
                      {item?.additionalTutoringInfo?.personalStatement?.slice(
                        0,
                        30
                      )}
                      <span
                        onClick={() => {
                          setOpenTextForModal(!openTextForModal);
                          setTextForModal(
                            item?.additionalTutoringInfo?.personalStatement
                          );
                        }}
                        className="cursor-pointer text-[#1D6AAF]"
                      >
                        ...See More
                      </span>
                    </p>
                  ) : (
                    item?.additionalTutoringInfo?.personalStatement
                  )
                ) : (
                  "N/A"
                )}
              </div>
            ),
          },
          {
            name: "Promotion",
            render: ({ item }) => (
              <div className="flex justify-between">
                {/* media gallery */}
                {item?.promoInfo?.mediaGallery?.length ? (
                  <p
                    onClick={() => {
                      setOpenPromoImagesModal(!openPromoImagesModal);
                      setPromoImages(item?.promoInfo?.mediaGallery);
                    }}
                    className="border-r  w-full px-5 cursor-pointer hover:text-[#1D6AAF]"
                  >
                    Show Images
                  </p>
                ) : (
                  <p className="border-r  w-full px-5 ">N/A</p>
                )}
                {/* video gallery */}
                {item?.promoInfo?.videoGallery?.length ? (
                  <p
                    onClick={() => {
                      setOpenPromoVideosModal(!openPromoVideosModal);
                      setPromoVideos(item?.promoInfo?.videoGallery);
                    }}
                    className="border-l  w-full px-5 cursor-pointer hover:text-[#1D6AAF]"
                  >
                    Show Videos
                  </p>
                ) : (
                  <p className="border-l  w-full px-5 ">N/A</p>
                )}
              </div>
            ),
          },
          {
            name: "Actions",
            render: ({ item }) => (
              <div className="flex gap-2">
                <Link
                  to={`/academic-tutoring-details/${item?.personalInfo?.phoneNumber}`}
                  className="text-center flex justify-center mx-auto"
                >
                  <FaStreetView
                    title="View Profile"
                    className="text-center mx-auto cursor-pointer hover:text-blue-500"
                  />
                </Link>
              </div>
            ),
          },
        ]}
      />

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
