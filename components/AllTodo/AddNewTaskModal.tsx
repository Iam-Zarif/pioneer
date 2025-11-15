import datePicker from "@/public/datePicker.svg";
import Delete from "@/public/delete.svg";
import Image from "next/image";
import React from "react";

export default function AddNewTaskModal({
  toggleTodo,
}: {
  toggleTodo: () => void;
}) {
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
    <div className="absolute inset-0 z-50  flex items-center justify-center bg-black/80">
      <div className="bg-white rounded-xl w-140 p-8 relative shadow-lg">
        <div className="flex items-center justify-between w-full">
          {" "}
          <div className="">
            {" "}
            <h1 className="text-md font-bold  text-dark">Add new task</h1>
            <div className="w-20 bg-primary h-0.5"></div>
          </div>
          <button onClick={toggleTodo} className="cursor-pointer">
            <span className="text-sm font-semibold">Go back</span>
            <div className="w-14 bg-black h-0.5"></div>
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {" "}
          <div>
            {" "}
            <p className="font-semibold text-sm">Title</p>{" "}
            <input
              type="text"
              className="w-full font-normal text-sm mt-1 border border-input rounded-lg py-2 px-3 focus:outline-none"
              name=""
              id=""
            />{" "}
          </div>
          <div>
            <p className="font-semibold text-sm">Date</p>
            <div className="relative mt-1 w-full">
              <input
                ref={dateInputRef}
                type="date"
                value={date}
                onChange={handleDateChange}
                className="w-full font-normal text-sm border border-input rounded-lg py-2 px-3 focus:outline-none"
              />

              <Image
                src={datePicker}
                alt="date picker"
                className="absolute w-3.5 cursor-pointer top-3 right-3"
                width={20}
                height={20}
                onClick={openNativePicker} 
              />
            </div>
          </div>
          <div>
            {" "}
            <p className="font-semibold text-sm">priority</p>{" "}
            <div className="mt-1 flex items-center  gap-12">
              <div className="flex items-center gap-2">
                <div className="bg-red w-1.5 h-1.5 rounded-full"></div>
                <p className="text-sm font-normal text-dark-gray">Extreme</p>
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded-lg"
                  name=""
                  id=""
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-green w-1.5 h-1.5 rounded-full"></div>
                <p className="text-sm font-normal text-dark-gray">Moderate</p>
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded-lg"
                  name=""
                  id=""
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-yellow-500 w-1.5 h-1.5 rounded-full"></div>
                <p className="text-sm font-normal text-dark-gray">Low</p>
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded-lg"
                  name=""
                  id=""
                />
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm">Task Description</p>{" "}
            <textarea
              className="w-full font-normal text-sm mt-1 border border-input rounded-lg py-3 px-4 focus:outline-none"
              name=""
              id=""
              placeholder="Start writing here....."
              rows={10}
            ></textarea>
          </div>
          <div className="mt-4 flex items-center w-full justify-between">
            <button className="bg-primary px-8 py-2 text-sm text-white rounded-lg">
              Done
            </button>
            <div className="bg-red p-2.5 cursor-pointer rounded-lg">
              <Image
                src={Delete}
                alt="delete"
                className="w-3.5 "
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
