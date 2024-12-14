import React, { useState } from "react";
import axios from "../config/axios"; // Axios setup from previous steps
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null); // Error state to hold error message
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      const response = await axios.post("/api/auth/login", userData);
      console.log("Success:", response.status);

      if (response.status === 200) {
        // Store the token and user details in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to the dashboard page
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Error logging in:", err);
      setError("Failed to log in. Please check your credentials and try again.");
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
          Login to your SmartHelm Account
        </h1>
       
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
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold hover:underline">
            Sign up now!
          </Link>
        </p>
        <button
          type="submit"
          className="mt-3 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm text-white duration-150 hover:bg-indigo-700 active:shadow-lg"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
  );
}

