const { app } = require('electron')
const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')

// Obter a pasta persistente para salvar dados do app
const userDataPath = app.getPath('userData') // Caminho persistente (diferente para cada usuário)
const dbPath = path.join(userDataPath, 'db/chat.db')

// Verificar se o banco de dados já existe
if (!fs.existsSync(dbPath)) {
  console.log('Arquivo do banco de dados não encontrado. Criando novo banco de dados...')
  fs.mkdirSync(path.dirname(dbPath), { recursive: true }) // Cria o diretório, caso não exista
} else {
  console.log('Banco de dados encontrado em:', dbPath)
}

// Conectar ao banco de dados SQLite
export const db = new Database(dbPath, { verbose: console.log }) // O `verbose` loga todas as queries executadas
console.log('Conectado ao banco de dados SQLite.')
console.log('Caminho do banco de dados:', dbPath)

// Configurações iniciais do banco (opcional)
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp TEXT NOT NULL
  );
`)
