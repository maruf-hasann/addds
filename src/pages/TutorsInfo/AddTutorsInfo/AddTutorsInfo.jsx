import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { classes } from "../../../data/academicClasses";
import { tutoringSubjects } from "../../../data/tutoringSubjects";
import { educationVariants } from "../../../data/educationVariant";
import { Button } from "@material-tailwind/react";

const AddTutorsInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tutoringType, setTutoringType] = useState("");
  const [tutoringClass, setTutoringClass] = useState("");
  const [tutoringSubject, setTutoringSubject] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [emergencyContactPerson, setEmergencyContactPerson] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !tutoringType ||
      !tutoringClass ||
      !tutoringSubject ||
      !meetLink ||
      !interviewTime ||
      !emergencyContactPerson ||
      !emergencyContactNumber ||
      !homeAddress
    ) {
      toast.error("All Field are required");
      return;
    }
    console.log({
      tutoringType,
      tutoringClass,
      tutoringSubject,
      meetLink,
      interviewTime,
      emergencyContactPerson,
      emergencyContactNumber,
      homeAddress,
    });
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
        setHomeAddress("");
        setEmergencyContactPerson("");
        setEmergencyContactNumber("");
        setMeetLink("");
        setInterviewTime("");
        setTutoringSubject("");
        setTutoringClass("");
        setTutoringType("");
        toast.success("Tutoring Info added successfully");
      }, 2000);
    }
  }, [isLoading]);

  const tableClasses = "p-4 border-b border-blue-gray-50";

  return (
    <div className="py-10">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold">Add Tutoring Info</h1>
        <Link
          to={"/dashboard/all-tutoring-info"}
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-sky-700"
        >
          See All
        </Link>
      </div>
      <form className="w-full mx-auto px-4 py-5 border rounded-md mt-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="tutoringType"
              className="block mb-2 font-semibold text-sm text-gray-500"
            >
              Tutoring Type
            </label>
            <select
              id="tutoringType"
              name="tutoringType"
              onChange={(e) => setTutoringType(e.target.value)}
              required
              defaultValue={""}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="" disabled>
                Select Tutoring Type
              </option>
              {educationVariants.map((variant, idx) => (
                <option key={idx} value={variant.id}>
                  {variant.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="tutoringClass"
              className="block mb-2 font-semibold text-sm text-gray-500"
            >
              Tutoring Class
            </label>
            <select
              id="tutoringClass"
              name="tutoringClass"
              onChange={(e) => setTutoringClass(e.target.value)}
              required
              defaultValue={""}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="" disabled>
                Select Tutoring Class
              </option>
              {classes
                .filter((cls) => cls.mediumId === Number(tutoringType))
                .map((fClass, fIdx) => (
                  <option key={fIdx} value={fClass.name}>
                    {fClass.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="tutoringSubject"
              className="block mb-2 font-semibold text-sm text-gray-500"
            >
              Tutoring Class
            </label>
            <select
              id="tutoringSubject"
              name="tutoringSubject"
              onChange={(e) => setTutoringSubject(e.target.value)}
              required
              defaultValue={""}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="" disabled>
                Select Tutoring Class
              </option>
              {tutoringSubjects
                .filter((subject) => subject.mediumId === Number(tutoringType))
                .map((fSubject, fIdx) => (
                  <option key={fIdx} value={fSubject.name}>
                    {fSubject.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="meetLink"
              className="block mb-2 font-semibold text-sm text-gray-500"
            >
              Meet Link
            </label>
            <input
              type="text"
              id="meetLink"
              name="meetLink"
              value={meetLink}
              onChange={(e) => setMeetLink(e.target.value)}
              required
              placeholder="https://meet.google.com/abc-mno-xyz"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="mb-5">
            <label
              htmlFor="meetLink"
              className="block mb-2 font-semibold text-sm text-gray-500"
            >
              Interview Time
            </label>
            <Datetime
              onChange={(e) => setInterviewTime(e)}
              className="border rounded-sm"
            />
          </div>
          <div>
            <label
              htmlFor="emergencyContactPerson"
              className="block mb-2 font-semibold text-sm text-gray-500"
            >
              Emergency Contact Person
            </label>
            <input
              type="text"
              id="emergencyContactPerson"
              name="emergencyContactPerson"
              value={emergencyContactPerson}
              onChange={(e) => setEmergencyContactPerson(e.target.value)}
              required
              placeholder="John Doe"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="emergencyContactNumber"
              className="block mb-2 font-semibold text-sm text-gray-500"
            >
              Emergency Contact Number
            </label>
            <input
              type="text"
              id="emergencyContactNumber"
              name="emergencyContactNumber"
              value={emergencyContactNumber}
              onChange={(e) => setEmergencyContactNumber(e.target.value)}
              required
              placeholder="+88017******"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="homeAddress"
              className="block mb-2 font-semibold text-sm text-gray-500"
            >
              Home Address
            </label>
            <input
              type="text"
              id="homeAddress"
              name="homeAddress"
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
              required
              placeholder="City"
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
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

      {tutoringType ||
      tutoringClass ||
      tutoringSubject ||
      meetLink ||
      interviewTime ||
      emergencyContactPerson ||
      emergencyContactNumber ||
      homeAddress ? (
        <div className="my-5 overflow-x-scroll max-w-5xl">
          <div className="flex justify-between items-center border-b pb-3">
            <h1 className="font-bold">End View</h1>
          </div>
          <div>
            <table className=" table-auto text-left ">
              {/* head */}
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Tutoring Type</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Tutoring Class</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Tutoring Subject</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Meet Link</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Interview Time</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Emergency Contact Person</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Emergency Contact Number</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap">Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tableClasses}>
                    {
                      educationVariants.find(
                        (variant) => variant.id === Number(tutoringType)
                      )?.name
                    }
                  </td>
                  <td className={tableClasses}>{tutoringClass}</td>
                  <td className={tableClasses}>{tutoringSubject}</td>
                  <td className={tableClasses}>{meetLink}</td>
                  <td className={tableClasses}>{moment(interviewTime).format("DD MMM YYYY hh:mm A")}</td>
                  <td className={tableClasses}>{emergencyContactPerson}</td>
                  <td className={tableClasses}>{emergencyContactNumber}</td>
                  <td className={tableClasses}>{homeAddress}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddTutorsInfo;
