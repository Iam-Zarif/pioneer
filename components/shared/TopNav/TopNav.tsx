"use client";

import logo from "@/public/logo.svg";
import Image from "next/image";
import notification from "@/public/notification.svg";
import calender from "@/public/calender.svg";
import { useEffect, useState } from "react";

interface TopNavProps {
  toggleSidebar?: () => void;
}

export default function TopNav({ toggleSidebar }: TopNavProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = `${String(currentTime.getDate()).padStart(2, "0")}/${
    String(currentTime.getMonth() + 1).padStart(2, "0")
  }/${currentTime.getFullYear()}`;

  const dayName = currentTime.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="w-full bg-white flex items-center justify-between py-4 px-6 md:px-16 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="block md:hidden focus:outline-none"
        >
          <span className="block w-6 h-0.5 bg-dark mb-1"></span>
          <span className="block w-6 h-0.5 bg-dark mb-1"></span>
          <span className="block w-6 h-0.5 bg-dark"></span>
        </button>
        <Image src={logo} alt="Logo" width={120} height={60} className="w-8" />
        <div className="hidden sm:flex flex-col leading-tight">
          <p className="font-bold text-sm sm:text-base">DREAMY</p>
          <p className="text-xs sm:text-sm -mt-1">SOFTWARE</p>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        <Image src={notification} alt="Notification" width={20} height={20} className="w-7 h-7" />
        <Image src={calender} alt="Calendar" width={20} height={20} className="w-7 h-7" />
        <div className="text-dark text-xs sm:text-sm font-medium text-right">
          <p>{dayName}</p>
          <p className="lg:-mt-1">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
