import edit from "@/public/edit.svg";
import delete_red from "@/public/delete_red.svg";
import boxes from "@/public/boxes.svg";
import Image from "next/image";

export default function IfTodoExist(){
    return(<> <section className="mt-10">
        <p className="text-lg font-semibold">Your Tasks</p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="border border-[#FEE2E2] rounded-lg p-5 bg-white">
            <div className="w-full flex items-center justify-between ">
              <p>Backend Infrastrcture</p>

              <div className="flex items-center gap-1">
                <p className="text-red font-normal px-3 py-1 text-sm rounded-md bg-[#FEE2E2]">
                  Extreme
                </p>
                <Image alt="boxes" width={10} height={20} src={boxes} />
              </div>
            </div>
            <p className="mt-4 text-[#4B5563] text-sm font-normal">
              Upgrading backend infrastructure for better performance
            </p>
            <div className="w-full flex items-center justify-between mt-4">
              <p className="mt-4 text-[#4B5563] text-sm font-normal">
                Due Apr 15, 2025{" "}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="bg-light p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                    <Image alt="edit" width={15} height={15} src={edit} />
                  </div>

                  <div className="bg-light p-2 rounded-lg cursor-pointer hover:bg-red-100 transition">
                    <Image
                      alt="delete"
                      width={15}
                      height={15}
                      src={delete_red}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-[#DCFCE7] rounded-lg p-5 bg-white">
            <div className="w-full flex items-center justify-between ">
              <p>Backend Infrastrcture</p>

              <div className="flex items-center gap-1">
                <p className="text-[#16A34A] font-normal px-3 py-1 text-sm rounded-md bg-[#DCFCE7]">
                  Moderate
                </p>
                <Image alt="boxes" width={10} height={20} src={boxes} />
              </div>
            </div>
            <p className="mt-4 text-[#4B5563] text-sm font-normal">
              Upgrading backend infrastructure for better performance
            </p>
            <div className="w-full flex items-center justify-between mt-4">
              <p className="mt-4 text-[#4B5563] text-sm font-normal">
                Due Apr 15, 2025{" "}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="bg-light p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                    <Image alt="edit" width={15} height={15} src={edit} />
                  </div>

                  <div className="bg-light p-2 rounded-lg cursor-pointer hover:bg-red-100 transition">
                    <Image
                      alt="delete"
                      width={15}
                      height={15}
                      src={delete_red}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-[#FEF9C3] rounded-lg p-5 bg-white">
            <div className="w-full flex items-center justify-between ">
              <p>Backend Infrastrcture</p>

              <div className="flex items-center gap-1">
                <p className="text-[#CA8A04] font-normal px-3 py-1 text-sm rounded-md bg-[#FEF9C3]">
                  Low
                </p>
                <Image alt="boxes" width={10} height={20} src={boxes} />
              </div>
            </div>
            <p className="mt-4 text-[#4B5563] text-sm font-normal">
              Upgrading backend infrastructure for better performance
            </p>
            <div className="w-full flex items-center justify-between mt-4">
              <p className="mt-4 text-[#4B5563] text-sm font-normal">
                Due Apr 15, 2025{" "}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="bg-light p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                    <Image alt="edit" width={15} height={15} src={edit} />
                  </div>

                  <div className="bg-light p-2 rounded-lg cursor-pointer hover:bg-red-100 transition">
                    <Image
                      alt="delete"
                      width={15}
                      height={15}
                      src={delete_red}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section></>)
}