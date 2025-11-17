"use client";

import { usePathname } from "next/navigation";
import TopNav from "@/components/shared/TopNav/TopNav";
import LeftNav from "@/components/shared/LeftNav/LeftNav";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  if (isAuthRoute) return <main className="h-full">{children}</main>;

  return (
    <div className="grid grid-cols-12 max-w-360 w-full mx-auto min-h-screen">
      <div className="col-span-3  w-full   z-9999">
        <LeftNav />
      </div>
      <div className="col-span-9 bg-light h-full flex flex-col">
        <TopNav />
        <main className=" mx-auto w-full h-full">{children}</main>
      </div>
    </div>
  );
}
