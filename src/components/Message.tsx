export type MessageType = {
  text: string
  timestamp: string
  user: string
}

const Message = ({ text, timestamp, user }: MessageType) => {
  const alignClass =
    user === 'Me' ? 'self-end bg-blue-500 text-white' : 'self-start bg-gray-200'
  return (
    <div className={`p-2 my-2 rounded-md ${alignClass}`}>
      <div>{text}</div>
      <div className='text-xs text-gray-200'>
        {new Date(timestamp).toLocaleTimeString()}
      </div>
    </div>
  )
}

export default Message
