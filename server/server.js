import { WebSocketServer, WebSocket } from 'ws'

const server = new WebSocketServer({ port: 4000 })

server.on('connection', (socket) => {
  console.log('New client connected')

  socket.on('message', (message) => {
    const msg = JSON.parse(message)
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msg))
        setTimeout(() => {
          const response = {
            text: 'Response to: ' + msg.text,
            timestamp: new Date().toISOString(),
            user: 'Server',
          }
          client.send(JSON.stringify(response))
        }, 1000)
      }
    })
  })

  socket.on('close', () => {
    console.log('Client disconnected')
  })
})

console.log('Server listening on port 4000')
