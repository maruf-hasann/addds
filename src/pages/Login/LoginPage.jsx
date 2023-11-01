// LoginForm.js
import React from "react";
import { Input, Button, Spinner } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoginUserMutation } from "../../store/service/auth/authApiService";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/features/user/userSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLogin, { isLoading }] = useLoginUserMutation();

  const onSubmit = async (data) => {
    if (!isValidEmail(data.email)) {
      toast.error("Invalid email");
      return;
    }

    const result = await userLogin(data);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      const user = result?.data?.data;
      const token = result?.data?.token;
      const userInfo = { token, user };
      dispatch(addUser(userInfo));
      navigate("/");
    } else {
      toast.error(result?.error?.data?.message);
    }
  };

  const isValidEmail = (email) => {
    // Simple email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md my-20">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>

      <div className="mb-8">
        <Input
          type="email"
          label="Email"
          name="email"
          {...register("email", {
            required: "Email is required",
          })}
          error={errors?.email?.message}
        />
      </div>

      <div className="mb-8">
        <Input
          type="password"
          label="Password"
          name="password"
          {...register("password", {
            required: "Password is required",
          })}
          error={errors?.password?.message}
        />
      </div>

      <div className="flex justify-end">
        {isLoading ? (
          <Button
            disabled
            color="blue"
            ripple="light"
            className="px-7 py-2 cursor-wait"
          >
            <Spinner />
          </Button>
        ) : (
          <Button
            type="submit"
            color="blue"
            ripple="light"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        )}
      </div>
    </form>
  );
};

export default LoginPage;
