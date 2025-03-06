import { CardInterface } from "@/interface/card.interface";
import Link from "next/link";

export function Card({ name, link }: CardInterface) {
  return (
    <div className="border-4 flex flex-col rounded-xl border-cyan-600 h-32 justify-center items-center text-center p-4">
      <h1 className=" text-xl font-semibold mb-3">{name}</h1>
      <Link href={`/${link}`}>
        <div className="px-4 text-lg py-2 rounded-lg bg-cyan-600 cursor-pointer hover:bg-cyan-700 transition duration-300">
          Ir a {name}
        </div>
      </Link>
    </div>
  )
}
