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
      <Loading isLoading={isLoading} />
      <div className="justify-center flex">
        <button onClick={requestJSON} className="px-4 py-2 mt-4 md:mt-2 mb-4 rounded-lg bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition duration-300">
          {responseJSON.question === '' ?
            <>Empezar a Jugar</>
            : <>Reiniciar</>
          }

        </button>
      </div>
      {!isLoading && responseJSON.question !== '' &&
        <div className="block items-center">
          <div className="md:flex block items-center">
            <span className="text-2xl ">Question: </span>
            <span className="ml-4 text-lg">{responseJSON.question}</span>
          </div>
            {responseJSON.answers.map((e, index) => (
              <button 
              key={index} 
              className="block text-lg px-4 py-2 my-2 border-slate-700 border-2 hover:border-slate-900 hover:bg-slate-200 rounded-lg"
              onClick={() => validateQuestion(index)}>
                {e}
              </button>
            ))}
        </div>
      }
    </div>
  )
}
