'use client'
import { useEffect, useState } from "react";
import { GameScore } from "./game-score";
import { GameSelect } from "./game-select";
import { typeGameEs } from "@/constants";
import { GameForm } from "./game-form";

export function GameBody() {
  //score
  const [score, setScore] = useState<number>(0);
  const [newScore, setNewScore] = useState<number>(0)

  //select
  const gameSelect = typeGameEs;
  const [type, setType] = useState<string>(gameSelect[0].type);
  const [level, setLevel] = useState<string>(gameSelect[0].level[0]);

  useEffect(() => {
    if (newScore > score) {
      setScore(newScore)
    }
  }, [newScore, score])

  const addNewScore =()=>{
    setNewScore(newScore+1)
  }

  const deleteNewScore =()=> {
    setNewScore(0)
  }

  return (
    <div className=" container mx-auto px-4">
      <h1 className=" text-3xl font-bold text-center mb-2"> GameBot</h1>
      <div className="md:flex md:justify-between block items-start ">
        <div className="flex justify-center md:w-2/3 w-full mt-3">
          <GameSelect type={type} setType={setType} level={level} setLevel={setLevel} gameSelect={gameSelect} />
        </div>
        <div className="flex justify-center md:w-1/3 w-full mt-3">
          <GameScore score={score} newScore={newScore} />
        </div>
      </div>
      <div>
        <GameForm addNewScore={addNewScore} deleteNewScore={deleteNewScore} type={type} level={level} />
      </div>
    </div>
  )
}
