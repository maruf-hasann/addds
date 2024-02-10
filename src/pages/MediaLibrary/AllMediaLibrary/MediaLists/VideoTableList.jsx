import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Card, CardFooter, Tooltip } from "@material-tailwind/react";
import { FaCopy } from "react-icons/fa6";
import { BsCursorFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

import {
    useDeleteMediaMutation,
    useGetAllMediaQuery,
} from "../../../../store/service/mediaLibrary/mediaLibraryApiService";

export const VideoTableList = () => {
    const { data: videoCardData, isLoading } = useGetAllMediaQuery("video");
    const [deleteMedia] = useDeleteMediaMutation();

    if (isLoading) {
        <p>Loading....</p>;
    }

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    const handleDelete = async (id) => {
        const res = await deleteMedia(id);
        if (res?.data?.statusCode === 200) {
            toast.success(res.data.message);
        } else {
            toast.error("Error in deleting video!");
        }
    };

    return (
        <div>
            {videoCardData === undefined ||
            videoCardData?.data?.length === 0 ? (
                <p className="text-center my-10 text-4xl">No videos found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {videoCardData?.data?.map((item) => (
                        <Card key={item?._id} className="p-3 border-2 hover:border-primary border-transparent transition-all duration-500 hover:shadow-lg">
                            <div className="relative group h-[117px]">
                                <video
                                    controls
                                    className="rounded-xl w-full h-full"
                                    height={150}
                                >
                                    <source
                                        src={item?.mediaUrl}
                                        type="video/mp4"
                                    />
                                </video>
                            </div>

                            <CardFooter className="flex justify-center gap-7 p-0 pt-5 pb-2">
                                <Tooltip content="Copy">
                                    <button
                                        className="border p-2 rounded-md border-primary bg-primary text-white hover:bg-transparent hover:text-primary duration-500"
                                        onClick={() =>
                                            handleCopy(item?.mediaUrl)
                                        }
                                    >
                                        <FaCopy className="text-lg" />
                                    </button>
                                </Tooltip>
                                <Tooltip content="URL">
                                    <Link to={item?.mediaUrl} target="_blank">
                                        <button className="border p-2 rounded-md border-primary bg-primary text-white hover:bg-transparent hover:text-primary duration-500">
                                            <BsCursorFill className="text-lg" />
                                        </button>
                                    </Link>
                                </Tooltip>
                                <Tooltip content="Delete">
                                    <button
                                        className="border p-2 rounded-md border-red-500 bg-red-500 text-white hover:bg-transparent hover:text-red-400 duration-500"
                                        onClick={() => handleDelete(item?._id)}
                                    >
                                        <FaTrashAlt className="text-[15px]" />
                                    </button>
                                </Tooltip>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
