import { useEffect, useRef } from 'react'
import { InputMessage } from '../input-message'
import { Message } from '../message'
import './style.css'

interface ChatProps {
  onValueChangeMessage: (value: string) => void
  inputMessage: string
  OnSendMessage: () => void
  messages: {
    id: number
    sender: 'Mobile' | 'Desktop'
    message: string
  }[]
}
export function Chat({
  inputMessage,
  onValueChangeMessage,
  OnSendMessage,
  messages
}: ChatProps): JSX.Element {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = (): void => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="chat-container">
      <div className="container-messages" ref={messagesContainerRef}>
        {messages.map((message) => (
          <Message key={message.id} author={message.sender} message={message.message} />
        ))}
      </div>

      <div className="container-input-message">
        <InputMessage
          onValueChangeMessage={onValueChangeMessage}
          inputMessage={inputMessage}
          OnSendMessage={OnSendMessage}
        />
      </div>
    </div>
  )
}
