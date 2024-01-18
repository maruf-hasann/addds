import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { AddVideoTab } from "../AddVideoTab/AddVideoTab";
import { AddPhotoTab } from "../AddPhotoTab/AddPhotoTab";

const data = [
  {
    label: "Videos",
    value: "videos",
  },
  {
    label: "Photos",
    value: "photos",
  },
];

export const AddMediaLibraryModal = ({
  openAddMediaLibraryModal,
  handleOpen,
}) => {
  const [activeTab, setActiveTab] = useState("videos");
  return (
    <Dialog open={openAddMediaLibraryModal} handler={handleOpen}>
      <DialogHeader className="flex justify-between">
        <span>Add your videos or photos here</span>

        <FaRegCircleXmark
          className="text-3xl text-red-400 hover:text-red-500"
          onClick={handleOpen}
        />
      </DialogHeader>
      <DialogBody>
        <div className="bg-white rounded-lg">
          <Tabs value={activeTab}>
            <TabsHeader
              className="border-b border-blue-gray-50 bg-white py-4 w-1/3"
              indicatorProps={{
                className:
                  "bg-transparent border-b-4 border-primary shadow-none rounded-none w-1/2 mx-auto",
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
                <AddVideoTab />
              </TabPanel>
              <TabPanel value="photos">
                <AddPhotoTab />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </DialogBody>
    </Dialog>
  );
};
