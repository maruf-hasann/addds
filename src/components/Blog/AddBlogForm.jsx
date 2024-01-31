import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCloudUploadOutline } from "react-icons/io5";
import { TagsInput } from "react-tag-input-component";
import { Button } from "@material-tailwind/react";
import { FaSpinner } from "react-icons/fa6";
import { BsImage } from "react-icons/bs";
import { useGetAllCategoryQuery } from '../../store/service/category/categoryApiservice';
import JoditReact from '../Jodit/JoditReact';
import { IoIosClose } from 'react-icons/io';
import { useAddBlogMutation } from '../../store/service/blog/blogApiService';


const AddBlogForm = ({setModalOpen}) => {
  // category Image
  const [imageShow, setImageShow] = useState("");
  const [selectedBlogTag, setSelectedBlogTag] = useState([]);

  const [content, setContent] = useState();
 /* redux api call */
  const { data } = useGetAllCategoryQuery();
  // category data
  const categoryData = data?.data;
  const [addBlog, { isLoading }] = useAddBlogMutation()
  
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // submit blogs
  const blogSubmit = async (data) => {
    //   image
    const blogImage = data?.post_image[0];

    // title
    const title = data?.title;
    const slug = data?.title
      ?.toLowerCase()
      ?.replace(/[!@#$%^&*()_+?:;,]/g, "")
      ?.split(/\s+/g)
      ?.join("-");

    const shortdes = data?.shortDescription;
    const category = data?.category;
    const formData = new FormData();
    const phone = "8801708666342";
    const author = "Mafee";
    const tags = JSON.stringify(selectedBlogTag);

    formData.append("title", title);
    formData.append("blogImage", blogImage);
    formData.append("shortDescription", shortdes);
    formData.append("tags", tags);
    formData.append("slug", slug);
    formData.append("description", content);
    formData.append("categoryId", category);
    formData.append("phoneNumber", phone);
    formData.append("authorName", author);

    const result = await addBlog(formData);

    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setModalOpen(false);
      reset();
    } else {
      toast.error(result?.error?.data?.message);
    }
  };

  // show image after changing
  const post_image = watch("post_image");
  useEffect(() => {
    if (post_image?.length > 0) {
      setImageShow(URL.createObjectURL(post_image[0]));
    }
  }, [watch, post_image]);
  return (
    <form
      onSubmit={handleSubmit(blogSubmit)}
      className="w-full mx-auto p-4 border rounded-md mt-5 bg-white"
    >
      {/* Blog title  */}
      <div className="mb-2">
        <label
          htmlFor="title"
          className="block mb-2 font-semibold text-sm text-gray-500"
        >
          Blog Title
        </label>
        <input
          {...register("title", {
            required: "Blog title is required!",
          })}
          type="text"
          id="title"
          name="title"
          className="w-full p-2 mb-4 text-black border rounded-md outline-none focus:outline-primaryAlfa-50"
          placeholder="Please add a title"
          onKeyUp={() => {
            trigger("title");
          }}
        />
        <small className="text-red-500 text-xs font-medium my-2">
          {errors?.title?.message}
        </small>
      </div>
      {/* Tags and category  */}
      <div className="grid grid-cols-2 gap-4 ">
        <div className="mb-2">
          <label
            htmlFor="tags"
            className="block mb-2 font-semibold text-sm text-gray-500"
          >
            Tags of the blogs
          </label>
          <div className="mt-2 ">
            <TagsInput
              value={selectedBlogTag}
              onChange={setSelectedBlogTag}
              placeHolder="Tag Name"
              classNames={{
                tag: "tag-cls",
                input: "text-black py-0",
              }}
            />
            <em className="text-xs">Press enter to add new tag</em>
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <div className=" mb-4">
            <label
              htmlFor="category"
              className="block mb-2 font-semibold text-sm text-gray-500"
            >
              Category
            </label>
            <select
              id="category"
              className="w-full text-black p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
              {...register("category", {
                required: "Category are required!",
              })}
            >
              {categoryData?.map((item) => (
                <option key={item?._id} value={item?.categoryId}>
                  {item?.name}
                </option>
              ))}
            </select>
            {errors?.category && (
              <small className="text-red-500 text-xs font-medium my-2">
                {errors?.category?.message}
              </small>
            )}
          </div>
        </div>
      </div>

      {/* Short description  */}
      <div className=" mb-2">
        <label
          htmlFor="desc"
          className="block mb-2 font-semibold text-sm text-gray-500"
        >
          Short Description for blog
        </label>

        <textarea
          rows="3"
          className="w-full p-2  text-black mb-2 border rounded-md outline-none focus:outline-primaryAlfa-50"
          type="text"
          {...register("shortDescription", {
            required: "Short Description is required",
          })}
          placeholder="Please enter short description"
        />
        {errors?.shortDescription && (
          <small className="text-red-500 text-xs font-medium my-2">
            {errors?.shortDesc?.message}
          </small>
        )}
      </div>

      {/* Description */}
      <div className="mb-6 text-black">
        <label className="block mb-2 font-semibold text-sm text-gray-500">
          Description
        </label>
        <JoditReact content={content} setContent={setContent} />
      </div>
      {/* Image */}
      <div className="cursor-pointer ">
        {imageShow ? (
          <>
            <div
              className="flex  relative left-60 cursor-pointer p-[2px] rounded-full"
              onClick={() => setImageShow("")}
            >
              <IoIosClose size={24} />
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="inline-block border-[1px] border-border p-1 rounded-md">
          <label
            htmlFor="post_image"
            className={`flex flex-col items-center justify-center    cursor-pointer ${
              errors.post_image ? " border-red" : ""
            }`}
          >
            <>
              {imageShow ? (
                <div className="relative">
                  <img className="h-auto w-[240px]" src={imageShow} />
                </div>
              ) : (
                <>
                  <div className="w-[240px]">
                    <div className="text-center">
                      <IoCloudUploadOutline
                        size={50}
                        className={`inline-block ${
                          errors.post_image ? " text-red" : "text-gray"
                        }`}
                      />
                    </div>
                    <div className="text-center mb-2">
                      <h2 className="mb-2">Upload Image </h2>
                    </div>
                  </div>
                </>
              )}
            </>
          </label>
          <input
            id="post_image"
            type="file"
            required=""
            accept="image/*"
            {...register("post_image")}
            name="post_image"
            className="hidden"
          />
        </div>
      </div>
      <div className="flex justify-end">
        {isLoading ? (
          <Button
            disabled
            className="bg-white text-blue-gray-700 border py-2 px-[39px] rounded-sm font-semibold cursor-wait "
          >
            <FaSpinner className="animate-spin" />
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-white text-blue-gray-700 border py-2 px-8 rounded-sm font-semibold cursor-pointer"
          >
            Add
          </Button>
        )}
      </div>
    </form>
  );
};

export default AddBlogForm;