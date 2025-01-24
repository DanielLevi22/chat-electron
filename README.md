# 1. Instruções para Baixar e  o Projeto (Electron + Vite)

Este guia explica como baixar e instalar o código-fonte completo do projeto desenvolvido com **Electron** e **Vite** para criar a versão Desktop do aplicativo.

## 1.1. Pré-requisitos

Antes de iniciar a instalação, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (versão 16 ou superior): Para gerenciar dependências e executar o projeto.
- **Git**: Para clonar o repositório do projeto.
- **Yarn** (opcional): Gerenciador de pacotes alternativo ao npm.

Caso não tenha o **Node.js** ou o **Git** instalados, você pode instalá-los através dos links abaixo:

- [Baixar Node.js](https://nodejs.org/)
- [Baixar Git](https://git-scm.com/)

## 1.2. Clonar o Repositório do Projeto

Para baixar o código-fonte do projeto, siga os seguintes passos:

1. Abra um terminal na pasta onde você deseja baixar o projeto.
2. Execute o comando abaixo para clonar o repositório:

   ```bash
   git  https://github.com/DanielLevi22/chat-electron
   ```

3. Navegue para o diretório do projeto:

   ```bash
   cd chat-electron
   ```

## 1.3. Instalar as Dependências

Após clonar o projeto, é necessário instalar as dependências necessárias. Se você estiver usando **npm**, execute o seguinte comando no terminal:

```bash
npm install
```

Ou, se preferir usar o **Yarn**, execute:

```bash
yarn install
```

Isso instalará todas as dependências listadas no arquivo `package.json` do projeto.

## 1.4. Executar o Projeto Localmente

Agora que todas as dependências estão instaladas, você pode iniciar o projeto localmente com o comando:

### Para **desenvolvimento**:
```bash
npm run dev
```

Ou, se estiver usando **Yarn**:

```bash
yarn dev
```

Isso iniciará o servidor de desenvolvimento e abrirá o aplicativo.



## 1.5. Executar o Aplicativo como App Desktop (Electron)

Para rodar o aplicativo como um **App Desktop** usando **Electron**:

1. Instale as dependências necessárias para o Electron:

   ```bash
   npm install electron --save-dev
   ```

2. Execute o aplicativo com o comando:

   ```bash
   npm run electron
   ```

   Ou com **Yarn**:

   ```bash
   yarn electron
   ```


 ## 5. Baixar o Build do Projeto
Caso prefira testar o aplicativo diretamente sem compilar o código, você pode baixar os builds prontos para **Android (APK)** ou **Desktop (EXE)**:
- **Android (APK)**: O arquivo APK estará disponível no link do drive abaixo.
- **Desktop (EXE)**: O arquivo EXE estará disponível para Windows disponível no link do drive abaixo ou no repositorio oficial em releases. 
- **Desktop (AppImage)**: O arquivo AppImage estará disponível para Linux disponível no link do drive abaixo ou no repositorio oficial em releases.   

**Link para os builds:**
[Google Drive Builds](https://drive.google.com/drive/folders/1TenJtWgueqIFJopleKt_CK4dEgP3dB9w?usp=sharing)



# Instruções de Uso

No fluxo apara conectar o aplicativo Mobile ao servidor WebSocket, você precisaria do IP da máquina central (que executa o servidor WebSocket). Agora, foi adicionado um campo de entrada no aplicativo Mobile que permite ao usuário inserir o IP da máquina central manualmente.

## Passos para Conectar:
### 1. Abrir o Aplicativo Desktop 

### 1.1. Abrir o Aplicativo Mobile

- Inicie o aplicativo Mobile (React Native) no dispositivo ou emulador.

### 1.2. Inserir o IP da Máquina Central

- Na tela inicial do aplicativo, há um campo de entrada onde você deve inserir o **IP da máquina central** (onde o servidor WebSocket está rodando).
- Se estiver usando a rede local, é necessário inserir o **IP local** da máquina que está rodando o servidor.
- O formato do IP deve ser algo como `192.168.0.X`, dependendo da sua rede local.

### 1.3. Descobrir o IP da Máquina Central

Dependendo do sistema operacional onde o servidor WebSocket (aplicativo Desktop) está sendo executado, siga as instruções abaixo para encontrar o **IP local** da máquina:

#### Windows

1. Abra o **Prompt de Comando** (pressione `Windows + R`, digite `cmd` e pressione Enter).
2. No prompt de comando, digite o comando abaixo:

   ```bash
   ipconfig
   ```

#### Linux
> 
1. Abra o **Terminal**.
2. Digite o seguinte comando:

   ```bash
   ifconfig
    ```
 
3. Encontre a interface de rede ativa (geralmente `eth0` ou `wlan0` para conexões com fio ou sem fio) e procure o valor de **inet**. Este será o IP da sua máquina local, por exemplo, `192.168.x.x`.
 
    Caso o comando `ifconfig` não funcione, você pode tentar o comando `ip a`:

    ```bash
    ip a
   ```
 
    Na saída, procure o endereço IP na interface de rede ativa.
 
 #### macOS
 
 1. Abra o **Terminal**.
 2. Digite o comando abaixo:

   ```bash
   ifconfig
   ```
 
3. Encontre a interface ativa (geralmente `en0` para Ethernet ou `en1` para Wi-Fi) e procure pelo campo **inet**. Esse será o seu IP local, por exemplo, `192.168.x.x`.
 
 ### 1.4. Conectar ao Servidor
 
- Após descobrir o **IP da máquina central**, insira-o no campo de entrada no aplicativo Mobile.
- Após inserir o IP, clique no botão **"Conectar"**.
- O aplicativo tentará se conectar ao servidor WebSocket usando o IP informado.
- Se a conexão for bem-sucedida, você verá a interface de chat e poderá começar a enviar e receber mensagens em tempo real.


 
 ## Nota Importante

 Caso o aplicativo Mobile não consiga se conectar, siga os passos abaixo:

1. **Verifique o IP**: Certifique-se de que o IP inserido está correto. Se estiver usando um IP diferente (por exemplo, de uma rede externa), a conexão não será possível.
2. **Verifique a Rede Local**: O aplicativo Mobile deve estar na mesma rede local que o servidor. Ambos os dispositivos (desktop e mobile) devem estar conectados à mesma rede Wi-Fi ou via cabo de rede.
3. **Firewall ou Configuração de Rede**: Caso o IP esteja correto, verifique se há algum bloqueio de firewall ou configuração de rede impedindo a comunicação entre os dispositivos. Certifique-se de que o servidor WebSocket no Desktop está permitindo conexões na porta utilizada.
