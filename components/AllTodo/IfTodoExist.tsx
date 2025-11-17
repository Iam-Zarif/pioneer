"use client";

import { useEffect, useState } from "react";
import { useTodos, Todo } from "@/contexts/TodoContext";
import TodoCard from "./TodoCard";
import EditTodoModal from "./EditTodoModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = { filteredTodos: Todo[] }; // always pass filteredTodos

function SortableTodo({
  todo,
  onEdit,
  onDelete,
}: {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id.toString() });

  return (
    <div
      className="overflow-x-hidden"
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
    >
      <TodoCard todo={todo} onEdit={onEdit} onDelete={onDelete} dragHandleProps={listeners} />
    </div>
  );
}

export default function IfTodoExist({ filteredTodos }: Props) {
  const { updateTodoPosition, deleteTodo, updateTodo } = useTodos();
  const [localTodos, setLocalTodos] = useState<Todo[]>(filteredTodos);

  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState<"extreme" | "moderate" | "low">("low");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setLocalTodos(filteredTodos);
  }, [filteredTodos]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localTodos.findIndex((t) => t.id.toString() === active.id);
    const newIndex = localTodos.findIndex((t) => t.id.toString() === over.id);

    const newTodos = arrayMove(localTodos, oldIndex, newIndex);
    setLocalTodos(newTodos);

    await Promise.all(
      newTodos.map((t, idx) => updateTodoPosition(t.id, idx + 1))
    );
  };

  const openEditModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setTitle(todo.title);
    setDate(todo.todo_date);
    setPriority(todo.priority);
    setDescription(todo.description);
    setEditOpen(true);
  };

  const closeEditModal = () => {
    setEditOpen(false);
    setSelectedTodo(null);
  };

  const openConfirm = (todo: Todo) => {
    setSelectedTodo(todo);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setSelectedTodo(null);
  };

  const handleDelete = async () => {
    if (!selectedTodo) return;
    await deleteTodo(selectedTodo.id);
    setLocalTodos(localTodos.filter((t) => t.id !== selectedTodo.id));
    closeConfirm();
  };

  const handleUpdate = async () => {
    if (!selectedTodo) return;
    await updateTodo(selectedTodo.id, { title, description, todo_date: date, priority });
    setLocalTodos(
      localTodos.map((t) =>
        t.id === selectedTodo.id ? { ...t, title, description, todo_date: date, priority } : t
      )
    );
    closeEditModal();
  };

  if (!localTodos.length)
    return <div className="w-full text-center py-10 text-gray-500">No Todos Found</div>;

  return (
    <section className="lg:mt-10 mt-6 overflow-x-hidden">
      <p className="text-lg font-semibold">Your Tasks</p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={localTodos.map((t) => t.id.toString())} strategy={verticalListSortingStrategy}>
          <div className="mt-6 grid lg:grid-cols-3 gap-3 overflow-y-auto max-h-[60vh] pr-2 thin-scrollbar">
            {localTodos.map((todo) => (
              <SortableTodo key={todo.id} todo={todo} onEdit={openEditModal} onDelete={openConfirm} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {confirmOpen && selectedTodo && (
        <DeleteConfirmModal todoTitle={selectedTodo.title} onDelete={handleDelete} onCancel={closeConfirm} loading={false} />
      )}

      {editOpen && (
        <EditTodoModal
          title={title}
          setTitle={setTitle}
          date={date}
          setDate={setDate}
          priority={priority}
          setPriority={setPriority}
          description={description}
          setDescription={setDescription}
          onClose={closeEditModal}
          onUpdate={handleUpdate}
          loading={false}
        />
      )}
    </section>
  );
}
