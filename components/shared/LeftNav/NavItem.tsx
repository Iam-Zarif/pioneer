import Link from "next/link";
import React from "react";

type NavItemProps = {
  label: string;
  Icon: React.FC<any>;
  active?: boolean;
  href: string;
};

export default function NavItem({ label, Icon, active = false, href }: NavItemProps) {
  return (
    <Link href={href} className="cursor-pointer">
      <div
        className={`flex cursor-pointer  items-center py-3.5 lg:px-12 
          ${active ? "bg-linear-to-r from-[#1d3474] to-dark" : ""}
        `}
      >
        <Icon
          width={24}
          height={24}
          fill={active ? "white" : "#8CA3CD"}
          className="mx-4"
        />
        <span
          className={`text-lg font-medium 
            ${active ? "text-white" : "text-gray"}
          `}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}
