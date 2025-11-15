import plus from "@/public/plus.svg";
import Image from "next/image";
import AllTodo from "@/components/AllTodo/AllTodo";

export default function Home() {
  return (
    <div className="px-5 relative h-full py-5  col-span-9">
      <div className="flex items-center justify-between w-full">
        <div className="">
          {" "}
          <h1 className="text-4xl font-bold  text-dark">Todos</h1>
          <div className="w-16 bg-primary h-0.5"></div>
        </div>
        <div className="bg-primary flex items-center gap-2 cursor-pointer rounded-lg px-4 py-2">
          <Image
            src={plus}
            className="w-3.5"
            alt="Add Todo"
            width={20}
            height={20}
          />
          <p className="text-white font-light">New Task</p>
        </div>
      </div>

      <AllTodo/>
    </div>
  );
}
