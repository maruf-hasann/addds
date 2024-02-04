/* eslint-disable react/no-unescaped-entities */
"use client";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useSaveContactInfoMutation } from "../../../../store/service/tutorInfo/contactInfo/contactInfoApiService";
import { useGetConvenientQuery } from "../../../../store/service/convenientTime/convenientTimeApiService";
import { validateNumberAndSetError } from "../../../../libs/validateNumberAndSetError";

const ContactInfo = ({ setActiveTab }) => {
  const [number, setNumber] = useState(null);
  const [numberError, setNumberError] = useState(false);
  const [emergencyNumber, setEmergencyNumber] = useState(null);
  const [emergencyError, setEmergencyError] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState(null);
  const [whatsappNumberError, setWhatsappError] = useState(false);

  const numberStates = [
    { number: number, setNumberError: setNumberError },
    { number: whatsappNumber, setNumberError: setWhatsappError },
    { number: emergencyNumber, setNumberError: setEmergencyError },
  ];

  const [saveContactInfo, { isLoading }] = useSaveContactInfoMutation();
  const { data: convenientTimesData } = useGetConvenientQuery();
  const convenientTimes = convenientTimesData?.data;

  // get previous tab number
  useEffect(() => {
    const number = localStorage.getItem("tutor-number");
    setNumber(number);
  }, []);

  // check number is valid or not
  numberStates.forEach(({ number, setNumberError }) => {
    useEffect(() => {
      validateNumberAndSetError(number, setNumberError);
    }, [number]);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // handle submit form
  const onSubmit = async (data) => {
    if (numberError || whatsappNumberError || emergencyError) return;
    if (!number) return toast.error("Please enter a number");
    if (!whatsappNumber) return toast.error("Please enter a whatsapp number");
    if (!emergencyNumber) return toast.error("Please enter a emergency number");
    const contactData = {
      phoneNumber: number?.substring(1),
      whatsappNumber: whatsappNumber?.substring(1),
      emergencyContactNumber: emergencyNumber?.substring(1),
      ...data,
    };
    const result = await saveContactInfo(contactData);

    if (result.data) {
      toast.success(result.data.message);
      localStorage.setItem("tutor-number", number);
      setNumber(null);
      setWhatsappNumber(null);
      setEmergencyNumber(null);
      reset();
      setActiveTab(3);
    } else {
      toast.error(result.error?.data?.message);
    }
  };

  return (
    <>
      <div className="p-2 lg:p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* phone number & whatsapp number */}
          <div className="lg:flex gap-5">
            {/* number */}
            <div className="w-full relative mt-5 lg:mt-0">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Number
              </label>
              <PhoneInput
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full ps-2 flex  items-center gap-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                international
                countryCallingCodeEditable={true}
                defaultCountry="BD"
                value={number}
                onChange={setNumber}
              />

              {number && isValidPhoneNumber(number) ? (
                ""
              ) : (
                <p
                  className={`text-red-500 absolute ${
                    !numberError && "hidden"
                  }`}
                >
                  Please enter a valid number
                </p>
              )}
            </div>
            {/* whatsapp number */}
            <div className="w-full relative mt-5 lg:mt-0">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Whatsapp Number
              </label>
              <PhoneInput
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light w-full ps-2 flex  items-center gap-2"
                international
                countryCallingCodeEditable={true}
                defaultCountry="BD"
                value={whatsappNumber}
                onChange={setWhatsappNumber}
              />

              {whatsappNumber && isValidPhoneNumber(whatsappNumber) ? (
                ""
              ) : (
                <p
                  className={`text-red-500 absolute ${
                    !whatsappNumberError && "hidden"
                  }`}
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
                Tutor's Facebook ID URL
              </label>
              <input
                type="url"
                {...register(
                  "facebookUrl",
                  {
                    required: "Facebook id link is required",
                  },
                  {
                    pattern: /^(ftp|http|https):\/\/[^ "]+$/,
                  }
                )}
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="https://www.facebook.com"
              />
              {errors.facebookUrl && (
                <p className="text-red-500 absolute">
                  {errors.facebookUrl.message}
                </p>
              )}
            </div>
            {/* meet */}
            <div className="w-full">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Tutor's Online Google Meets Link
              </label>
              <input
                type="url"
                {...register(
                  "googleMeetUrl",
                  {
                    required: "Google meet link is required",
                  },
                  {
                    pattern: /^(ftp|http|https):\/\/[^ "]+$/,
                  }
                )}
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="https://meet.google.com/"
              />
              {errors.googleMeetUrl && (
                <p className="text-red-500 absolute">
                  {errors.googleMeetUrl.message}
                </p>
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
                  required: "Name is required",
                })}
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Relative Name"
              />
              {errors.emergencyContactName && (
                <p className="text-red-500 absolute">
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
                  required: "Emergency Contact Person relation is required",
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select Option</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="brother">Brother</option>
                <option value="sister">Sister</option>
                <option value="other">Other</option>
              </select>
              {errors.emergencyContactRelation && (
                <p className="text-red-500 absolute">
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
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light w-full ps-2 flex  items-center gap-2"
                international
                countryCallingCodeEditable={true}
                defaultCountry="BD"
                value={emergencyNumber}
                onChange={setEmergencyNumber}
              />

              {emergencyNumber && isValidPhoneNumber(emergencyNumber) ? (
                ""
              ) : (
                <p
                  className={`text-red-500 absolute ${
                    !emergencyError && "hidden"
                  }`}
                >
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
                className={
                  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
                {...register("interviewConvenientTime", {
                  required: "Interview time is required",
                })}
              >
                <option disabled value="">
                  Select Time
                </option>
                {convenientTimes?.map((convenientTime, idx) => (
                  <option key={idx} value={convenientTime?.timer}>
                    {convenientTime?.timer}
                  </option>
                ))}
              </select>

              {errors.interviewConvenientTime && (
                <p className="text-red-500 absolute">
                  {errors.interviewConvenientTime.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4 mb-10 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              {isLoading ? (
                <ImSpinner9 className="animate-spin my-1 mx-4" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactInfo;
