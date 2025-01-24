import { db } from '../db/client'

interface Message {
  id: number
  sender: 'Mobile' | 'Desktop'
  message: string
  timestamp: string
}

export function getAllMessages(): Message[] | string {
  const query = `SELECT id, sender, message, timestamp FROM messages ORDER BY timestamp ASC`

  console.log('Iniciando busca de todas as mensagens no banco de dados')

  try {
    const stmt = db.prepare(query)
    const messages = stmt.all()

    console.log(`Busca concluída com sucesso. Total de mensagens encontradas: ${messages.length}`)
    return messages
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    console.error('Erro ao buscar mensagens:', errorMessage)
    return errorMessage
  }
}
