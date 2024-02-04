import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import ContactInfo from "./ContactInfo/ContactInfo";
import AcademicInfo from "./AcademicInfo/AcademicInfo";
import TutoringInfo from "./TutoringInfo/TutoringInfo";
import { useState } from "react";
import AdditionalTutoringInfo from "./AdditionalTutoringInfo/AdditionalTutoringInfo";
import Promotion from "./Promotion/Promotion";

const AddTutorsInfo = () => {
  const [activeTab, setActiveTab] = useState(5);

  const tabHeaders = [
    {
      label: "Personal Info",
      id: 1,
    },
    {
      label: "Contact Info",
      id: 2,
    },
    {
      label: "Academic Info",
      id: 3,
    },
    {
      label: "Tutoring Info",
      id: 4,
    },
    {
      label: "Additional Tutoring Info",
      id: 5,
    },
    {
      label: "Promotion",
      id: 6,
    },
  ];

  const data = [
    {
      id: 1,
      value: <PersonalInfo setActiveTab={setActiveTab} />,
    },
    {
      id: 2,
      value: <ContactInfo setActiveTab={setActiveTab} />,
    },
    {
      id: 3,
      value: <AcademicInfo setActiveTab={setActiveTab} />,
    },
    {
      id: 4,
      value: <TutoringInfo setActiveTab={setActiveTab} />,
    },
    {
      id: 5,
      value: <AdditionalTutoringInfo setActiveTab={setActiveTab} />,
    },
    {
      id: 6,
      value: <Promotion />,
    },
  ];

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          Add Tutoring Info
        </h1>
        <Link
          to={"/all-tutor-infos"}
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
        >
          See All
        </Link>
      </div>
      <div className="grid grid-cols-6 bg-blue-50 p-1 rounded-t-md">
        {tabHeaders.map(({ label, id }) => {
          return (
            <Button
              onClick={() => setActiveTab(id)}
              key={id}
              variant="text"
              className={`rounded-none  text-blue-gray-800 py-[10px] ${
                activeTab === id
                  ? "bg-white rounded-md shadow-sm font-bold"
                  : "bg-transparent"
              }`}
            >
              {label}
            </Button>
          );
        })}
      </div>
      <div className="bg-white border">
        {data?.map((form, index) => (
          <section
            id={index}
            className={`${activeTab === form.id ? "block" : "hidden"}`}
          >
            {form.value}
          </section>
        ))}
      </div>
    </div>
  );
};

export default AddTutorsInfo;
