import { RxCross2 } from "react-icons/rx";
import moment from "moment";
import CoachingSchedule from "./CoachingSchedule/CoachingSchedule";
import { subjectConverter } from "../../../../../libs/tutoringInfo/subjectConverter";
import { useGetWeeklyCoachingScheduleByUserQuery } from "../../../../../store/service/tutorInfo/coaching/coachingSchedule/coachingScheduleApiService";

const CoachingDetails = ({
  isOpenModal,
  setIsOpenModal,
  coaching,
  setCoaching,
}) => {
  const { data: allCoachingScheduleData } =
    useGetWeeklyCoachingScheduleByUserQuery(coaching?.phoneNumber);
  const usersCoachingSchedule = allCoachingScheduleData?.data;

  const currentCoachingSchedule = usersCoachingSchedule?.find(
    (schedule) => schedule?.coachingId === coaching?.coachingId
  );

  const subjects = subjectConverter(coaching?.subjectsList);
  const handleClose = () => {
    setIsOpenModal(false);
    setCoaching(null);
  };
  return (
    <div
      className={`fixed top-[72px] left-0 z-50 p-4 inset-0 flex items-center justify-center backdrop-blur-sm ${
        isOpenModal ? "block" : "hidden"
      }`}
    >
      <div
        className="w-full h-full z-0 absolute top-0 left-0"
        onClick={handleClose}
      ></div>
      <div className="relative z-50 w-full max-w-5xl max-h-full mx-auto overflow-y-auto bg-white rounded-lg shadow-md">
        <div className={`relative shadow bg-white w-full `}>
          <div className="px-4 py-3 border-b sticky top-0 z-50 backdrop-filter backdrop-blur-sm">
            <div className="overflow-hidden">
              <p className="font-semibold whitespace-nowrap">
                {coaching?.title}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 text-2xl hover:text-red-500"
            >
              <RxCross2 />
            </button>
          </div>
          <div className="py-8 px-10">
            <h1 className="font-semibold text-2xl lg:text-3xl">
              {coaching?.title}
            </h1>
            <p className="my-3">{coaching?.aboutCoaching}</p>
            <div>
              <div className="py-5 border-y">
                <h2 className="mb-2 font-semibold text-lg">Program Details</h2>
                <div
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: coaching?.programDetails,
                  }}
                ></div>
              </div>
              <div className="my-5">
                <h2 className="mb-2 font-semibold text-lg">Coaching Fee</h2>

                <p className=" text-gray-600 font-semibold">
                  {coaching?.coachingFee === 0
                    ? "Free"
                    : `BDT.${coaching?.coachingFee}`}
                </p>
              </div>
              {coaching?.feeVariation ? (
                <div className="my-5">
                  <h2 className="mb-2 font-semibold text-lg">Fee Variation</h2>

                  <p className=" text-gray-600 font-semibold">
                    {coaching?.feeVariation}
                  </p>
                </div>
              ) : (
                ""
              )}
              <div className="my-5">
                <h2 className="mb-2 font-semibold text-lg">Duration</h2>
                <div className="grid sm:grid-cols-2  md:flex justify-between items-center">
                  <p className=" text-gray-600 font-semibold">
                    {coaching?.duration}
                  </p>
                  <p className=" text-gray-600 font-semibold">
                    02:30 PM - 03-30 PM
                  </p>
                  <p className=" text-gray-600 font-semibold">
                    Start:{" "}
                    {moment(coaching?.startingDate).format("DD MMM YYYY")}
                  </p>
                </div>
              </div>
              <div className="py-5 border-y">
                <h2 className="mb-2 font-semibold text-lg">Coaching Details</h2>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-5 text-sm">
                    <h2 className="font-semibold w-40">Gender</h2>
                    <p className="text-gray-600 flex-1 capitalize">
                      {coaching?.gender ? coaching.gender : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-start gap-5">
                    <h2 className="font-semibold w-40 text-sm">
                      Tutoring Subjects
                    </h2>
                    <div className="flex-1 flex  items-center gap-2 text-sm">
                      {subjects?.length ? (
                        <div className="flex flex-wrap flex-1 gap-2">
                          {subjects?.map((subject, index) => (
                            <div
                              key={index}
                              className=" text-gray-800 rounded text-sm  bg-gray-200 px-1"
                            >
                              <span className="font-semibold">
                                {subject?.mainSubject
                                  ? subject?.mainSubject
                                  : subject}
                              </span>
                              {subject?.subSubjects?.length > 0 ? (
                                <span> {"("}</span>
                              ) : (
                                ""
                              )}
                              {
                                <>
                                  {subject?.subSubjects?.map((ss, i) => (
                                    <span className="inline-block" key={i}>
                                      {ss}
                                      {subject?.subSubjects?.length > 1 &&
                                        subject?.subSubjects?.length - 1 !==
                                          i &&
                                        ","}
                                    </span>
                                  ))}
                                </>
                              }
                              {subject?.subSubjects?.length > 0 ? (
                                <span>{")"}</span>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-5 text-sm">
                    <h2 className="font-semibold w-40">Education Variant</h2>
                    <p className="text-gray-600 flex-1">
                      {coaching?.educationVariant
                        ? coaching.educationVariant
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 text-sm">
                    <h2 className="font-semibold w-40">Curriculum Board</h2>
                    <p className="text-gray-600 flex-1">
                      {coaching?.curriculumBoard
                        ? coaching?.curriculumBoard
                        : "N/A"}
                    </p>
                  </div>
                  {coaching?.grade?.length ? (
                    <div className="flex items-start gap-5 text-sm">
                      <h2 className="font-semibold w-40">Coaching Grades</h2>
                      <div className="flex-1 flex  items-center gap-2">
                        {coaching?.grade?.map((grade, index) => (
                          <p
                            key={index}
                            className="bg-gray-200 text-gray-800 px-1"
                          >
                            {grade?.className}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {coaching?.eligibleFor?.length ? (
                    <div className="flex items-start gap-5 text-sm">
                      <h2 className="font-semibold w-40">Eligible For</h2>
                      <div className="flex-1 flex  items-center gap-2">
                        {coaching?.eligibleFor?.map((item, index) => (
                          <p
                            key={index}
                            className="bg-gray-200 text-gray-800 px-1"
                          >
                            {item?.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex items-center gap-5 text-sm">
                    <h2 className="font-semibold w-40">Coaching Place</h2>
                    <p className="text-gray-600 flex-1">
                      {coaching?.coachingPlace}
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-5">
                <h2 className="mb-2 font-semibold text-lg">Routine</h2>
                {currentCoachingSchedule ? (
                  <CoachingSchedule schedule={currentCoachingSchedule} />
                ) : (
                  <div className="text-gray-600">N/A</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachingDetails;
