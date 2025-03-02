export interface Message {
    type: "user" | "bot"; // Solo puede ser "user" o "bot"
    message: string;
}

export interface ChatHistoryProps {
    chatHistory: Message[];
}

export type ChatMessage = { type: "user" | "bot"; message: string };