"use client";
import Image from "next/image";
import cam from "@/public/cam.svg";
import upload from "@/public/upload.svg";
import birth from "@/public/birth.svg";
import React from "react";

export default function AccountPage() {
    const [date, setDate] = React.useState("");
    const dateInputRef = React.useRef<HTMLInputElement>(null);
  
    const openNativePicker = () => {
      dateInputRef.current?.showPicker();
    };
  
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
  
      if (value.trim() === "") {
        setDate("");
        return;
      }
  
      const isValid = /^\d{4}-\d{2}-\d{2}$/.test(value);
  
      if (isValid) {
        setDate(value);
      } else {
        return;
      }
    };
  return (
    <div className="py-8 px-20 col-span-9">
      <div className="bg-white rounded-2xl py-5 px-8">
        <h1 className="text-2xl font-bold  text-dark">Account Information</h1>
        <div className="w-40 bg-primary h-0.5"></div>
        <div className="mt-6 px-6 py-4 rounded-xl border border-[#A1A3ABA1] inline-block">
          <div className="flex items-center gap-6">
            <div className="w-22 h-22 bg-[#9F9F9F] rounded-full relative">
              <div className=" w-full h-full rounded-full"></div>
              <Image
                src={cam}
                alt="Profile"
                width={24}
                height={24}
                className=" absolute w-8 bottom-0 right-0 rounded-full"
              />
            </div>
            <button className="bg-primary px-5 py-2.5 cursor-pointer rounded-md flex items-center gap-2">
              <Image src={upload} alt="Upload" width={16} height={16} />
              <span className="text-white text-sm font-light">
                Upload New Photo
              </span>
            </button>
          </div>
        </div>

      <div className="rounded-xl border w-full py-4 mt-6 px-12 border-[#A1A3ABA1]">
          <div className="w-full  grid grid-cols-2 gap-x-4 gap-y-3 ">
        <div className="w-full">
          <p className="text-sm font-medium">First Name</p>
          <input type="text" className="border mt-1 border-input px-2 w-full py-2.5 text-sm focus:outline-none rounded-lg" name="" id="" />
        </div>
        <div className="w-full">
          <p className="text-sm font-medium">Last Name</p>
          <input type="text" className="border mt-1 border-input px-2 w-full py-2.5 text-sm focus:outline-none rounded-lg" name="" id="" />
        </div>
         <div className="w-full col-span-2">
          <p className="text-sm font-medium">Email</p>
          <input type="email" className="border mt-1 border-input px-2 w-full py-2.5 text-sm focus:outline-none rounded-lg" name="" id="" />
        </div>



        <div className="w-full">
          <p className="text-sm font-medium">Address</p>
          <input type="text" className="border mt-1 border-input px-2 w-full py-2.5 text-sm focus:outline-none rounded-lg" name="" id="" />
        </div>
        <div className="w-full">
          <p className="text-sm font-medium">Contact Number</p>
          <input type="text" className="border mt-1 border-input px-2 w-full py-2.5 text-sm focus:outline-none rounded-lg" name="" id="" />
        </div>




          <div className="w-full col-span-2">
            <p className="font-semibold text-sm">Date</p>
            <div className="relative mt-1 w-full">
              <input
                ref={dateInputRef}
                type="date"
                value={date}
                onChange={handleDateChange}
                className="w-full font-normal text-sm border border-input rounded-lg py-2.5 px-3 focus:outline-none"
              />

              <Image
                src={birth}
                alt="date picker"
                className="absolute w-4 cursor-pointer top-3 right-3"
                width={20}
                height={20}
                onClick={openNativePicker} 
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 w-full">
          <button className="bg-primary rounded-lg w-52 flex items-center justify-center text-white text-sm font-normal py-2.5 cursor-pointer text-center">Save Changes</button>
          <button className="bg-gray rounded-lg w-52 flex items-center justify-center text-white text-sm font-normal py-2.5 cursor-pointer text-center">Cancel</button>
        </div>
      </div>
      </div>
    </div>
  );
}
