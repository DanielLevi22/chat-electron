import { ArrowRight } from '../icons/arrow-right'
import './styles.css'

interface InputMessageComponentProps {
  onValueChangeMessage: (value: string) => void
  inputMessage: string
  OnSendMessage: () => void
}

export function InputMessage({
  onValueChangeMessage,
  inputMessage,
  OnSendMessage
}: InputMessageComponentProps): JSX.Element {
  function handleSendMessage(): void {
    OnSendMessage()
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="input-message-container">
      <textarea
        placeholder="Digite sua mensagem"
        className="input-message"
        value={inputMessage}
        onChange={(e) => onValueChangeMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="button" onClick={handleSendMessage}>
        Enviar
        <ArrowRight className="arrow" />
      </button>
    </div>
  )
}
