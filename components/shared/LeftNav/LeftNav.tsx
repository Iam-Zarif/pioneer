"use client";

import Image from "next/image";
import logoutIcon from "@/public/logout.svg";
import useIcons from "@/hooks/icons/useIcons";
import NavItem from "./NavItem";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthAndProfileContext";
import { useEffect } from "react";

export default function LeftNav() {
  const { user, loading, logout, getProfile } = useAuth();
  const { TodoIcon, AccountIcon } = useIcons();
  const pathname = usePathname();
  console.log(
    "LeftNav - Current pathname:",
    pathname,
    "user:",
    user,
    "loading:",
    loading
  );
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };
  useEffect(() => {
    if (!user) {
      getProfile();
    }
  }, [user, getProfile]);
  if (loading || !user) {
    return (
      <div className="bg-dark z-50 min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <aside className="bg-dark z-50 min-h-screen relative flex flex-col justify-between w-full">
      <div>
        <div className="flex flex-col pt-12 items-center">
          {user ? (
            <>
              {typeof user.profile_image === "string" ? (
                <Image
                  src={user.profile_image}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="my-4 w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="text-white my-4 w-20 h-20 bg-gray rounded-full flex items-center justify-center">
                  No Image
                </div>
              )}
              <p className="text-white font-semibold text-lg">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-light font-light text-xs">{user.email}</p>
            </>
          ) : (
            <p className="text-white my-4">Guest</p>
          )}
        </div>

        <nav className="flex flex-col mt-8 mx-auto">
          <NavItem
            label="Todos"
            Icon={TodoIcon}
            href="/"
            active={pathname === "/"}
          />
          <NavItem
            label="Account"
            Icon={AccountIcon}
            href="/account"
            active={pathname === "/account"}
          />
        </nav>
      </div>

      <div
        className="flex items-center gap-3 absolute bottom-14 left-16 cursor-pointer hover:text-white transition"
        onClick={handleLogout}
      >
        <Image src={logoutIcon} alt="Logout" width={20} height={20} />
        <span className="text-gray font-medium">Logout</span>
      </div>
    </aside>
  );
}
