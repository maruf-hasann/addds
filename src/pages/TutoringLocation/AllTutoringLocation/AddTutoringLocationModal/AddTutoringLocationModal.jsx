import { useState } from "react";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSaveTutoringLocationMutation } from "../../../../store/service/tutoringLocation/tutoringLocationApiService";

const AddTutoringLocationModal = ({
  openAddTutoringLocationModal,
  setOpenAddTutoringLocationModal,
}) => {
  /* state for sub subject */
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [lName, setLName] = useState(null);

  const [addTutoringLocation, { isLoading }] =
    useSaveTutoringLocationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  // handle close modal
  const handleClose = () => {
    setOpenAddTutoringLocationModal(!openAddTutoringLocationModal);
  };

  const onSubmit = async (data) => {
    if (!selectedCountry) return toast.error("Please select a country");
    if (!selectedState) return toast.error("Please select a city");
    if (!lName) return toast.error("Please type Location");
    const location = { city: data?.city, locationName: lName };

    const result = await addTutoringLocation(location);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setLocationName(null);
      reset();
    } else {
      toast.error(result?.error?.data?.message);
    }
  };

  console.log(lName);

  return (
    <div
      className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
        openAddTutoringLocationModal ? "block" : "hidden"
      }`}
    >
      <div
        className="w-full h-full z-0 absolute top-0 left-0"
        onClick={handleClose}
      ></div>
      <div className="relative z-50 w-full max-w-5xl  max-h-full mt-[20vh] mx-auto px-2 md:w-1/2 lg:w-1/3 md:px-0">
        <div
          className={`relative  rounded-lg shadow text-primary px-10 bg-white`}
        >
          {/* modal close button */}
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-3 right-2.5  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <FaRegCircleXmark className="text-3xl text-red-400 hover:text-red-500" />
          </button>
          <>
            <div className="py-10">
              <div className="flex justify-between items-center pb-3">
                <h1 className="font-bold text-blue-gray-800">
                  Add Tutoring Location
                </h1>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white"
              >
                {/* country */}
                <div className={`w-full`}>
                  <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                    Select Country
                  </label>
                  <select
                    {...register("country")}
                    defaultValue={""}
                    className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(event) =>
                      handleSelectCountry(event.target.value)
                    }
                  >
                    <option value="" disabled>
                      Choose Country
                    </option>
                    {countries?.map((country, idx) => (
                      <option
                        key={idx}
                        value={country.id}
                        selected={country?.iso2 === "BD"}
                      >
                        {country?.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* city */}
                <div className={`w-full mt-5`}>
                  <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                    Select City
                  </label>
                  <select
                    defaultValue=""
                    {...register("city")}
                    className=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(event) => setSelectedState(event.target.value)}
                  >
                    <option value="" disabled>
                      Choose City
                    </option>
                    {states?.map((state, idx) => (
                      <option key={idx} value={state?.name}>
                        {state?.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div className="w-full mt-5">
                  <label
                    htmlFor="locationName"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    Location Name
                  </label>
                  <input
                    type="text"
                    id="locationName"
                    {...register("locationName")}
                    onChange={(e) => setLName(e.target.value)}
                    value={lName}
                    placeholder="Add Location Name"
                    className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                  />
                </div>

                <div className="flex justify-end">
                  {isLoading ? (
                    <Button
                      disabled
                      className="bg-white text-blue-gray-700 border py-2 px-[39px] rounded-sm font-semibold cursor-wait "
                      onClick={handleSubmit}
                    >
                      <FaSpinner className="animate-spin" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-white text-blue-gray-700 border py-2 px-8 rounded-sm font-semibold cursor-pointer"
                      onClick={handleSubmit}
                    >
                      Add
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default AddTutoringLocationModal;
