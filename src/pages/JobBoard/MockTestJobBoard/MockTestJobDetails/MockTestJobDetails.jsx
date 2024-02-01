import { useEffect, useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import { useLocation, useParams } from "react-router-dom";
import {
  useLazyGetSingleJobQuery,
  useLazyGetSingleJobUserInfoQuery,
} from "../../../../store/service/jobBoard/jobBoardApiService";
import MockTestJobInfo from "./MockTestJobInfo";
import MockTestJobUserInfo from "./MockTestJobUserInfo";
import { useLazyGetPersonalInfoQuery } from "../../../../store/service/personalInfo/personalInfoApiService";

const MockTestJobDetails = () => {
  /* state  */
  const [isLoading, setIsLoading] = useState(false);
  const [singleJob, setSingleJob] = useState({});
  const [personalInfo, setPersonalInfo] = useState({});
  const [singleJobUserInfo, setSingleJobUserInfo] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  const { jobType, jobId } = useParams();

  // redux api
  const [getSingleJob] = useLazyGetSingleJobQuery();
  const [getSingleJobUserInfo] = useLazyGetSingleJobUserInfoQuery();
  const [getPersonalInfo] = useLazyGetPersonalInfoQuery();

  useEffect(() => {
    setIsLoading(true);
    if (jobId && jobType) {
      const func = async () => {
        const result = await getSingleJob({
          jobId: jobId,
          jobType: jobType,
        });
        const response = await getSingleJobUserInfo({
          jobId: jobId,
          jobType: jobType,
        });
        if (result?.data?.success && response?.data?.success) {
          setSingleJob(result?.data?.data?.[0]);
          setSingleJobUserInfo(response?.data?.data);
          const jobPhoneNumber = result?.data?.data?.[0]?.phoneNumber;
          if (jobPhoneNumber) {
            const personalInfoResult = await getPersonalInfo(jobPhoneNumber);
            if (personalInfoResult?.data?.success) {
              setPersonalInfo(personalInfoResult?.data?.data);
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      };

      func();
    } else {
      setSingleJob({});
      setIsLoading(false);
    }
  }, [getSingleJob, getSingleJobUserInfo]);

  // animation doing icons close
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isVisible]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  let content = null;

  if (singleJob?.tutoringSubjects?.length) {
    content = singleJob?.tutoringSubjects?.map((sub, idx) => (
      <tr key={idx} className="bg-[#f1f5f9] text-gray-700 border-b ">
        <td className="px-6 py-4">{sub?.mainSubject}</td>
        <td className="px-6 py-4">{sub?.subSubject}</td>
        <td className="px-6 py-4">{sub?.price}</td>
      </tr>
    ));
  }
  if (!singleJob?.tutoringSubjects?.length) {
    content = (
      <tr className="bg-[#f1f5f9] text-gray-700 border-b ">
        <td
          colSpan={6}
          className="px-6 py-7 text-center font-bold text-gray-700"
        >
          No Tutoring Subjects Found!
        </td>
      </tr>
    );
  }

  return (
    <div className="pt-10 px-2">
      {/* Single Info Image and Info */}
      {isLoading ? (
        <div className="flex justify-center mt-40 h-full items-center">
          <ImSpinner10 className="animate-spin text-5xl text-[#1E6CB3]" />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4 ">
          <div className="col-span-12 2xl:col-span-8">
            {/* Mock Test Info */}
            <MockTestJobInfo singleJob={singleJob} />
            {/* Mock Test User Info */}
            <MockTestJobUserInfo singleJobUserInfo={personalInfo} />
            <div className="shadow-md rounded-lg my-5">
              <div className="relative bg-[#f1f5f9] overflow-x-auto shadow-md sm:rounded-lg my-5">
                <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
                  <div>
                    <h2 className="capitalize text-[24px] font-semibold text-gray-800 ">
                      Mock Test Tutoring Subjects
                    </h2>
                  </div>
                </div>
                <table className="w-full bg-[#f1f5f9] text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-md text-gray-800 capitalize  bg-gray-50 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Main Subject
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Sub Subject
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#f1f5f9]">{content}</tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-span-12 2xl:col-span-4 sticky">
            <div>
              <div className="p-3 w-full bg-white shadow-md rounded-lg h-[362px] flex items-center justify-center">
                {personalInfo?.phoneNumber ? (
                  <img
                    src={`https://schooling-dev.s3.ap-southeast-1.amazonaws.com/${personalInfo?.phoneNumber}-personal-photo.jpg`}
                    className="inline-block size-80 2xl:size-60 rounded-full object-cover"
                    alt=""
                  />
                ) : (
                  "hello"
                )}
              </div>
            </div>
            <div className="my-4 rounded-md shadow-md">
              <div className="w-full ">
                <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                  <h4 className="font-medium text-sm mb-1">Phone Number</h4>
                  <h2 className="font-bold text-lg">
                    {personalInfo?.phoneNumber
                      ? personalInfo?.phoneNumber
                      : "No Info"}
                  </h2>
                </div>

                <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                  <h4 className="font-medium text-sm mb-1">Full Name</h4>
                  <h2 className="font-bold text-lg capitalize">
                    {personalInfo?.fullName
                      ? personalInfo?.fullName
                      : "No Info"}
                  </h2>
                </div>

                <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                  <h4 className="font-medium text-sm mb-1">Location</h4>
                  <h2 className="font-bold text-lg capitalize">
                    {personalInfo?.city ? (
                      <>
                        {personalInfo?.area}
                        {personalInfo?.area ? ", " : ""} {personalInfo?.city}
                      </>
                    ) : (
                      "No Info"
                    )}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockTestJobDetails;
