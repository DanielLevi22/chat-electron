import { db } from './client'

try {
  console.log('Iniciando criação das tabelas...')

  // Cria a tabela messages, caso ela não exista
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender TEXT NOT NULL,
      message TEXT NOT NULL,
      timestamp TEXT NOT NULL
    )
  `
  ).run()

  console.log('Tabela messages criada ou já existe.')

  // Fechar conexão com o banco de dados
  db.close()
  console.log('Conexão com o banco encerrada.')
} catch (err: unknown) {
  // Refinar o tipo do erro para ter acesso às propriedades
  if (err instanceof Error) {
    console.error('Erro durante a criação da tabela ou encerramento da conexão:', err.message)
  } else {
    console.error('Erro inesperado:', err)
  }
}
