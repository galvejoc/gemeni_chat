'use client'
import { cardLinks } from "@/constants/card-link";
import Link from "next/link";
import { useState } from "react";
import { GoHome, GoMoveToEnd, GoMoveToStart } from "react-icons/go";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bg-slate-800 text-white ${isOpen ? 'w-36' : 'w-16'} transition-width duration-300 h-screen`}>
      <button onClick={toggleSidebar} className="p-4 w-full text-white bg-cyan-600 mt-4  justify-center">
        {isOpen ? <GoMoveToStart size={24} className="ml-2"/> : <GoMoveToEnd size={24} className="ml-2"/>}
      </button>
      <div className="flex flex-col mt-4">
        <Link href="/" className={`p-4 ${isOpen ? 'text-left' : 'text-center'} hover:bg-cyan-600 transition duration-200`}>
          {isOpen ? 'Home' : <GoHome size={24}/>}
        </Link>
        {cardLinks.map((card) => (
          <Link
            key={card.link}
            href={`/${card.link}`}
            className={`p-4 text-left hover:bg-cyan-600 transition duration-200`}
          >
            {isOpen ? card.name : card.icon}
          </Link>
        ))}
      </div>
    </div>
  )
}
