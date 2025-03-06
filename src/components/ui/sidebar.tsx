'use client'
import { cardLinks } from "@/constants/card-link";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GoMoveToEnd, GoMoveToStart } from "react-icons/go";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathName = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bg-slate-900 text-white ${isOpen ? 'w-36' : 'w-16'} transition-width duration-300 min-h-screen`}>
      <button onClick={toggleSidebar} className="p-4 w-full text-white hover:bg-cyan-600 transition duration-200 mt-4  justify-center">
        {isOpen ? <GoMoveToStart size={24}/> : <GoMoveToEnd size={24}/>}
      </button>
      <div className="flex flex-col mt-4">
        {cardLinks.map((card) => (
          <Link
            key={card.link}
            href={`/${card.link}`}
            className={`p-4 text-lg text-left hover:bg-cyan-600 transition duration-200 ${pathName==='/'+card.link && 'bg-cyan-600'}`}
          >
            {isOpen ? card.name : card.icon}
          </Link>
        ))}
      </div>
    </div>
  )
}
