"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { useTodos, Todo } from "@/contexts/TodoContext";
import NoTodoYet from "./NoTodoYet";
import IfTodoExist from "./IfTodoExist";
import searchIcon from "@/public/search.svg";
import filterIcon from "@/public/filter.svg";
import FilterItems from "./FilterItems";

export default function AllTodo() {
  const { todos, loading } = useTodos();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

const filteredTodos: Todo[] = useMemo(() => {
  if (!todos?.results) return [];

  const today = new Date();

  return todos.results.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilters.length === 0) return matchesSearch;

    const todoDate = new Date(t.todo_date);
    const diffDays = Math.ceil((todoDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

    const matchesFilter = selectedFilters.some((filter) => {
      switch (filter) {
        case "Deadline today":
          return todoDate.toDateString() === today.toDateString();
        case "Expires in 5 days":
          return diffDays <= 5;
        case "Expires in 10 days":
          return diffDays <= 10;
        case "Expires in 15 days":
          return diffDays <= 15;
        default:
          return true;
      }
    });

    return matchesSearch && matchesFilter;
  });
}, [todos, searchTerm, selectedFilters]);


  const count = filteredTodos.length;

  return (
    <>
      <section className="lg:mt-8 mt-4 flex w-full items-center gap-3">
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Search your task here..."
            className="border-input placeholder:text-sm px-3 focus:outline-none pr-10 border rounded-lg bg-white py-1.5 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
          />
          <Image 
         
            className="absolute w-auto h-auto top-1/2 right-0 -translate-y-1/2"
            alt="search"
            width={36}
            height={45}
            src={searchIcon}
          />
        </div>

        <div
          ref={filterRef}
          className="border relative bg-white flex-nowrap text-nowrap pl-2.5 pr-4 cursor-pointer py-1.5 border-input rounded-lg flex items-center gap-1 lg:gap-3"
        >
          <p className="text-sm lg:text-[16px]" onClick={() => setFilterOpen(!filterOpen)}>Filter By</p>
          <Image  alt="filter" className="w-auto h-auto" width={24} height={45} src={filterIcon} />

          {filterOpen && (
            <div className="absolute px-2.5 pb-2 top-10 right-0 shadow-[0px_3px_6px_0px_#00000029] text-sm text-dark-gray bg-white rounded-md w-44 z-10">
              <p className="pt-2 hover:bg-light-gray cursor-pointer rounded-t-lg">
                Date
              </p>
              <div className="w-full mt-1 h-px bg-input"></div>
              <FilterItems
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
            </div>
          )}
        </div>
      </section>

      <section className="mt-6">
        {loading && (
          <div className="w-full text-center py-10 text-gray-500">
            Loading todos...
          </div>
        )}

        {!loading && (!todos?.results || todos.results.length === 0) && (
          <NoTodoYet onTodoAdded={() => {}} />
        )}

        {!loading &&
          todos?.results &&
          todos.results.length > 0 &&
          count === 0 && (
            <div className="w-full text-center py-10 text-gray-500">
              No Todos Found
            </div>
          )}

        {!loading && count > 0 && <IfTodoExist filteredTodos={filteredTodos} />}
      </section>
    </>
  );
}
