import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
    Card,
    CardHeader,
    CardFooter,
    Tooltip,
} from "@material-tailwind/react";

import { FaCopy } from "react-icons/fa6";
import { BsCursorFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

import {
    useDeleteMediaMutation,
    useGetAllMediaQuery,
} from "../../../../store/service/mediaLibrary/mediaLibraryApiService";

export const PhotoTableList = () => {
    const { data: imageCardData, isLoading } = useGetAllMediaQuery("image");
    const [deleteMedia] = useDeleteMediaMutation();

    if (isLoading) {
        <p>Loading....</p>;
    }

    const handleDelete = async (id) => {
        const res = await deleteMedia(id);
        console.log(res);
        if (res.data.statusCode === 200) {
            toast.success(res.data.message);
        } else {
            toast.error("Error in deleting video!");
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };
    return (
        <div>
            {imageCardData === undefined ||
            imageCardData?.data?.length === 0 ? (
                <p className="text-center my-10 text-4xl">No media found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {imageCardData?.data?.map((item) => (
                        <Card
                            className="w-auto mt-10  transition-all duration-500  hover:-translate-y-2 relative hover:shadow-lg pb-5"
                            key={item?._id}
                        >
                            <CardHeader
                                floated={false}
                                className="h-auto relative mx-0 rounded-none rounded-t-lg shadow-none mt-0 group overflow-hidden w-full"
                            >
                                <img
                                    src={item?.mediaUrl}
                                    alt="profile-picture"
                                    className="h-[200px] w-full object-cover transition-transform transform group-hover:scale-110 duration-700"
                                />
                            </CardHeader>
                            <CardFooter className="flex justify-center gap-7 p-0 pt-6 pb-2 ">
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
