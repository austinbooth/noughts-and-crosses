import express from 'express';
const http = require('http');
const { Server, Socket } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 9090;

app.get('/', (req, res) => res.send('Noughts and crosses game server'));

io.on('connection', (socket: typeof Socket) => {
  console.log('a user connected');
});

server.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
