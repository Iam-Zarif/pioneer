"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthAndProfileContext";
import cam from "@/public/cam.svg";
import upload from "@/public/upload.svg";
import birth from "@/public/birth.svg";
import InputField from "@/components/account/InputField";

const ProfileImageUploader = ({
  imagePreview,
  onImageChange,
}: {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
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
          alt="Camera"
          width={32}
          height={32}
          className="rounded-full cursor-pointer"
        />
      </div>
    </div>

    <label className="bg-primary px-5 py-2.5 cursor-pointer rounded-md flex items-center gap-2">
      <Image  src={upload} alt="Upload" width={16} height={16} />
      <span className="text-white text-sm font-light">Upload New Photo</span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageChange}
      />
    </label>
  </div>
);

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

useEffect(() => {
  if (!user) return;

  setForm(prev => ({
    ...prev,
    first_name: user.first_name || prev.first_name,
    last_name: user.last_name || prev.last_name,
    email: user.email || prev.email,
    address: user.address || prev.address,
    contact_number: user.contact_number || prev.contact_number,
    birthday: user.birthday || prev.birthday,
    bio: user.bio || prev.bio,
  }));

  setInitialForm(prev => ({
    ...prev,
    first_name: user.first_name || prev.first_name,
    last_name: user.last_name || prev.last_name,
    email: user.email || prev.email,
    address: user.address || prev.address,
    contact_number: user.contact_number || prev.contact_number,
    birthday: user.birthday || prev.birthday,
    bio: user.bio || prev.bio,
  }));

  setImagePreview(user.profile_image || null);
}, [user]);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus("idle");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
    setStatus("idle");
  };

  const isFormChanged = () =>
    profileImage ||
    Object.keys(form).some(
      (key) =>
        form[key as keyof typeof form] !==
        initialForm[key as keyof typeof initialForm]
    );

  const handleSave = async () => {
    if (!isFormChanged()) return;
    setSaving(true);
    setStatus("idle");
    try {
      await updateProfile({
        ...form,
        profile_image: profileImage ?? undefined,
      });
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

  const handleCancel = () => {
    setForm({ ...initialForm });
    setProfileImage(null);
    setImagePreview(user?.profile_image || null);
    setStatus("idle");
  };

  useEffect(() => {
    if (status !== "idle") {
      const timer = setTimeout(() => setStatus("idle"), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (loading)
    return <p className="text-dark text-center mt-10">Loading...</p>;

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
          <ProfileImageUploader
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
          />
        </div>

        <div className="rounded-xl border w-full py-4 mt-6 px-12 border-[#A1A3ABA1]">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="First Name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
            />
            <InputField
              label="Last Name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              value={form.email}
              type="email"
              readOnly={true}
              onChange={() => {}}
            />
            <InputField
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
            <InputField
              label="Contact Number"
              name="contact_number"
              value={form.contact_number}
              onChange={handleChange}
            />
          </div>

          <div className="w-full col-span-2 mt-4 relative">
            <p className="font-semibold text-sm">Date</p>
            <input
              ref={dateInputRef}
              type="date"
              value={form.birthday}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, birthday: e.target.value }))
              }
              className="w-full text-sm border border-input rounded-lg py-2.5 px-3 mt-1"
            />
            <Image 
              src={birth}
              alt="date picker"
              className="absolute w-4 cursor-pointer top-9 right-3"
              width={20}
              height={20}
              onClick={() => dateInputRef.current?.showPicker()}
            />
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 w-full">
            <button
              onClick={handleSave}
              disabled={saving || !isFormChanged()}
              className={`${buttonBg} rounded-lg w-52 flex items-center justify-center text-white text-sm font-normal py-2.5 ${
                saving || !isFormChanged()
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
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
              onClick={handleCancel}
              className="bg-gray rounded-lg w-52 flex items-center justify-center text-white text-sm font-normal py-2.5 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
