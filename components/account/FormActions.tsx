"use client";
import React from "react";

interface Props {
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  isChanged: boolean;
  status: "idle" | "success" | "error";
}

const FormActions: React.FC<Props> = ({ onSave, onCancel, saving, isChanged, status }) => {
  const buttonBg =
    status === "success"
      ? "bg-green-500"
      : status === "error"
      ? "bg-red-500"
      : "bg-primary";

  return (
    <div className="mt-8 flex items-center justify-center gap-4 w-full">
      <button
        type="button"
        onClick={onSave}
        disabled={saving || !isChanged}
        className={`${buttonBg} rounded-lg w-52 flex items-center justify-center text-white text-sm font-normal py-2.5 ${
          saving || !isChanged ? "cursor-not-allowed" : "cursor-pointer"
        } text-center`}
      >
        {saving ? "Saving..." : status === "success" ? "Saved!" : status === "error" ? "Failed!" : "Save Changes"}
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="bg-gray rounded-lg w-52 flex items-center justify-center text-white text-sm font-normal py-2.5 cursor-pointer text-center"
      >
        Cancel
      </button>
    </div>
  );
};

export default FormActions;
