export interface MessageInterface {
  type: "user" | "bot"; // Solo puede ser "user" o "bot"
  message: string;
}

export interface ChatHistoryProps {
  chatHistory: MessageInterface[];
}

export type ChatMessage = { type: "user" | "bot"; message: string };