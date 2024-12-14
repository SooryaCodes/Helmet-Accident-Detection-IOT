import { useState, useRef, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import InitialAvatar from "./InitialAvatar";
import axios from "../config/axios"; // Import axios
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirect

// Type for the profile dropdown component props
interface ProfileDropDownProps {
  class: string;
}

// Profile Dropdown
const ProfileDropDown = (props: ProfileDropDownProps) => {
  const { user, setUser } = useUserContext(); // Assuming setUser is used to reset the user state
  const [state, setState] = useState<boolean>(false);
  const profileRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate(); // Get the navigate function for redirection

  const navigation = [
    { title: "Dashboard", path: "javascript:void(0)" },
    { title: "Log out", path: "javascript:void(0)", action: "logout" }, // Added action
  ];

  useEffect(() => {
    const handleDropDown = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setState(false);
      }
    };
    document.addEventListener("click", handleDropDown);
    return () => document.removeEventListener("click", handleDropDown); // Clean up the event listener
  }, []);

  const handleLogout = async () => {
    try {
      // Use axios to call the logout API
      const response = await axios.post(
        "/api/auth/logout",
        {},
      );

      if (response.status === 200) {
        // Reset the user context after successful logout
        setUser(null); // Assuming you have a setUser function to reset the user context
        alert("Logged out successfully");
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        // Redirect to signup page after successful logout
        navigate("/signup"); // Assuming /signup is the path to your signup page
      } else {
        alert("Failed to log out");
      }
    } catch (error) {
      alert("An error occurred while logging out");
      console.error(error);
    }
  };

  return (
    <div className={`relative ${props.class}`}>
      <div className="flex items-center space-x-4">
        <button
          ref={profileRef}
          className="h-10 w-10 rounded-full outline-none ring-2 ring-gray-200 ring-offset-2 lg:focus:ring-indigo-600"
          onClick={() => setState(!state)}
        >
          <InitialAvatar name={user?.name || "Aa"} />
        </button>
        <div className="lg:hidden">
          <span className="block">{user?.name}</span>
          <span className="block text-sm text-gray-500">{user?.email}</span>
        </div>
      </div>
      <ul
        className={`right-0 top-12 mt-5 space-y-5 bg-white lg:absolute lg:mt-0 lg:w-52 lg:space-y-0 lg:rounded-md lg:border lg:text-sm lg:shadow-md ${state ? "" : "lg:hidden"}`}
      >
        {navigation.map((item, idx) => (
          <li key={idx}>
            <a
              className="block text-gray-600 lg:p-2.5 lg:hover:bg-gray-50"
              href={item.path}
              onClick={item.action === "logout" ? handleLogout : undefined} // Call handleLogout if logout
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Type for the main nav component props
const MainNav = () => {
  const [menuState, setMenuState] = useState<boolean>(false);

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-screen-xl items-center space-x-8 px-4 py-3 md:px-8">
        <div className="flex-none lg:flex-initial">
          <a href="javascript:void(0)">
            <img
              src="/smarthelm.svg"
              width={160}
              height={50}
              alt="Float UI logo"
            />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div
            className={`absolute left-0 top-16 z-20 w-full border-b bg-white p-4 lg:static lg:block lg:border-none ${menuState ? "" : "hidden"}`}
          >
            <ProfileDropDown class="mt-5 border-t pt-5 lg:hidden" />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-6">
            <ProfileDropDown class="hidden lg:block" />
            <button
              className="block text-gray-400 outline-none lg:hidden"
              onClick={() => setMenuState(!menuState)}
            >
              {menuState ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
