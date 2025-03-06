'use client'
import { gameFormInterface, responseGameInterface } from "@/interface";
/* eslint-disable react-hooks/exhaustive-deps */
import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";
import { Loading } from "../ui";
import { empyResponseGameInterface } from "@/constants";

export function GameForm({ addNewScore, deleteNewScore, type, level }: gameFormInterface) {
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  // const [responseJSON, setResponseJSON] = useState<responseGameInterface>(empyResponseGameInterface);
  const [responseJSON, setResponseJSON] = useState<responseGameInterface>({
    "question": "¿Cuál es la capital de Australia?",
    "answers": ["Sídney", "Melbourne", "Canberra", "Perth"],
    "trueAnswers": 2
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const secretKey = process.env.NEXT_PUBLIC_GEMINI_SECRET_KEY || '';
  const geminiModel = process.env.NEXT_PUBLIC_GEMINI_MODEL || '';
  const genAI = new GoogleGenerativeAI(secretKey);

  useEffect(() => {
    const model = genAI.getGenerativeModel({ model: geminiModel })
    const chat = model.startChat();
    setChatSession(chat);
  }, [])

  const requestJSON = async () => {
    setIsLoading(true);
    const requestMessage = `Please provide a JSON object with the following structure, without including any additional formatting or markdown:
    {
      question: "Your question here",
      answers: ["Answer 0", "Answer 1", "Answer 2", "Answer 3"], // there are always 4
      trueAnswers: number of position of answer true // there can only be one correct
    }. 
    The question should be related to the game type "${type}" at level "${level}" and in the Spanish language. Please respond only with the JSON object.`;
    if (!chatSession) return;

    try {
      const result = await chatSession.sendMessage(requestMessage);
      const response = await result.response.text();
      console.log(response);

      const jsonResponse = JSON.parse(response);
      setResponseJSON(jsonResponse);
    } catch (error) {
      console.error("Error requesting JSON", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateQuestion = (a: number) => {
    if (a === responseJSON?.trueAnswers) {
      addNewScore();
      requestJSON();
    } else
      deleteNewScore();
    setResponseJSON(empyResponseGameInterface);
  }

  return (
    <div className="w-full">
      <div className="justify-center flex">
        <button
          onClick={requestJSON}
          disabled={isLoading}
          className="px-4 py-2 mt-4 md:mt-2 text-lg mb-4 rounded-lg bg-cyan-600 text-white cursor-pointer hover:bg-cyan-700 transition duration-300">
          {responseJSON.question === '' ?
            <>Empezar a Jugar</>
            : <>Reiniciar</>
          }
        </button>
      </div>

      <div className="items-center mt-5 border-cyan-600 border-4 rounded-lg relative p-4">
        <span className="text-2xl absolute font-bold bg-slate-800 -top-5 px-2 rounded-full left-1/2 transform -translate-x-1/2">Question: </span>
        <Loading isLoading={isLoading} />
        {!isLoading && responseJSON.question !== '' &&
          <div className="flex flex-col items-center">
            <span className="mx-auto my-2 text-xl">{responseJSON.question}</span>
            {responseJSON.answers.map((e, index) => (
              <button
                key={index}
                className="text-lg px-4 py-2 my-2 border-cyan-600 border-2 hover:border-cyan-600 hover:bg-slate-900 rounded-lg whitespace-nowrap"
                onClick={() => validateQuestion(index)}>
                {e}
              </button>
            ))}
          </div>
        }
      </div>

    </div>
  )
}
