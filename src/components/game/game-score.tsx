import { scoreInterface } from "@/interface";

export function GameScore({ score, newScore }: scoreInterface) {
  return (
    <div className="text-xl border-slate-700 border-4 rounded-lg relative">
      <span className="absolute font-bold bg-white -top-4 px-2 rounded-full left-1/2 transform -translate-x-1/2">
        Score
      </span>
      <div className="p-5">
        <h1>Score Old: {score}</h1>
        <h1>Score new: {newScore}</h1>
      </div>
    </div>
  )
}


