import { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { AddMediaLibraryModal } from "./AddMediaLibraryModal/AddMediaLibraryModal";
import { VideoTableList } from "./MediaLists/VideoTableList";
import { PhotoTableList } from "./MediaLists/PhotoTableList";

const data = [
  {
    label: "Videos",
    value: "videos",
  },
  {
    label: "Images",
    value: "photos",
  },
];

const MediaLibrary = () => {
  const [openAddMediaLibraryModal, setOpenAddMediaLibraryModal] =
    useState(false);
  const [activeTab, setActiveTab] = useState("videos");

  const handleOpen = () =>
    setOpenAddMediaLibraryModal(!openAddMediaLibraryModal);

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-7">
        <h1 className="font-bold text-xl md:text-3xl text-white">
          Media Library
        </h1>
        <div
          className="font-semibold text-sm border px-6 py-[8px] text-[#1C6BAD] rounded-[4px] border-sky-200 bg-white cursor-pointer"
          onClick={handleOpen}
        >
          Add New Media
        </div>
      </div>

      <div className="bg-white mt-14 rounded-lg pb-9">
        <Tabs value={activeTab}>
          <TabsHeader
            className="border-b border-blue-gray-50 bg-white py-4 lg:w-1/3"
            indicatorProps={{
              className:
                "bg-transparent border-b-4 border-primary shadow-none rounded-none w-1/3 mx-auto",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={
                  activeTab === value ? "text-primary font-bold" : "font-bold"
                }
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            <TabPanel value="videos">
              <VideoTableList />
            </TabPanel>
            <TabPanel value="photos">
              <PhotoTableList />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>

      {openAddMediaLibraryModal && (
        <AddMediaLibraryModal
          openAddMediaLibraryModal={openAddMediaLibraryModal}
          handleOpen={handleOpen}
        />
      )}
    </section>
  );
};

export default MediaLibrary;
