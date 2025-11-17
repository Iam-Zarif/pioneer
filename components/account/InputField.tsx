"use client";
import React from "react";

interface Props {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  readOnly?: boolean; // optional
  onFocus?: () => void; // optional
}

const InputField: React.FC<Props> = ({
  label,
  name,
  value,
  type = "text",
  onChange,
  className = "",
  readOnly = false,
  onFocus,
}) => (
  <div className={className}>
    <p className="text-sm font-medium">{label}</p>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      readOnly={readOnly}
      onFocus={onFocus}
      className={`border mt-1 border-input px-2 w-full py-2.5 text-sm focus:outline-none rounded-lg ${
        readOnly ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    />
  </div>
);

export default InputField;
