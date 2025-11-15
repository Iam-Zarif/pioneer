"use client";

import { usePathname } from "next/navigation";
import TopNav from "@/components/shared/TopNav/TopNav";
import LeftNav from "@/components/shared/LeftNav/LeftNav";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  if (isAuthRoute) return <main className="h-full">{children}</main>;

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="col-span-3 z-9999">
        <LeftNav />
      </div>
      <div className="col-span-9 flex flex-col">
        <TopNav />
        <main className="bg-light h-full">{children}</main>
      </div>
    </div>
  );
}
