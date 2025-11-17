"use client";

interface DeleteConfirmModalProps {
  todoTitle: string;
  onDelete: () => void;
  onCancel: () => void;
  loading: boolean;
}

export default function DeleteConfirmModal({ todoTitle, onDelete, onCancel, loading }: DeleteConfirmModalProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center h-full justify-center bg-black/80">
      <div className="bg-white rounded-xl w-96 p-6 flex flex-col items-center">
        <p className="text-dark mb-4">Are you sure you want to delete &quot;{todoTitle}&quot;?</p>
        <div className="flex gap-4 font-normal text-sm">
          <button
            onClick={onDelete}
            disabled={loading}
            className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-200 cursor-pointer text-dark px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
