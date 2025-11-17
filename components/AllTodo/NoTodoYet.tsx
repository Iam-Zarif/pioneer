"use client";

import Image from "next/image";
import React from "react";
import no_todo from "@/public/no-todo.svg";
import AddNewTaskModal from "./AddNewTaskModal";
import { Todo } from "./types";

interface NoTodoYetProps {
  onTodoAdded: (newTodo: Todo) => void;
}

export default function NoTodoYet({ onTodoAdded }: NoTodoYetProps) {
  const [todoOpen, setTodoOpen] = React.useState(false);

  const toggleTodo = () => setTodoOpen(prev => !prev);

  return (
    <>
      <section className="mt-6 bg-white border rounded-xl min-h-120 border-input flex items-center justify-center">
        <div>
          <Image
            onClick={toggleTodo}
            src={no_todo}
            className="w-60 cursor-pointer"
            alt="No Todo"
            width={150}
            height={150}
          />
          <p className="text-center text-2xl mt-4">No todos yet</p>
        </div>
      </section>

      {todoOpen && (
        <AddNewTaskModal
          toggleTodo={toggleTodo}
          onTodoAdded={(todo: Todo) => {
            onTodoAdded(todo);
            toggleTodo();
          }}
        />
      )}
    </>
  );
}
