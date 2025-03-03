'use client'
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { ChatHistory } from "./chat-history";
import { Loading } from "../loading";
import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage } from "@/interface";
import { ChatEmpy } from "./chat-empy";

export function ChatBody() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoanding, setIsLoanding] = useState<boolean>(false);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);

  const tempHistory : ChatMessage[]  = [
    {
      "type": "user",
      "message": "hola"
    },
    {
      "type": "bot",
      "message": "¡Hola! ¿En qué puedo ayudarte hoy?\n"
    },
    {
      "type": "user",
      "message": "dime un cuento"
    },
    {
      "type": "bot",
      "message": "Claro que sí. Aquí tienes un cuento:\n\n**El Árbol que Quería Volar**\n\nHabía una vez, en un bosque lleno de árboles altos y frondosos, un pequeño árbol llamado Arce. Arce era diferente a los demás. Mientras los otros árboles se contentaban con hundir sus raíces en la tierra y estirar sus ramas hacia el sol, Arce soñaba con volar.\n\n\"¡Quiero ver el mundo desde arriba!\" decía Arce, suspirando mientras las hojas de sus ramas se agitaban con el viento.\n\nLos otros árboles se reían. \"Los árboles no vuelan, Arce\", decían. \"Tenemos raíces, no alas.\"\n\nPero Arce no se rendía. Observaba a los pájaros volar con envidia, imitando sus movimientos con sus ramas, sintiendo una punzada de anhelo en su savia.\n\nUn día, un búho sabio, que había escuchado los deseos de Arce, se posó en una de sus ramas. \"Pequeño Arce,\" dijo el búho con voz ronca, \"¿por qué deseas tanto volar?\"\n\n\"Quiero ver el mundo desde arriba, ver más allá del bosque, conocer otros lugares\", respondió Arce con tristeza.\n\nEl búho reflexionó por un momento. \"Arce,\" dijo finalmente, \"tú no tienes alas, es cierto, pero tienes algo muy especial: semillas.\"\n\nArce miró sus pequeñas semillas, que colgaban de sus ramas como diminutas joyas.\n\n\"Tus semillas,\" continuó el búho, \"tienen el poder de volar. El viento las llevará lejos, a tierras que nunca has visto. Cada semilla es una parte de ti, un pequeño explorador que llevará tu esencia a nuevos lugares. Y cuando esas semillas echen raíces y crezcan, una parte de ti estará allí, creciendo en ese nuevo lugar.\"\n\nArce escuchó atentamente. Nunca había pensado en sus semillas de esa manera.\n\nEsa noche, cuando el viento sopló con fuerza, Arce cerró los ojos y se imaginó a sus semillas volando, como pequeñas hadas aladas, cruzando valles y montañas. Se imaginó a sus \"hijos\" creciendo en lugares lejanos, fuertes y hermosos.\n\nY así, Arce comprendió que, aunque él no podía volar en cuerpo, podía volar en espíritu. Sus semillas eran sus alas, y el viento, su aliado. Y aunque sus raíces lo mantenían anclado a la tierra, su corazón volaba libre con cada semilla que se dispersaba.\n\nDesde ese día, Arce ya no se sintió triste. Cada vez que el viento soplaba, sonreía, sabiendo que una parte de él viajaba por el mundo, cumpliendo su sueño de volar. Y el bosque, que antes se reía de él, ahora lo admiraba por su sabiduría y su forma única de alcanzar el cielo.\n\n**Fin**\n"
    }
  ]

  const secretKey = process.env.NEXT_PUBLIC_GEMINI_SECRET_KEY || '';
  const geminiModel = process.env.NEXT_PUBLIC_GEMINI_MODEL || '';
  const genAI = new GoogleGenerativeAI(secretKey);

  useEffect(() => {
    const model = genAI.getGenerativeModel({ model: geminiModel })
    const chat = model.startChat();
    setChatSession(chat);
  }, [])

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  }

  const sendMessage = async () => {
    if (userInput.trim() === "" || !chatSession) return;

    setIsLoanding(true)

    try {
      const result = await chatSession.sendMessage(userInput);
      const response = await result.response.text();

      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response },])
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setUserInput('')
      setIsLoanding(false)
    }
  };

  const clearChat = () => {
    setChatHistory([])
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro-exp-02-05" });
    setChatSession(model.startChat());
  }

  return (
    <div className=" container mx-auto px-4">
      <h1 className=" text-3xl font-bold text-center mb-2"> ChatBot</h1>
      <div className="chat-container rounded-lg shadow-md p-4">
        {!tempHistory ? <ChatEmpy /> :
          <ChatHistory chatHistory={tempHistory} />
        }
        <Loading isLoading={isLoanding} />
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-grow px-4 py-2 rounded-lg border border-gray-300 "
          placeholder="type your message"
          value={userInput}
          onChange={handleUserInput}
        />
        <button
          className="px-4 py-2 ml-2 rounded-lg bg-blue-500 text-white"
          onClick={sendMessage}
          disabled={isLoanding}
        >
          {isLoanding === false ? "Send" : " Sending ..."}
        </button>
      </div>
      <button
        className="mt-4 block px-4 py2 rounded-lg py-2 bg-gray-400 text-white"
        onClick={clearChat}
      >
        Clear Chat
      </button>
    </div>
  );
}
