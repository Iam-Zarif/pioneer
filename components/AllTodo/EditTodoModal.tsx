"use client";

import Image from "next/image";
import datePicker from "@/public/datePicker.svg";
import Delete from "@/public/delete.svg";

interface EditTodoModalProps {
  title: string;
  setTitle: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
  priority: "extreme" | "moderate" | "low";
  setPriority: (v: "extreme" | "moderate" | "low") => void;
  description: string;
  setDescription: (v: string) => void;
  onClose: () => void;
  onUpdate: () => void;
  loading: boolean;
}

import { useRef } from "react";

export default function EditTodoModal({ title, setTitle, date, setDate, priority, setPriority, description, setDescription, onClose, onUpdate, loading }: EditTodoModalProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const openNativePicker = () => {
    if (dateInputRef.current) dateInputRef.current.showPicker();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center h-full justify-center bg-black/80">
      <div className="bg-white rounded-xl w-140 p-8 relative shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-md font-bold text-dark">Edit Task</h1>
            <div className="w-20 bg-primary h-0.5"></div>
          </div>
          <button onClick={onClose} className="cursor-pointer">
            <span className="text-sm font-semibold">Go back</span>
            <div className="w-14 bg-black h-0.5"></div>
          </button>
        </div>

        {/* Inputs */}
        <div className="mt-10 flex flex-col gap-3">
          {/* Title */}
          <div>
            <p className="font-semibold text-sm">Title</p>
            <input
              type="text"
              className="w-full font-normal text-sm mt-1 border border-input rounded-lg py-2 px-3 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Date */}
          <div>
            <p className="font-semibold text-sm">Date</p>
            <div className="relative mt-1 w-full">
              <input
                ref={dateInputRef}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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

          {/* Priority */}
          <div>
            <p className="font-semibold text-sm">Priority</p>
            <div className="mt-1 flex items-center gap-12">
              {["extreme", "moderate", "low"].map((p) => (
                <div key={p} className="flex items-center gap-2">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      p === "extreme"
                        ? "bg-red"
                        : p === "moderate"
                        ? "bg-green"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                  <p className="text-sm font-normal text-dark-gray">{p.charAt(0).toUpperCase() + p.slice(1)}</p>
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === p}
                    onChange={() => setPriority(p as "extreme" | "moderate" | "low")}
                    className="w-3.5 h-3.5 rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-sm">Task Description</p>
            <textarea
              className="w-full font-normal text-sm mt-1 border border-input rounded-lg py-3 px-4 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={10}
            ></textarea>
          </div>

          <div className="mt-4 flex items-center w-full justify-between">
            <button
              onClick={onUpdate}
              className="bg-primary cursor-pointer px-8 py-2 text-sm text-white rounded-lg"
              disabled={loading}
            >
              {loading ? "Saving..." : "Done"}
            </button>

            <div className="bg-red p-2.5 cursor-pointer rounded-lg">
              <Image src={Delete} alt="delete" className="w-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
