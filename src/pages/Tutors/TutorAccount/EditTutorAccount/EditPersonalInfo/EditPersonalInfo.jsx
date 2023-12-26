import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useLazyGetPersonalInfoQuery,
  useUpdatePersonalInfoMutation,
} from "../../../../../store/service/personalInfo/personalInfoApiService";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";

const EditPersonalInfo = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [gender, setGender] = useState(null);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [homeAddress, setHomeAddress] = useState(null);
  const [area, setArea] = useState(null);

  const [updatePersonalInfo, { isLoading }] = useUpdatePersonalInfoMutation();
  const [getPersonalInfo] = useLazyGetPersonalInfoQuery();

  // fetch current personal info
  useEffect(() => {
    if (number) {
      setFetchLoading(true);
      const fetch = async () => {
        const result = await getPersonalInfo(number);
        if (result?.data?.success) {
          const personalInfo = result?.data?.data;
          setEmail(personalInfo?.email);
          setFullName(personalInfo?.fullName);
          setGender(personalInfo?.gender);
          setCurrentCountry(personalInfo?.country);
          setCity(personalInfo?.city);
          setHomeAddress(personalInfo?.homeAddress);
          setArea(personalInfo?.area);

          setFetchLoading(false);
        } else {
          setFetchLoading(false);
        }
      };

      fetch();
    }
  }, [number]);

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
    setSelectedState(null);
    setSelectedCountry(countries.find((country) => country.id === Number(id)));
  };

  const { register, handleSubmit } = useForm();

  // handle update tutor
  const onSubmit = async (data) => {
    if (selectedCountry?.name !== currentCountry && !selectedState) {
      return toast.error("Please select a city");
    }

    if (!homeAddress && !data?.homeAddress)
      return toast.error("Home address is required");
    if (!area && !data?.area) return toast.error("area is required");

    const updateData = {
      fullName: data.fullName ? data.fullName : fullName,
      email: data.email ? data.email : email,
      country: selectedCountry?.name,
      city: selectedState ? selectedState : city,
      gender: data.gender ? data.gender : gender,
      homeAddress: data.homeAddress ? data.homeAddress : homeAddress,
      area: data.area ? data.area : area,
    };

    const result = await updatePersonalInfo({
      data: updateData,
      number: number,
    });

    if (result.data) {
      toast.success(result.data.message);
      const updatedPersonaInfo = result?.data?.data;
      setEmail(updatedPersonaInfo?.email);
      setFullName(updatedPersonaInfo?.fullName);
      setGender(updatedPersonaInfo?.gender);
      setCurrentCountry(updatedPersonaInfo?.country);
      setCity(updatedPersonaInfo?.city);
      setHomeAddress(updatedPersonaInfo?.homeAddress);
      setArea(updatedPersonaInfo?.area);
      navigate(`/tutor-account-details/${number}`);
    } else {
      toast.error(result.error.data.message);
    }
  };

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          Update Personal Info
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
          {/* number and email */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
            {/* number */}
            <div className="relative">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Number
              </label>
              <input
                type="text"
                {...register("number")}
                readOnly
                value={number}
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
            </div>
            {/* email */}
            <div className="w-full">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                defaultValue={email}
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
            </div>
          </div>
          {/* full name and gender */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
            {/* full name */}
            <div className="w-full">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullName")}
                defaultValue={fullName}
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="John Doe"
              />
            </div>
            {/* gender */}
            <div className="w-full">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Gender Selection
              </label>
              <select
                {...register("gender")}
                defaultValue={gender}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/*country city */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
            {/* country */}
            <div className={`w-full`}>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Select Country
              </label>
              <select
                {...register("country")}
                defaultValue=""
                className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => handleSelectCountry(event.target.value)}
              >
                <option value="" disabled>
                  Choose Country
                </option>
                {countries?.map((country, idx) => (
                  <option
                    selected={country?.name === currentCountry}
                    key={idx}
                    value={country.id}
                  >
                    {country?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* city */}
            <div className={`w-full`}>
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Select City
              </label>
              <select
                {...register("city")}
                defaultValue={city}
                className="bg-gray-50 mb- border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => setSelectedState(event.target.value)}
              >
                <option value="" disabled>
                  Choose City
                </option>
                {states?.map((state, idx) => (
                  <option
                    selected={city === state?.name}
                    key={idx}
                    value={state?.name}
                  >
                    {state?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* home address and area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
            {/* home address */}
            <div className="w-full">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Home Address
              </label>
              <textarea
                {...register("homeAddress")}
                defaultValue={homeAddress}
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Uttara 10"
              />
            </div>
            {/* area */}
            <div className="w-full">
              <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                Area
              </label>
              <textarea
                {...register("area")}
                defaultValue={area}
                className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Uttara"
              />
            </div>
          </div>
          {/* submit button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              {isLoading || fetchLoading ? (
                <ImSpinner9 className="animate-spin my-1 mx-4" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPersonalInfo;
