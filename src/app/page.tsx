/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import ChatHistory from "@/componet/chat-history";
import { Loading } from "@/componet/loading";
import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";

type ChatMessage = { type: "user" | "bot"; message: string };

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoanding, setIsLoanding] = useState<boolean>(false);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);

  const secretKey = process.env.NEXT_PUBLIC_GEMINI_SECRET_KEY || '';
  const genAI = new GoogleGenerativeAI(secretKey)


  useEffect(() => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro-exp-02-05" })
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
    <div className=" container mx-auto px-4 py-8">
      <h1 className=" text-3xl font-bold text-center mb-4"> ChatBot</h1>
      <div className="chat-container rounded-lg shadow-md p-4">
        <ChatHistory chatHistory={chatHistory} />
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
