import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validationSchema";
import { Link, useNavigate } from "react-router-dom";
import { AuthResponse, LoginFormValues } from "../models/AuthModels";
import { login } from "../services/auth/authService";
import AuthContext from "../context/AuthProvider";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const { setIsAuthenticated, setToken, refreshToken } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    login(data)
      .then((_response: AxiosResponse<AuthResponse>) => {
        toast.success("Success");
        setIsAuthenticated(true);
        setToken(_response.data.access_token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Server error");
        if (error.response && error.response.status === 401) {
          refreshToken();
        }
      });
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          ></a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                  {formState.errors.email && (
                    <p>{formState.errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>

                  <input
                    {...register("password")}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {formState.errors.password && (
                    <p>{formState.errors.password.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

// if (error._response.statusCode === 500) {
//     toast.error('Server error', {
//         position: toast.POSITION.TOP_RIGHT
//     })
// }
// else if (error._response.statusCode === 401) {
//     toast.error('You are not authorized', {
//         position: toast.POSITION.TOP_RIGHT
//     })
// }
// else if (error._response.statusCode === 404) {
//     toast.error('The requested resource was not found', {
//         position: toast.POSITION.TOP_RIGHT
//     })
// }
// else {
//     toast.error('An error occurred. Please check your network connection.', {
//         position: toast.POSITION.TOP_RIGHT
//     })
// }
