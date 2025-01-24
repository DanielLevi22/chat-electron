import WebSocket from 'ws'
import { saveMessage } from '../service/save-message'
import { getAllMessages } from '../service/get-all-messages'

const wss = new WebSocket.Server({ host: '0.0.0.0', port: 3000 })
let clients: WebSocket[] = []

wss.on('connection', async function connection(ws, req) {
  console.log('Cliente conectado ao servidor WebSocket')
  console.log(`Client connected from: ${req.socket.remoteAddress}`)

  clients.push(ws)

  ws.on('message', async function incoming(message) {
    console.log('Mensagem recebida do cliente:', message)

    let data
    try {
      data = JSON.parse(message.toString())
    } catch (error) {
      console.error('Erro ao processar mensagem:', error)
      return ws.send(JSON.stringify({ type: 'error', message: 'Erro ao processar a mensagem' }))
    }

    switch (data.type) {
      case 'fetchMessages': {
        try {
          const allMessages = await getAllMessages()

          ws.send(JSON.stringify({ type: 'allMessages', messages: allMessages }))
        } catch (error) {
          console.error('Erro ao buscar mensagens:', error)
          ws.send(
            JSON.stringify({ type: 'error', message: 'Erro ao buscar mensagens do histórico' })
          )
        }
        break
      }

      case 'sendMessage': {
        try {
          const messageId = await saveMessage(data.messageData)

          console.log('Mensagem salva com sucesso. ID:', messageId)

          const responseData = {
            id: messageId,
            sender: data.messageData.sender,
            message: data.messageData.message
          }

          const parsedData = JSON.stringify({ type: 'newMessage', responseData })
          clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(parsedData)
            }
          })
        } catch (error) {
          console.error('Erro ao salvar mensagem:', error)
          ws.send(JSON.stringify({ type: 'error', message: 'Erro ao salvar mensagem' }))
        }
        break
      }

      default:
        console.warn('Tipo de mensagem desconhecido:', data.type)
        ws.send(JSON.stringify({ type: 'error', message: 'Tipo de mensagem desconhecido' }))
        break
    }
  })

  ws.on('close', () => {
    clients = clients.filter((client) => client !== ws)
  })
})
