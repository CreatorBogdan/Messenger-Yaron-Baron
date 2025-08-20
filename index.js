const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Поддержка UTF-8
app.use(express.static('public', { 
  setHeaders: (res, path) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
  }
}));

io.on('connection', (socket) => {
  console.log('Пользователь подключился');

  // Пересылка сообщений чата
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Пересылка движения игрока
  socket.on('player move', (data) => {
    socket.broadcast.emit('player move', data);
  });

  // Атака
  socket.on('player attack', (data) => {
    socket.broadcast.emit('player attack', data);
  });

  // Урон
  socket.on('player damage', (data) => {
    socket.broadcast.emit('player damage', data);
  });

  // При отключении
  socket.on('disconnect', () => {
    console.log('Пользователь отключился');
  });
});

server.listen(3000, () => {
  console.log('✅ Сервер запущен на http://localhost:3000');
});