import { ChatHistoryProps } from '@/interface'
import { GoPerson } from 'react-icons/go'
import ReactMarkdown from 'react-markdown'

export function ChatHistory({ chatHistory }: ChatHistoryProps) {
  return (
    <div className='flex flex-col'>
      {chatHistory.map((message, index) => (
          <div
            key={index}
            className={` py-2 px-4 rounded-lg my-2 max-w-full border-2 border-cyan-600 md:max-w-[85%] inline-block
            ${message.type === "user"
                ? " ml-auto mr-0"
                : "bg-blue-100 text-blue-800 ml-0 mr-auto"
              }`}
          >
            <div className='flex'>
              {message.type === "user" && (
                <span className='mr-4 text-cyan-600 bg-gray-200 p-2 rounded-full'><GoPerson size={20} /></span>
              )}
              <div className='mt-1'>
                <ReactMarkdown>{message.message}</ReactMarkdown>
              </div>
            </div>
          </div>
      ))}
    </div>
  )
}
