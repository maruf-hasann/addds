/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { useEffect } from "react";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";

import { useSavePersonalInfoMutation } from "../../../../store/service/personalInfo/personalInfoApiService";
import axios from "axios";
import { ImSpinner10, ImSpinner9 } from "react-icons/im";
import { useLazyGetLocationByCityQuery } from "../../../../store/service/tutoringLocation/tutoringLocationApiService";

const PersonalInfo = ({ setActiveTab }) => {
  const [number, setNumber] = useState(null);
  const [numberError, setNumberError] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [locations, setLocations] = useState([]);

  const [tutorRegistration, { isLoading }] = useSavePersonalInfoMutation();
  const [getLocations] = useLazyGetLocationByCityQuery();

  // get country, state, city header
  const headers = {
    "X-CSCAPI-KEY": "OHJGV1poUEN5TzhYT3B2SU1yRHNIUGxHczl1SXVjYUd3Q3RTS1Q3UQ==",
  };

  // fetch all countries
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.countrystatecity.in/v1/countries",
          {
            headers,
          }
        );
        setCountries(response.data);
        setSelectedCountry(
          response.data?.find((country) => country?.iso2 === "BD")
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  // fetch area by city
  useEffect(() => {
    if (selectedState) {
      const fetchLocations = async () => {
        const result = await getLocations(selectedState);
        if (result?.data?.success) {
          setLocations(result.data.data);
        }
      };

      fetchLocations();
    }
  }, [selectedState]);

  // fetch all states
  useEffect(() => {
    if (selectedCountry) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://api.countrystatecity.in/v1/countries/${selectedCountry?.iso2}/states`,
            {
              headers,
            }
          );
          setStates(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();

      return () => {};
    }
  }, [selectedCountry]);

  // handle select country
  const handleSelectCountry = (id) => {
    setSelectedState("");
    setLocations([]);
    setSelectedCountry(countries.find((country) => country.id === Number(id)));
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  // handle check valid number or not
  useEffect(() => {
    if (number && !isValidPhoneNumber(number) && number?.length < 14) {
      setNumberError(true);
    } else {
      setNumberError(false);
    }
  }, [number]);

  // handle register tutor
  const onSubmit = async (data) => {
    if (!number) {
      return toast.error("please enter a number");
    }
    if (numberError) {
      return toast.error("please enter a valid number");
    }

    if (!selectedCountry) {
      return toast.error("Please select a country");
    }
    if (!selectedState) {
      return toast.error("Please select a City");
    }

    const registrationData = {
      phoneNumber: number.substring(1),
      fullName: data.fullName,
      email: data.email,
      country: selectedCountry?.name,
      city: selectedState,
      gender: data.gender,
      role: 'tutor',
      otp: Number(data.otp),
      homeAddress: data.homeAddress,
      area: data.area,
    };

    const result = await tutorRegistration(registrationData);
    if (result.data) {
      toast.success(result.data.message);
      localStorage.setItem("tutor-number", number);
      reset();
      setActiveTab(2);
    } else {
      toast.error(result.error.data.message);
    }
  };

  return (
    <div className="p-2 lg:p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* number and otp */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
          {/* number */}
          <div className="relative">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Number
            </label>
            <div className="relative">
              <PhoneInput
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full ps-2 flex items-center gap-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light number-with-button"
                international
                countryCallingCodeEditable={true}
                defaultCountry="BD"
                value={number}
                onChange={setNumber}
              />
            </div>

            {number && isValidPhoneNumber(number) ? (
              ""
            ) : (
              <p
                className={`text-red-500 ${!numberError && "hidden"} absolute`}
              >
                Please enter a valid number
              </p>
            )}
          </div>

          {/* otp */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              OTP
            </label>
            <input
              type="number"
              {...register("otp", { required: "OTP is required" })}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light appearance-none"
              placeholder="******"
            />
            {errors.otp && (
              <p className="text-red-500 absolute">{errors.otp.message}</p>
            )}
          </div>
        </div>
        {/* full name and email */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
          {/* full name */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-red-500 absolute">{errors.fullName.message}</p>
            )}
          </div>
          {/* email */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="example@mail.com"
            />
            {errors.email && (
              <p className="text-red-500 absolute">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/*gender & country */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
          {/* gender */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Gender Selection
            </label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 absolute">{errors.gender.message}</p>
            )}
          </div>
          {/* country */}
          <div className={`w-full`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Select Country
            </label>
            <select
              {...register("country", {
                required: selectedCountry ? false : "Country is required",
              })}
              defaultValue=""
              className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event) => handleSelectCountry(event.target.value)}
            >
              <option value="" disabled>
                Choose Country
              </option>
              {countries?.map((country, idx) => (
                <option
                  selected={country?.iso2 === "BD"}
                  key={idx}
                  value={country.id}
                >
                  {country?.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500 absolute">{errors.country.message}</p>
            )}
          </div>
        </div>

        {/*city & area*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
          {/* city */}
          <div className={`w-full`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Select City
            </label>
            <select
              {...register("city", { required: "City is required" })}
              defaultValue=""
              className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event) => setSelectedState(event.target.value)}
            >
              <option value="" disabled selected={!selectedState}>
                Choose City
              </option>
              {states?.map((state, idx) => (
                <option key={idx} value={state?.name}>
                  {state?.name}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="text-red-500 absolute">{errors.city.message}</p>
            )}
          </div>
          {/* city */}
          <div className={`w-full`}>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Select Area
            </label>
            <select
              {...register("area", { required: "Area is required" })}
              defaultValue=""
              className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Choose Area
              </option>
              {locations?.map((location, idx) => (
                <option key={idx} value={location?.locationName}>
                  {location?.locationName}
                </option>
              ))}
            </select>
            {errors.area && (
              <p className="text-red-500 absolute">{errors.area.message}</p>
            )}
          </div>
        </div>

        {/* home address */}
        <div className="grid grid-cols-1 my-10">
          {/* home address */}
          <div className="w-full">
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Home Address
            </label>
            <textarea
              {...register("homeAddress")}
              className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Uttara 10"
            />
          </div>
        </div>

        <div className="flex justify-end">
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
  );
};

export default PersonalInfo;
