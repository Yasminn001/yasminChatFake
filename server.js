const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Armazena usuários online
let users = {};

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  // Registra novo usuário
  socket.on('new user', (username) => {
    users[socket.id] = username;
    updateOnlineCount();
  });

  // Recebe e retransmite mensagens
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  // Atualiza contagem ao desconectar
  socket.on('disconnect', () => {
    delete users[socket.id];
    updateOnlineCount();
  });

  // Função para atualizar contagem de online
  function updateOnlineCount() {
    io.emit('users online', Object.keys(users).length);
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});