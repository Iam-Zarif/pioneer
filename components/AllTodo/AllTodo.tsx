"use client";
import search from "@/public/search.svg";
import filter from "@/public/filter.svg";
import no_todo from "@/public/no-todo.svg";
import Image from "next/image";
import React from "react";
import FilterItems from "./FilterItems";
import AddNewTaskModal from "./AddNewTaskModal";

export default function AllTodo() {
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [todoOpen, setTodoOpen] = React.useState(false);

  const toggleTodo = () => setTodoOpen(!todoOpen);
  const toggleFilter = () => setFilterOpen(!filterOpen);

  return (
    <>
      <section className="mt-8 flex w-full items-center gap-3">
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Search your task here..."
            className="border-input placeholder:text-sm px-3 focus:outline-none pr-10 border rounded-lg bg-white py-1.5 w-full"
          />
          <Image
            className="absolute top-1/2 right-0 -translate-y-1/2"
            alt="search"
            width={36}
            height={45}
            src={search}
          />
        </div>
        <div
          onClick={toggleFilter}
          className="border relative bg-white flex-nowrap text-nowrap px-2.5 cursor-pointer py-1.5 border-input rounded-lg flex items-center gap-3"
        >
          <p>Filter By</p>
          <Image alt="filter" width={24} height={45} src={filter} />

          {filterOpen && (
            <div className="absolute px-2.5 pb-2 top-10 right-0 shadow-[0px_3px_6px_0px_#00000029] text-sm text-dark-gray bg-white rounded-md w-44 z-10">
              <p className="pt-2 hover:bg-light-gray cursor-pointer rounded-t-lg">
                Date
              </p>
              <div className="w-full mt-1 h-px bg-input"></div>
              <FilterItems />
            </div>
          )}
        </div>
      </section>
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

      {todoOpen && (
       <AddNewTaskModal toggleTodo={toggleTodo}/>
      )}
    </>
  );
}
