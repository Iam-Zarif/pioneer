import { AuthProvider } from "@/contexts/AuthAndProfileContext";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="bg-light min-h-screen flex items-center justify-center">
        {children}
      </div>
    </AuthProvider>
  );
}
