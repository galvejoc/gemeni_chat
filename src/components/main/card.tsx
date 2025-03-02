import { CardInterface } from "@/interface/card.interface";
import Link from "next/link";

export function Card({ name, link }: CardInterface) {
  return (
    <div className="border-2 flex flex-col rounded-xl border-cyan-600 h-32 justify-center items-center text-center bg-slate-700 p-4">
      <h1 className="text-white text-xl font-semibold mb-2">{name}</h1>
      <Link href={`/${link}`}>
        <div className="px-4 py-2 rounded-lg bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition duration-300">
          Ir a {name}
        </div>
      </Link>
    </div>
  )
}
