import React from "react";
import { useUserContext } from "../context/UserContext";

const Dashboard: React.FC = () => {
  const { user } = useUserContext();
  return (
    <div className="-z-50 bg-slate-50 h-screen pt-20">
      <div className="container mx-auto">
        <div className="relative my-10 h-56 w-full rounded-xl">
          <img
            src="/gradient-2.jpg"
            className=" h-full w-full shadow-xl rotate-0 transform rounded-xl   object-cover "
            alt=""
          />
          <span className="absolute left-16 top-20 text-5xl font-bold text-white">
            Dashboard
          </span>
        </div>
       
       <div className="grid grid-cols-2 mb-10 gap-5 pb-20">
       <div className="rounded-lg bg-white p-5 shadow-lg ">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg mt-4 font-semibold text-gray-900">
              User Information
            </h3>
           
          </div>
          <div className="mt-3 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Full name
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user?.name}
                </dd>
              </div>
            
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user?.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Emergency Contacts
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                 +91 8943713703 <br /> <br />
                 +91 7907530468
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Device
                </dt>
                <dd className="mt-1 text-sm/6 text-emerald-500 font-bold sm:col-span-2 sm:mt-0">
                 Active
                </dd>
              </div>
              
            </dl>
          </div>
        </div>
     
        <img src="/circuit.jpg" className="w-full shadow-lg h-full object-cover rounded-md" alt="" />
       </div>
      </div>
    </div>
  );
};

export default Dashboard;
