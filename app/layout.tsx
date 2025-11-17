import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthAndProfileContext"; // <- import
import LayoutContent from "./LayoutContent";
import { TodoProvider } from "@/contexts/TodoContext";
import ProtectedRoute from "@/contexts/ProtectedRoute";

export const metadata: Metadata = {
  title: "Dreamy Software",
  description: "Dashboard for managing tasks and projects efficiently.",
  openGraph: {
    type: "website",
    url: "https://dreamy-software.vercel.app",
    title: "Dreamy Software",
    description: "Dashboard for managing tasks and projects efficiently.",
    siteName: "Dreamy Software",
    images: [
      {
        url: "https://i.ibb.co.com/JWHFHFM6/logo.png",
        width: 800,
        height: 600,
        alt: "Dreamy Software Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dreamy Software",
    description: "Dashboard for managing tasks and projects efficiently.",
    site: "@DreamySoftware",
    images: ["https://i.ibb.co.com/JWHFHFM6/logo.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        <AuthProvider>
          <ProtectedRoute>
            <TodoProvider>
              <LayoutContent>{children}</LayoutContent>
            </TodoProvider>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
