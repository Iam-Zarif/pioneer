"use client";
import Image from "next/image";
import cam from "@/public/cam.svg";
import upload from "@/public/upload.svg";
import React from "react";

interface Props {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImageUploader: React.FC<Props> = ({ imagePreview, onImageChange }) => {
  return (
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
          <Image  src={cam} alt="Profile" width={32} height={32} className="rounded-full cursor-pointer" />
        </div>
      </div>

      <label className="bg-primary px-5 py-2.5 cursor-pointer rounded-md flex items-center gap-2">
        <Image  src={upload} alt="Upload" width={16} height={16} />
        <span className="text-white text-sm font-light">Upload New Photo</span>
        <input type="file" accept="image/*" className="hidden" onChange={onImageChange} />
      </label>
    </div>
  );
};

export default ProfileImageUploader;
