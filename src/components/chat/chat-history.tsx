import { ChatHistoryProps } from '@/interface'
import { GoCopilot, GoPerson } from 'react-icons/go'
import ReactMarkdown from 'react-markdown'

export function ChatHistory({ chatHistory }: ChatHistoryProps) {
  return (
    <>
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={` py-2 px-4 rounded-lg my-4 
            ${message.type === "user"
              ? "bg-gray-100 text-gray-800 end w-80"
              : "bg-blue-100 text-blue-800 start w-80"
            }`}
        >
          {message.type === "user" ? (
            <span className='mr-2 text-gray-600'><GoPerson size={20} /></span>
          ) :
            <span className='mr-2 text-gray-600'><GoCopilot scale={20} /> </span>}
          <div >
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  )
}
