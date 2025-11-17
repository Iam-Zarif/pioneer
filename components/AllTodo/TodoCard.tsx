  "use client";

  import Image from "next/image";
  import { Todo } from "@/contexts/TodoContext";

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  dragHandleProps?: DraggableSyntheticListeners; 
}

  import boxes from "@/public/boxes.svg";
  import editIcon from "@/public/edit.svg";
  import delete_red from "@/public/delete_red.svg";
import { DraggableSyntheticListeners } from "@dnd-kit/core";

export default function TodoCard({ todo, onEdit, onDelete, dragHandleProps }: TodoCardProps) {
  let priorityColor: string;
  let priorityBg: string;

  switch (todo.priority.toLowerCase()) {
    case "extreme":
      priorityColor = "#B91C1C";
      priorityBg = "#FEE2E2";
      break;
    case "moderate":
      priorityColor = "#16A34A";
      priorityBg = "#DCFCE7";
      break;
    case "low":
      priorityColor = "#CA8A04";
      priorityBg = "#FEF9C3";
      break;
    default:
      priorityColor = "#4B5563";
      priorityBg = "#E5E7EB";
  }
const words = todo.description.split(/\s+/); // split by any whitespace
const shortDesc = words.length > 8 ? words.slice(0, 8).join(" ") + "..." : todo.description;

  return (
    <div
      className="border h-full w-full rounded-lg p-5 bg-white flex flex-col justify-between"
      style={{ borderColor: priorityBg }}
    >
      <div {...dragHandleProps} className="cursor-grab">
        <div className="w-full flex items-center justify-between">
          <p>{todo.title}</p>
          <div className="flex items-center gap-1">
            <p
              className="font-normal px-3 py-1 text-sm rounded-md"
              style={{ color: priorityColor, backgroundColor: priorityBg }}
            >
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </p>
            <Image alt="boxes" width={10} height={20} src={boxes} />
          </div>
        </div>

        <p className="mt-3 text-[#4B5563] text-sm font-normal">
       {shortDesc}
        </p>
      </div>

      <div className="w-full flex items-center justify-between mt-3">
        <p className="text-[#4B5563] text-sm font-normal">Due {todo.todo_date}</p>
        <div className="flex gap-2">
          <div
            className="bg-light p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(todo);
            }}
          >
            <Image alt="edit" width={15} height={15} src={editIcon} />
          </div>

          <div
            className="bg-light p-2 rounded-lg cursor-pointer hover:bg-red-100 transition"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo);
            }}
          >
            <Image alt="delete" width={15} height={15} src={delete_red} />
          </div>
        </div>
      </div>
    </div>
  );
}


