import { KeyboardEvent } from 'react'

interface InputProps {
  message: string
  setMessage: (message: string) => void
  sendMessage: () => void
}

const Input = ({ message, setMessage, sendMessage }: InputProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className='p-4 border-t border-gray-200 flex'>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className='flex-1 p-2 border rounded-md'
      />
      <button
        onClick={sendMessage}
        className='ml-2 p-2 bg-blue-500 text-white rounded-md'
      >
        Send
      </button>
    </div>
  )
}

export default Input
