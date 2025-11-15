"use client";
import Image from "next/image";
import profile from "@/public/profile.svg";
import logout from "@/public/logout.svg";
import useIcons from "@/hooks/icons/useIcons";
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";

export default function LeftNav() {
  const { TodoIcon, AccountIcon } = useIcons();
  const pathname = usePathname();

  

  return (
    <div className="bg-dark z-99999 min-h-screen w-full col-span-3 flex flex-col justify-between">
      
      <div>
        <div className="flex flex-col pt-12 items-center">
          <Image
            src={profile}
            alt="Logo"
            width={120}
            height={60}
            className="my-4 w-20"
          />
          <p className="text-white font-semibold text-lg">amanuel</p>
          <p className="text-light font-light text-xs">amanuel@gmail.com</p>
        </div>

        <section className="flex justify-center mt-8 mx-auto flex-col">
          <NavItem
            label="Todos"
            Icon={TodoIcon}
            href="/todos"
            active={pathname === "/todos"}
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
        <p className="text-gray font-medium ">Logout</p>
      </div>
    </div>
  );
}
