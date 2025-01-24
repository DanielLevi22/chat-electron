import './style.css'

interface MessageProps {
  author: 'Desktop' | 'Mobile'
  message?: string
}

export function Message({ author, message }: MessageProps): JSX.Element {
  return (
    <div className={`${author === 'Desktop' ? 'message-author-self ' : 'message-author-peer '}`}>
      {message}
    </div>
  )
}
