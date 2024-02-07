import { Link, useParams } from "react-router-dom";
import { ImSpinner10 } from "react-icons/im";
import { BiSolidUserAccount } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import { SiMicrosoftacademic } from "react-icons/si";
import { FaBookOpenReader } from "react-icons/fa6";
import { useGetCoachingByUserQuery } from "../../../store/service/tutorInfo/coaching/coachingApiService";
import AllCoaching from "./AllCoaching/AllCoaching";

const TutorCoaching = () => {
  const { number } = useParams();

  const { data: allCoachingData, isLoading } =
    useGetCoachingByUserQuery(number);
  const allCoaching = allCoachingData?.data;

  return (
    <div className="py-10">
      {isLoading ? (
        <div className="flex justify-center mt-40 h-full items-center">
          <ImSpinner10 className="animate-spin text-5xl text-[#1E6CB3]" />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-5 border-b bg-white shadow-lg rounded-sm  px-3">
            <h1 className="font-bold text-xl md:text-2xl text-[#1e6cb3]">
              Tutor Coaching
            </h1>
            <div className="flex items-center gap-10 mr-10">
              <Link
                to={`/academic-tutoring-details/${number}`}
                className="py-2 text-gray-600 hover:text-primary cursor-pointer"
              >
                <SiMicrosoftacademic
                  className="text-3xl"
                  title="Academic Tutoring"
                />
              </Link>
              <Link
                to={`/tutor-profile/${number}`}
                className="py-2 text-gray-600 hover:text-primary cursor-pointer"
                title="Details"
              >
                <TbListDetails className="text-3xl" />
              </Link>
              <Link
                to={`/tutor-profile-cv-format/${number}`}
                className=" py-2 text-gray-600 hover:text-primary cursor-pointer"
                title="Details In CV Format"
              >
                <BiSolidUserAccount className="text-3xl" />
              </Link>
            </div>
          </div>
          <AllCoaching allCoaching={allCoaching} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default TutorCoaching;
