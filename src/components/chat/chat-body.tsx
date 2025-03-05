'use client'
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { ChatHistory } from "./chat-history";
import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
import { ChatEmpy } from "./chat-empy";
import { GoIssueReopened } from "react-icons/go";
import { Loading } from "../ui";
import { ChatMessage } from "@/interface";

export function ChatBody() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoanding, setIsLoanding] = useState<boolean>(false);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);

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

  console.log(chatHistory);

  return (
    <div className=" container mx-auto px-4">
      <h1 className=" text-3xl font-bold text-center mb-2"> ChatBot</h1>
      <div className="chat-container rounded-lg shadow-md p-4">
        {chatHistory.length === 0 && !isLoanding ?
          <ChatEmpy /> :
          <ChatHistory chatHistory={chatHistory} />
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
          className="px-4 py-2 ml-2 rounded-lg bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition duration-300"
          onClick={sendMessage}
          disabled={isLoanding}
        >
          {isLoanding === false ? "Send" :
            <span className="flex items-center gap-2 ">Sending <GoIssueReopened className="animate-spin rotate-180" /> </span>}
        </button>
      </div>
      <button
        className="mt-4 block px-4 py2 rounded-lg py-2 bg-gray-400 text-white cursor-pointer hover:bg-gray-500 transition duration-300"
        onClick={clearChat}
      >
        Clear Chat
      </button>
    </div>
  );
}
