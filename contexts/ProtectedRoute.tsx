"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./AuthAndProfileContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    const isAuthRoute = pathname.startsWith("/auth");

    if (!user && !isAuthRoute) {
      router.replace("/auth/login");
    } else if (user && isAuthRoute) {
      router.replace("/");
    }
  }, [user, loading, pathname, router]);

  if (loading || user === undefined) {
    return ( <div className="fixed inset-0 flex items-center justify-center bg-gray-100  z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="flex space-x-2">
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-75"></span>
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></span>
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></span>
        </div>

        <p className="text-gray-700  font-medium text-lg">
          Loading, please wait...
        </p>
      </div>

      <style jsx>{`
        .animate-bounce {
          @apply animate-bounce;
        }
        .delay-75 {
          animation-delay: 0.1s;
        }
        .delay-150 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>);
  }

  return <>{children}</>;
}
