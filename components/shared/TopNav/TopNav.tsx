import logo from "@/public/logo.svg";
import Image from "next/image";
import notification from "@/public/notification.svg";
import calender from "@/public/calender.svg";

export default function TopNav() {
  return (
    <div className="w-full z-9999 col-span-9">
      <div className="bg-white py-7 px-16 flex items-center w-full justify-between">
        <div className="flex gap-1">
          <Image
            src={logo}
            alt="Logo"
            width={120}
            height={60}
            className="w-9"
          />
          <div>
            <p className="font-bold">DREAMY</p>
            <p className="-mt-2">SOFTWARE</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {" "}
          <Image className="w-8" src={notification} alt="Notification" width={20} height={20} />
          <Image className="w-8" src={calender} alt="Calender" width={20} height={20} />
          <div className="text-dark">
            <p>Friday</p>
            <p className="-mt-1">07/11/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
