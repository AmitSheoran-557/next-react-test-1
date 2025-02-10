"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DASHBOARD_BUTTON_LIST } from "@/utils/helper";
import MultiImage from "./MultiImage";
import QuestionOne from "./QuestionOne";
import Calendly from "./Calendly";

const Dashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  console.log(page);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/");
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [router]);

  const [open, setOpen] = useState(0);

  const handleButtonClick = (index: any) => {
    setOpen(open === index ? false : index);
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/*----------------------------------- Navbar ---------------------------------*/}
      <div className="w-full bg-black text-white py-4 fixed top-0 left-0 z-10 shadow-lg">
        <div className="flex justify-between items-center px-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex gap-6">
            {DASHBOARD_BUTTON_LIST.map((item, index) => (
              <Link href={`/dashboard?page=${item.toLowerCase().replace(" ", "-")}`} onClick={() => handleButtonClick(index)} key={index} className={`${page === item.toLowerCase().replace(" ", "-") && "bg-white text-black"
                } py-2 px-6 rounded-lg cursor-pointer hover:bg-white/50 transition-all duration-300 hover:text-black text-lg`}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------------------------- Main Content --------------------------------*/}
      <div className="w-full pt-24 pl-6 pr-6">
        <div className="pt-32">
          {page === "button1" ? (
            <QuestionOne />
          ) : page === "button2" ? (
            <Calendly />
          ) : page === "button3" ? (
            <MultiImage />
          ) : (
            <p className="text-lg text-center mt-6">Select an option from the navbar</p>
          )}
        </div>
      </div>

      {/* ---------------------------------- Logout Button ------------------------------------  */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleLogout}
          className="bg-red-600 py-3 px-6 rounded-lg text-white text-lg hover:bg-red-700 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
