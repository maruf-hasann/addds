import { Link } from "react-router-dom";
import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import ContactInfo from "./ContactInfo/ContactInfo";
import AcademicInfo from "./AcademicInfo/AcademicInfo";
import TutoringInfo from "./TutoringInfo/TutoringInfo";
import Promotion from "./Promotion/Promotion";
import { useState } from "react";

const AddTutorsInfo = () => {
  const [activeTab, setActiveTab] = useState(1);

  console.log(activeTab);

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
      label: "Tutor Info",
      id: 4,
    },
    {
      label: "Promotion",
      id: 5,
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
      value: <Promotion setActiveTab={setActiveTab} />,
    },
  ];

  return (
    <div className="py-10">
      <div className="flex justify-between items-center pb-3 mb-5">
        <h1 className="font-bold text-2xl text-white">Add Tutoring Info</h1>
        <Link
          to={"/all-tutor-infos"}
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
        >
          See All
        </Link>
      </div>
      <div className="grid grid-cols-5 bg-gray-100 p-1 rounded-md">
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
      <div>
        {data?.map((form) => (
          <section
            id={form.id}
            className={`${activeTab === form.id ? "block" : "hidden"}`}
          >
            {form.value}
          </section>
        ))}
      </div>
      {/* <Tabs id="custom-animation" value={1}>
        <TabsHeader>
          {tabHeaders.map(({ label, id }) => (
            <Tab key={id} value={id}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ id, value }) => (
            <TabPanel key={id} value={id}>
              {value}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs> */}
    </div>
  );
};

export default AddTutorsInfo;
