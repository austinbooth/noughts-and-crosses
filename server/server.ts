import express from 'express';
const http = require('http');
const { Server, Socket } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 9090;

app.get('/', (req, res) => res.send('Noughts and crosses game server'));

let interval: NodeJS.Timeout
io.on('connection', (socket: typeof Socket) => {
  console.log('New client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => emit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const emit = (socket: typeof Socket) => {
  const response = Date.now();
  socket.emit("FromServer", response);
};

server.listen(process.env.PORT || PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
