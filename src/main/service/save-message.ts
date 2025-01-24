import { db } from '../db/client'

interface Message {
  sender: 'Mobile' | 'Desktop'
  message: string
}

export function saveMessage(message: Message): number | string {
  const query = `INSERT INTO messages (sender, message, timestamp) VALUES (?, ?, ?)`
  const timestamp = new Date().toISOString()

  console.log('Iniciando inserção da mensagem no banco de dados')
  console.log('Dados da mensagem:', message)
  console.log('Timestamp gerado:', timestamp)

  try {
    const stmt = db.prepare(query)
    const info = stmt.run(message.sender, message.message, timestamp)

    console.log(`Mensagem salva com sucesso. ID: ${info.lastInsertRowid}`)
    return info.lastInsertRowid
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    console.error('Erro ao salvar mensagem:', errorMessage)
    return errorMessage
  }
}
