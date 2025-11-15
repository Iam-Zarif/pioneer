import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/components/shared/TopNav/TopNav";
import LeftNav from "@/components/shared/LeftNav/LeftNav";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Dreamy Software",
  description: "Dashboard",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-pathname") || "";
  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        {isAuthRoute ? (
          <main className="h-full">{children}</main>
        ) : (
          <div className="grid grid-cols-12 min-h-screen">
            <div className="col-span-3 z-9999">
              <LeftNav />
            </div>

            <div className="col-span-9 flex flex-col">
              <TopNav />
              <main className="bg-light h-full">{children}</main>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
