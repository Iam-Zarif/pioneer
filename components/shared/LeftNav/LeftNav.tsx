"use client";
import Image from "next/image";
import logout from "@/public/logout.svg";
import useIcons from "@/hooks/icons/useIcons";
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthAndProfileContext";

export default function LeftNav() {
  const { TodoIcon, AccountIcon } = useIcons();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  console.log("User in LeftNav:", user);

  return (
    <div className="bg-dark z-99999 min-h-screen w-full col-span-3 flex flex-col justify-between">
      <div>
        <div className="flex flex-col pt-12 items-center">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : user ? (
            <>
              {user.profile_image ? (
                <Image
                  src={user.profile_image}
                  alt="Profile"
                  width={120}
                  height={60}
                  className="my-4 w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <p className="text-white my-4 w-20 h-20 bg-gray rounded-full text-center flex items-center justify-center">
                  No Image
                </p>
              )}
              <p className="text-white font-semibold text-lg">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-light font-light text-xs">{user.email}</p>
            </>
          ) : (
            <p className="text-white my-4">No user</p>
          )}
        </div>

        <section className="flex justify-center mt-8 mx-auto flex-col">
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
        </section>
      </div>

      <div className="flex items-center gap-3 absolute bottom-14 left-18 cursor-pointer">
        <Image src={logout} alt="Logout" width={20} height={20} />
        <p className="text-gray font-medium">Logout</p>
      </div>
    </div>
  );
}
