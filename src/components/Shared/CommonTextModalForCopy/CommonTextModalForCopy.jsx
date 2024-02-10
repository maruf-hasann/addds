import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { FaRegCircleXmark } from "react-icons/fa6";

const CommonTextModalForCopy = ({
  isOpenModal,
  setIsOpenModal,
  content,
  setContent,
}) => {
  // handle close modal
  const handleClose = () => {
    setIsOpenModal(!isOpenModal);
    setContent("");
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
        isOpenModal ? "block" : "hidden"
      }`}
    >
      <div
        className="w-full h-full z-0 absolute top-0 left-0"
        onClick={handleClose}
      ></div>
      <div className="relative z-50 w-full max-w-5xl  max-h-full mt-[20vh] mx-auto px-2 md:w-1/2 lg:w-1/3 md:px-0">
        <div
          className={`relative  rounded-lg shadow text-primary bg-white p-5`}
        >
          <div>{content}</div>
          <div className="mt-3 flex justify-end items-center gap-5">
            <button
              onClick={handleClose}
              className="border px-5 py-1 text-red-500 border-red-500"
            >
              Cancel
            </button>
            <CopyToClipboard
              text={content}
              onCopy={() => {
                toast.success("copied"), setIsOpenModal(false), setContent("");
              }}
            >
              <button className="border px-5 py-1">Copy</button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonTextModalForCopy;
