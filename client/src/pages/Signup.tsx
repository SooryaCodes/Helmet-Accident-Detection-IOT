import React, { useState } from "react";
import axios from "../config/axios"; // Axios setup from previous steps
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { Link } from "react-router-dom";

export default function Signup() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  }); // Added phone
  const [error, setError] = useState<string | null>(null); // Error state to hold error message
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      const response = await axios.post("/api/auth/signup", userData);
      console.log("Success:", response.status);

      if (response.status === 201) {
        // Store the token and user details in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to emergency contacts page
        navigate("/emergency-contacts");
      }
    } catch (err: any) {
      console.error("Error signing up:", err);
      setError("Failed to sign up. Please try again.");
    }
  };
  return (
    <div className="grid h-screen grid-cols-1 gap-10 px-10 md:grid-cols-5 md:px-0 ">
      <div className=" col-span-2 hidden h-full w-full md:block ">
        {" "}
        <img
          src="/gradient.jpg"
          className="h-full w-full   object-cover "
          alt=""
        />
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center md:col-span-3">
        <div className="mb-10 grid place-items-center">
          <ol className="hidden  w-full items-center gap-5  space-y-4 md:flex  lg:space-x-4 lg:space-y-0">
            <li className="relative ">
              <a
                href="https://pagedone.io/"
                className="flex w-full items-center font-medium  "
              >
                <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-transparent bg-indigo-600 text-xs text-white lg:h-8 lg:w-8 lg:text-sm">
                  {" "}
                  1{" "}
                </span>
                <div className="block">
                  <h4 className="text-xs text-indigo-600  lg:text-base">
                    Create Account
                  </h4>
                </div>
                <svg
                  className="ml-2 h-5 w-5 stroke-indigo-600 sm:ml-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6"
                    stroke="stroke-current"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </li>
            <li className="relative  ">
              <a className="flex w-full items-center font-medium  ">
                <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-xs lg:h-8  lg:w-8 lg:text-sm">
                  2
                </span>
                <div className="block">
                  <h4 className="text-xs text-gray-900  lg:text-base">
                    Add Contacts
                  </h4>
                </div>
                <svg
                  className="ml-2 h-5 w-5 stroke-gray-900 sm:ml-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6"
                    stroke="stroke-current"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </li>
            <li className="relative  ">
              <a className="flex w-full items-center font-medium  ">
                <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-xs lg:h-8  lg:w-8 lg:text-sm">
                  3
                </span>
                <div className="block">
                  <h4 className="text-xs text-gray-900  lg:text-base">
                    Link Device
                  </h4>
                </div>
              </a>
            </li>
          </ol>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md md:max-w-xl">
          {error && <div className="mb-4 text-red-600">{error}</div>}{" "}
          {/* Error message display */}
          <span className="mt-5 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
            Stay Safe, Stay Connected
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-6 w-6 duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
          <h1 className="mb-7 mt-3 text-2xl  font-semibold text-black lg:text-3xl">
            Register Your SmartHelm and Stay Protected, Anytime, Anywhere
          </h1>
          {/* Name */}
          <div className="mt-4">
            <label className="text-sm text-gray-800 ">Name</label>
            <div className="relative my-2 max-w-full">
              <svg
                className="absolute inset-y-0 left-3 my-auto h-4 w-4 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path>
              </svg>
              <input
                required
                type="text"
                placeholder="Enter your full name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className=" w-full rounded-lg border bg-transparent py-3 pl-12 pr-3 text-sm text-gray-800 outline-none   focus:border-blue-600"
              />
            </div>
          </div>
          {/* Email */}
          <div className="mt-4">
            <label className="text-sm text-gray-800 ">Email</label>
            <div className="relative my-2 max-w-full">
              <svg
                className="absolute inset-y-0 left-3 my-auto h-4 w-4 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <input
                required
                type="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className=" w-full rounded-lg border bg-transparent py-3 pl-12 pr-3 text-sm text-gray-800 outline-none   focus:border-blue-600"
              />
            </div>
          </div>
          {/* Phone */}
          <div>
            <label className="text-sm text-gray-800">Phone number</label>
            <div className="relative my-2 max-w-full text-sm text-gray-500">
              <div className="absolute inset-y-0 left-3 my-auto flex h-6 items-center border-r pr-2">
                <span className="h-full rounded-lg bg-transparent text-sm outline-none">
                  +91 &nbsp;
                </span>
              </div>
              <input
                required
                type="number"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                placeholder="XXXX XXX XXX"
                className="w-full appearance-none rounded-lg border bg-transparent py-3  pl-[4.5rem] pr-3 shadow-sm outline-none focus:border-indigo-600"
              />
            </div>
          </div>
          {/* Password */}
          <div className="mt-4">
            <label className="text-sm text-gray-800 ">Password</label>
            <div className="relative my-2 max-w-full">
              <svg
                className="absolute inset-y-0 left-3 my-auto h-4 w-4 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5 12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"></path>
              </svg>

              <input
                required
                type="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                placeholder="Enter your password"
                className=" w-full rounded-lg border bg-transparent py-3 pl-12 pr-3 text-sm text-gray-800 outline-none   focus:border-blue-600"
              />
            </div>
          </div>
          <p className="mt-5 text-xs text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:underline">
              Sign in!
            </Link>
          </p>
          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm text-white duration-150 hover:bg-indigo-700 active:shadow-lg"
          >
            Sign up and continue
          </button>
        </form>
      </div>
    </div>
  );
}
