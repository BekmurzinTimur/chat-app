import { useEffect, useRef, useState } from 'react'
import Message, { MessageType } from './Message.tsx'
import MessageInput from './Input.tsx'

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [message, setMessage] = useState('')
  const socket = useRef<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:4000')

    socket.current.onmessage = (event) => {
      const msg: MessageType = JSON.parse(event.data)
      setMessages((prevMessages) => [...prevMessages, msg])

      if (msg.user !== 'Me') {
        sendNotification(msg.text)
      }
    }

    return () => {
      socket.current?.close()
    }
  }, [])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const sendMessage = () => {
    if (message) {
      const msg = {
        text: message,
        timestamp: new Date().toISOString(),
        user: 'Me',
      }
      socket.current?.send(JSON.stringify(msg))
      setMessage('')
    }
  }

  const sendNotification = (message: string) => {
    if (Notification.permission === 'granted') {
      new Notification('New Message', {
        body: message,
      })
    }
  }

  return (
    <div className='flex flex-col flex-1 h-full w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
      <div className='flex flex-col flex-1 p-4 overflow-y-auto'>
        {messages.map((msg, index) => (
          <Message key={index} {...msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  )
}

export default Chat
