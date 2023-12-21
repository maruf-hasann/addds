import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

import { useState, useEffect } from "react";
import { useGetEducationVariantsQuery } from "../../../../store/service/educationVariant/educationVariantApiService";
import { useAddCollageHCMutation } from "../../../../store/service/collageHC/collageHCApiService";
import { useLazyGetCountryDistrictQuery } from "../../../../store/service/country/countryApiService";

const AddCollageHCModal = ({
  openAddCollageHCModal,
  setOpenAddCollageHCModal,
}) => {
  /* Set all the states data state */
  const [states, setStates] = useState([]);
  const [division, setDivision] = useState("");

  const [collageName, setCollageName] = useState("");
  const [educationVariant, setEducationVariant] = useState("");

  const [addCollageHC, { isLoading }] = useAddCollageHCMutation();

  /* Get whole country district */
  const [getCountryDistrict] = useLazyGetCountryDistrictQuery();

  const { data: educationVariantsData } = useGetEducationVariantsQuery();
  const educationVariants = educationVariantsData?.data;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!collageName) return toast.error("Please add a collage name");
    if (!division) return toast.error("Please add a division");
    if (!educationVariant) return toast.error("Please Add a education variant");

    const result = await addCollageHC({
      collageName,
      educationVariant,
      division,
    });
    console.log(result);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setCollageName("");
      setEducationVariant("");
      setOpenAddCollageHCModal(!openAddCollageHCModal);
    } else {
      toast.error(result?.error?.data?.message);
    }
  };

  // fetch all states
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCountryDistrict("BD");
        setStates(response.data);
      } catch (error) {
        toast.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {};
  }, [getCountryDistrict]);

  // handle close modal
  const handleClose = () => {
    setOpenAddCollageHCModal(!openAddCollageHCModal);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
        openAddCollageHCModal ? "block" : "hidden"
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
              <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-blue-gray-800">Add Collage HC</h1>
              </div>

              <form className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white">
                {/* city */}
                <div className={`w-full`}>
                  <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                    Select Division
                  </label>
                  <select
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                  >
                    {states
                      ?.filter(
                        (state) =>
                          state.name === "Dhaka Division" ||
                          state.name === "Chittagong Division" ||
                          state.name === "Khulna Division" ||
                          state.name === "Rajshahi Division" ||
                          state.name === "Barisal Division" ||
                          state.name === "Rangpur Division" ||
                          state.name === "Mymensingh Division" ||
                          state.name === "Sylhet Division"
                      )
                      ?.map((state, idx) => (
                        <option key={idx} value={state?.name}>
                          {state?.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="educationVariant"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    Education Variant
                  </label>
                  <select
                    type="text"
                    id="educationVariant"
                    name="educationVariant"
                    onChange={(e) => setEducationVariant(e.target.value)}
                    required
                    defaultValue={""}
                    className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                  >
                    <option value="" disabled>
                      Select Education Variant
                    </option>
                    {educationVariants?.map((variant, idx) => (
                      <option key={idx} value={variant?.variantName}>
                        {variant?.variantName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="collageName"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="collageName"
                    name="collageName"
                    value={collageName}
                    onChange={(e) => setCollageName(e.target.value)}
                    required
                    placeholder="Collage Name"
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

export default AddCollageHCModal;
