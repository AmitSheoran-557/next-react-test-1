"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DASHBOARD_BUTTON_LIST } from "@/utils/helper";
import QuestionOne from "@/components/dashboard/QuestionOne";
import Calendly from "@/components/dashboard/Calendly";
import MultiImage from "@/components/dashboard/MultiImage";


const Dashboard = () => {
    const router = useRouter();
    const params = useParams();
    const { button } = params;
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

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open && window.innerWidth < 1024) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);



    return (
        <div className="flex min-h-screen w-full bg-gray-100">
            {/*----------------------------------- Navbar ---------------------------------*/}
            <div className="w-full bg-black text-white py-4 fixed top-0 left-0 z-10 shadow-lg">
                <div className="flex justify-between items-center px-6">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <div className="flex gap-6">
                        <button onClick={() => setOpen(!open)} className={`hidden size-7 justify-center relative z-[70] max-lg:flex flex-col overflow-hidden`}>
                            <span className={`w-6 transition-all duration-300 min-h-[2.2px] max-h-[2px] mb-1 rounded-sm bg-white relative after:w-full after:h-full after:absolute after:top-0 after:left-0 ${open ? "rotate-45 !-mb-1 after:rotate-90 after:!rounded-sm after:bg-white !bg-white" : ""}`}></span>
                            <span className={`w-6 transition-all duration-300 min-h-[2.3px] max-h-[2px] mb-1 rounded-sm bg-white ${open ? "hidden" : ""}`}></span>
                            <span className={`w-6 transition-all duration-300 min-h-[2.2px] max-h-[2px] mb-1 rounded-sm bg-white after:!bg-white ${open ? "-translate-x-10 !bg-white" : ""}`}></span>
                        </button>
                        <div className={`flex xl:gap-5 xl:pl-10 lg:pl-5 items-center max-lg:px-4 relative w-full max-lg:bg-black mx-auto gap-4 lg:max-h-max max-lg:fixed max-lg:top-0 max-lg:h-full max-lg:w-full max-lg:flex-col max-lg:duration-300 justify-center max-lg:items-center z-[60] ${open ? "max-lg:left-0" : "max-lg:left-full"}`}>
                            {DASHBOARD_BUTTON_LIST.map((item, index) => (
                                <Link href={`/dashboard/${item.toLowerCase().replace(" ", "-")}`}
                                    onClick={() => setOpen(!open)}
                                    key={index}
                                    className={`${button === item.toLowerCase().replace(" ", "-") &&
                                        "bg-white text-black"
                                        } py-2 lg:px-6 px-3 rounded-lg cursor-pointer hover:bg-white/50 transition-all duration-300 hover:text-black lg:text-lg`}>
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------------------------------- Main Content --------------------------------*/}
            <div className="w-full pt-24 pl-6 pr-6">
                <div className="pt-32">
                    {button === "question1" ? (
                        <QuestionOne />
                    ) : button === "question2" ? (
                        <Calendly />
                    ) : button === "question3" ? (
                        <MultiImage />
                    ) : (
                        <p className="text-lg text-center mt-6">Select an option from the navbar</p>
                    )};
                </div>
            </div>

            {/* ---------------------------------- Logout Button ------------------------------------  */}
            <div className="fixed bottom-6 right-6">
                <button onClick={handleLogout}
                    className="bg-red-600 py-3 px-6 rounded-lg text-white text-lg hover:bg-red-700 transition-all ease-linear duration-300">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
