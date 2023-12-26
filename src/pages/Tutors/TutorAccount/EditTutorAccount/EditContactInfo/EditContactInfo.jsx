import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useLazyGetTutorContactInfoQuery,
  useSaveContactInfoMutation,
  useUpdateTutorContactInfoMutation,
} from "../../../../../store/service/tutorInfo/contactInfo/contactInfoApiService";
import { useGetConvenientQuery } from "../../../../../store/service/convenientTime/convenientTimeApiService";
import { ImSpinner9 } from "react-icons/im";

const EditContactInfo = () => {
  const { number } = useParams();
  const navigate = useNavigate();

  const [emergencyNumber, setEmergencyNumber] = useState(null);
  const [emergencyError, setEmergencyError] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState(null);
  const [whatsappNumberError, setWhatsappError] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [facebookURl, setFacebookURl] = useState(null);
  const [googleMeetURL, setGoogleMeetURL] = useState(null);
  const [emergencyContactName, setEmergencyContactName] = useState(null);
  const [emergencyContactPersonRelation, setEmergencyContactPersonRelation] =
    useState("");
  const [interviewTime, setInterviewTime] = useState(null);

  const [contactInfo, setContactInfo] = useState(null);

  const [saveContactInfo, { isLoading }] = useSaveContactInfoMutation();
  const [getContactInfo, { isLoading: getContactInfoLoading }] =
    useLazyGetTutorContactInfoQuery();
  const [updateContactInfo, { isLoading: contactInfoUpdateLoading }] =
    useUpdateTutorContactInfoMutation();

  const { data: convenientTimesData } = useGetConvenientQuery();
  const convenientTimes = convenientTimesData?.data;

  useEffect(() => {
    if (number) {
      setFetchLoading(true);
      const fetch = async () => {
        const result = await getContactInfo(number);
        console.log(result);
        if (result?.data?.success) {
          const contactInfo = result?.data?.data;
          setContactInfo(contactInfo);
          setFacebookURl(contactInfo?.facebookUrl);
          setGoogleMeetURL(contactInfo?.googleMeetUrl);
          setEmergencyContactName(contactInfo?.emergencyContactName);
          setEmergencyContactPersonRelation(
            contactInfo?.emergencyContactRelation
          );
          setInterviewTime(contactInfo?.interviewConvenientTime);
          setEmergencyNumber(`+${contactInfo?.emergencyContactNumber}`);
          setWhatsappNumber(`+${contactInfo?.whatsappNumber}`);
        }
      };

      fetch();
      setFetchLoading(false);
    }
  }, [number]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let contactData;

    let result;

    if (contactInfo) {
      contactData = {
        phoneNumber: number,
        facebookUrl: data?.facebookUrl ? data?.facebookUrl : facebookURl,
        googleMeetUrl: data?.googleMeetUrl
          ? data?.googleMeetUrl
          : googleMeetURL,
        emergencyContactName: data?.emergencyContactName
          ? data?.emergencyContactName
          : emergencyContactName,
        emergencyContactNumber: emergencyNumber.substring(1),
        emergencyContactRelation: data?.emergencyContactRelation
          ? data?.emergencyContactRelation
          : emergencyContactPersonRelation,
        whatsappNumber: whatsappNumber.substring(1),
        interviewConvenientTime: data?.interviewConvenientTime
          ? data?.interviewConvenientTime
          : interviewTime,
      };
      result = await updateContactInfo({
        number: number,
        data: contactData,
      });
    } else {
      if (!whatsappNumber) return toast.error("Please add whatsapp number");
      if (!emergencyNumber) return toast.error("Please add emergency number");

      contactData = {
        phoneNumber: number,
        whatsappNumber: whatsappNumber.substring(1),
        emergencyContactNumber: emergencyNumber.substring(1),
        ...data,
      };
      result = await saveContactInfo(contactData);
    }

    if (result.data) {
      const currentContactInfo = result?.data?.data;
      setContactInfo(currentContactInfo);
      setFacebookURl(currentContactInfo?.facebookUrl);
      setGoogleMeetURL(currentContactInfo?.googleMeetUrl);
      setEmergencyContactName(currentContactInfo?.emergencyContactName);
      setEmergencyContactPersonRelation(
        currentContactInfo?.emergencyContactRelation
      );
      setInterviewTime(currentContactInfo?.interviewConvenientTime);
      setEmergencyNumber(`+${currentContactInfo?.emergencyContactNumber}`);
      setWhatsappNumber(`+${currentContactInfo?.whatsappNumber}`);

      toast.success(result.data.message);
      navigate(`/tutor-account-details/${number}`);
    } else {
      toast.error(result.error?.data?.message);
    }
  };

  useEffect(() => {
    {
      whatsappNumber && isValidPhoneNumber(whatsappNumber)
        ? setSubmit(true)
        : setSubmit(false);
    }
    // console.log(phoneNumber?.length)
    if (submit && whatsappNumber?.length < 14) {
      setWhatsappError(true);
    }
  }, [whatsappNumber, submit]);

  useEffect(() => {
    {
      emergencyNumber && isValidPhoneNumber(emergencyNumber)
        ? setSubmit(true)
        : setSubmit(false);
    }
    // console.log(phoneNumber?.length)
    if (submit && emergencyNumber?.length < 14) {
      setEmergencyError(true);
    }
  }, [emergencyNumber, submit]);

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          Update Contact Info
        </h1>
        <Link
          to={`/tutor-account-details/${number}`}
          className="bg-white text-[#1E6CB3] px-5 py-1 rounded-sm font-semibold"
        >
          Back
        </Link>
      </div>
      <div className="border rounded-md bg-white p-2 sm:p-5 md:p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* phone number & whatsapp number */}
          <div className="lg:flex gap-5">
            {/* phone number */}
            <div className="w-full relative">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Phone Number
              </label>
              <input
                type="text"
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                readOnly
                value={number}
              />
            </div>
            {/* whatsapp number */}
            <div className="w-full relative mt-5 lg:mt-0">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Whatsapp Number
              </label>
              <PhoneInput
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 flex items-center w-full px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                international
                countryCallingCodeEditable={true}
                defaultCountry="BD"
                value={whatsappNumber}
                // defaultValue={value}
                onChange={setWhatsappNumber}
              />

              {whatsappNumber && isValidPhoneNumber(whatsappNumber) ? (
                ""
              ) : (
                <p
                  className={`text-red-500 ${!whatsappNumberError && "hidden"}`}
                >
                  Please enter a valid whatsapp number
                </p>
              )}
            </div>
          </div>

          {/* facebook & meet url */}
          <div className="lg:flex gap-5 my-10">
            {/* facebook */}
            <div className="w-full">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Tutor&apos;s Facebook ID URL
              </label>
              <input
                type="url"
                {...register(
                  "facebookUrl",
                  {
                    required: contactInfo
                      ? false
                      : "Facebook id link is required",
                  },
                  {
                    pattern: /^(ftp|http|https):\/\/[^ "]+$/,
                  }
                )}
                defaultValue={facebookURl}
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="https://www.facebook.com"
              />
              {errors.facebookUrl && (
                <p className="text-red-500">{errors.facebookUrl.message}</p>
              )}
            </div>
            {/* meet */}
            <div className="w-full">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Tutor&apos;s Online Google Meets Link
              </label>
              <input
                type="url"
                {...register(
                  "googleMeetUrl",
                  {
                    required: contactInfo
                      ? false
                      : "Google meet link is required",
                  },
                  {
                    pattern: /^(ftp|http|https):\/\/[^ "]+$/,
                  }
                )}
                defaultValue={googleMeetURL}
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="https://meet.google.com/"
              />
              {errors.googleMeetUrl && (
                <p className="text-red-500">{errors.googleMeetUrl.message}</p>
              )}
            </div>
          </div>

          {/* emergency contact person name & relation */}
          <div className="lg:flex gap-5 my-10">
            {/* name */}
            <div className="w-full">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Emergency Contact Person Name
              </label>
              <input
                type="text"
                {...register("emergencyContactName", {
                  required: contactInfo ? false : "Name is required",
                })}
                defaultValue={emergencyContactName}
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Relative Name"
              />
              {errors.emergencyContactName && (
                <p className="text-red-500">
                  {errors.emergencyContactName.message}
                </p>
              )}
            </div>
            {/* relation */}
            <div className="w-full">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Relation
              </label>
              <select
                {...register("emergencyContactRelation", {
                  required: contactInfo
                    ? false
                    : "Emergency Contact Person relation is required",
                })}
                defaultValue={emergencyContactPersonRelation}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select Option</option>
                <option
                  selected={emergencyContactPersonRelation === "father"}
                  value="father"
                >
                  Father
                </option>
                <option
                  selected={emergencyContactPersonRelation === "mother"}
                  value="mother"
                >
                  Mother
                </option>
                <option
                  selected={emergencyContactPersonRelation === "brother"}
                  value="brother"
                >
                  Brother
                </option>
                <option
                  selected={emergencyContactPersonRelation === "sister"}
                  value="sister"
                >
                  Sister
                </option>
                <option
                  selected={emergencyContactPersonRelation === "other"}
                  value="other"
                >
                  Other
                </option>
              </select>
              {errors.emergencyContactRelation && (
                <p className="text-red-500">
                  {errors.emergencyContactRelation.message}
                </p>
              )}
            </div>
          </div>

          {/* emergency contact number & interview time */}
          <div className="lg:flex gap-5 my-10">
            {/* number */}
            <div className="w-full relative mt-5 lg:mt-0">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Emergency Contact Number
              </label>
              <PhoneInput
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light flex items-center"
                international
                countryCallingCodeEditable={true}
                defaultCountry="BD"
                value={emergencyNumber}
                // defaultValue={value}
                onChange={setEmergencyNumber}
              />

              {emergencyNumber && isValidPhoneNumber(emergencyNumber) ? (
                ""
              ) : (
                <p className={`text-red-500 ${!emergencyError && "hidden"}`}>
                  Please enter a valid phone number
                </p>
              )}
            </div>
            {/* interview time */}
            <div className="w-full">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Set your convenient time to interview
              </label>

              <select
                defaultValue={""}
                className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("interviewConvenientTime", {
                  required: contactInfo
                    ? false
                    : "Interview convenient time is Required",
                })}
              >
                <option disabled value="">
                  Select Time
                </option>
                {convenientTimes?.map((convenientTime, idx) => (
                  <option
                    key={idx}
                    selected={
                      interviewTime?.toLowerCase() ===
                      convenientTime?.timer?.toLowerCase()
                    }
                    value={convenientTime?.timer}
                  >
                    {convenientTime?.timer}
                  </option>
                ))}
              </select>
              {errors.interviewConvenientTime ? (
                <p className="text-red-500">
                  {errors.interviewConvenientTime.message}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4 mb-10">
            <button
              type="submit"
              disabled={isLoading || contactInfoUpdateLoading || !submit}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              {isLoading || contactInfoUpdateLoading ? (
                <ImSpinner9 className="animate-spin my-1 mx-4" />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContactInfo;
