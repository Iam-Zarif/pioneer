"use client";

import Image from "next/image";
import cam from "@/public/cam.svg";
import upload from "@/public/upload.svg";
import birth from "@/public/birth.svg";
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthAndProfileContext";

export default function AccountPage() {
  const { user, loading, updateProfile } = useAuth();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    contact_number: "",
    birthday: "",
    bio: "",
  });
  const [initialForm, setInitialForm] = useState(form);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const dateInputRef = useRef<HTMLInputElement>(null);

  // Populate form when user loads
  useEffect(() => {
    if (user) {
      const userForm = {
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        address: user.address || "",
        contact_number: user.contact_number || "",
        birthday: user.birthday || "",
        bio: user.bio || "",
      };
      setForm(userForm);
      setInitialForm(userForm);
      setImagePreview(user.profile_image || null);
    }
  }, [user]);

  const openNativePicker = () => {
    dateInputRef.current?.showPicker();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, birthday: e.target.value }));
    setStatus("idle");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus("idle");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
      setStatus("idle");
    }
  };

  const isFormChanged = () => {
    return (
      profileImage ||
      Object.keys(form).some(
        (key) =>
          form[key as keyof typeof form] !==
          initialForm[key as keyof typeof initialForm]
      )
    );
  };
  const handleSave = async () => {
    if (!isFormChanged()) return;

    setSaving(true);
    setStatus("idle");

    try {
      const jsonData = {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        address: form.address,
        contact_number: form.contact_number,
        birthday: form.birthday,
        bio: form.bio,
        profile_image: profileImage ?? undefined,
      };

      await updateProfile(jsonData);

      setInitialForm({ ...form });
      setProfileImage(null);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };
  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (loading) return <p className="text-dark text-center mt-10">Loading...</p>;

  const buttonBg =
    status === "success"
      ? "bg-green-500"
      : status === "error"
      ? "bg-red-500"
      : "bg-primary";


  return (
    <div className="py-8 px-20 col-span-9">
      <div className="bg-white rounded-2xl py-5 px-8">
        <h1 className="text-2xl font-bold text-dark">Account Information</h1>
        <div className="w-40 bg-primary h-0.5"></div>

        <div className="mt-6 px-6 py-4 rounded-xl border border-[#A1A3ABA1] inline-block">
          <div className="flex items-center gap-6">
            <div className="w-22 h-22 bg-[#9F9F9F] rounded-full relative">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile"
                  width={88}
                  height={88}
                  className="rounded-full object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-[#9F9F9F]" />
              )}
              <div className="absolute -bottom-1 -right-1 w-8 h-8">
                <Image
                  src={cam}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full cursor-pointer"
                />
              </div>
            </div>

            <label className="bg-primary px-5 py-2.5 cursor-pointer rounded-md flex items-center gap-2">
              <Image src={upload} alt="Upload" width={16} height={16} />
              <span className="text-white text-sm font-light">
                Upload New Photo
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <div className="rounded-xl border w-full py-4 mt-6 px-12 border-[#A1A3ABA1]">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="w-full">
              <p className="text-sm font-medium">First Name</p>
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                type="text"
                className="border mt-1 border-input px-2 w-full py-2.5 text-sm focus:outline-none rounded-lg"
              />
            </div>

            <div className="w-full">
              <p className="text-sm font-medium">Last Name</p>
              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                type="text"
                className="border mt-1 border-input px-2 w-full py-2.5 text-sm focus:outline-none rounded-lg"
              />
            </div>

            <div className="w-full col-span-2">
              <p className="text-sm font-medium">Email</p>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                className="border mt-1 border-input px-2 w-full py-2.5 text-sm focus:outline-none rounded-lg"
              />
            </div>

            <div className="w-full">
              <p className="text-sm font-medium">Address</p>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                type="text"
                className="border mt-1 border-input px-2 w-full py-2.5 text-sm focus:outline-none rounded-lg"
              />
            </div>

            <div className="w-full">
              <p className="text-sm font-medium">Contact Number</p>
              <input
                name="contact_number"
                value={form.contact_number}
                onChange={handleChange}
                type="text"
                className="border mt-1 border-input px-2 w-full py-2.5 text-sm focus:outline-none rounded-lg"
              />
            </div>

            <div className="w-full col-span-2">
              <p className="font-semibold text-sm">Date</p>
              <div className="relative mt-1 w-full">
                <input
                  ref={dateInputRef}
                  type="date"
                  value={form.birthday}
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
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !isFormChanged()}
              className={`${buttonBg} rounded-lg w-52 flex items-center justify-center text-white text-sm font-normal py-2.5 ${
                saving || !isFormChanged()
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } text-center`}
            >
              {saving
                ? "Saving..."
                : status === "success"
                ? "Saved!"
                : status === "error"
                ? "Failed!"
                : "Save Changes"}
            </button>
            <button
              type="button"
              className="bg-gray rounded-lg w-52 flex items-center justify-center text-white text-sm font-normal py-2.5 cursor-pointer text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
