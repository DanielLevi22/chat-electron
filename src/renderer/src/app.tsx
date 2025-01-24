import { useEffect, useRef, useState } from 'react'
import './app.css'
import { Chat } from './components/chat'

interface Message {
  id: number
  sender: 'Mobile' | 'Desktop'
  message: string
}

export function App(): JSX.Element {
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const wsRef = useRef<WebSocket | null>(null)

  function handleSendMessage(): void {
    if (inputMessage === '') {
      alert('Por favor, digite uma mensagem antes de enviar.')
      return
    }
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const data = {
        type: 'sendMessage',
        messageData: {
          message: inputMessage,
          sender: 'Desktop'
        }
      }

      wsRef.current.send(JSON.stringify(data))
      setInputMessage('')
    } else {
      console.error('WebSocket não está pronto para enviar mensagens.')
    }
  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000')
    wsRef.current = ws

    ws.onopen = (): void => {
      console.log('WebSocket está aberto e pronto para comunicação..')

      ws.send(JSON.stringify({ type: 'fetchMessages' }))
    }

    ws.onmessage = (event): void => {
      console.log('Mensagem recebida do servidor:', event.data)

      const data = JSON.parse(event.data)

      if (data.type === 'allMessages') {
        setMessages(data.messages)
      } else if (data.type === 'newMessage') {
        console.log('Nova mensagem recebida:', data.responseData)
        setMessages((prevMessages) => [...prevMessages, data.responseData])
        console.log('Mensagens atualizadas:', messages)
      } else if (data.type === 'error') {
        console.error('Erro recebido do servidor:', data.message)
      } else {
        console.warn('Tipo de mensagem desconhecido:', data.type)
      }
    }

    ws.onerror = (error): void => {
      console.error('Erro no WebSocket:', error)
    }

    ws.onclose = (): void => {
      console.log('Conexão WebSocket fechada')
    }

    return (): void => {
      ws.close()
    }
  }, [])

  return (
    <div className="app-container">
      <h1 className="chat-title">Chat Real Time</h1>
      <main>
        <Chat
          messages={messages}
          onValueChangeMessage={setInputMessage}
          inputMessage={inputMessage}
          OnSendMessage={handleSendMessage}
        />
      </main>
    </div>
  )
}
