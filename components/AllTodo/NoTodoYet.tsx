"use client";

import no_todo from "@/public/no-todo.svg";
import Image from "next/image";
import React from "react";

import AddNewTaskModal from "./AddNewTaskModal";
export default function NoTodoYet() {
  const [todoOpen, setTodoOpen] = React.useState(false);

  const toggleTodo = () => setTodoOpen(!todoOpen);
  return (
    <>
      {" "}
     
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
          <p className="text-center text-2xl">No todos yet</p>
        </div>
      </section>
      {todoOpen && <AddNewTaskModal toggleTodo={toggleTodo} />}
    </>
  );
}
