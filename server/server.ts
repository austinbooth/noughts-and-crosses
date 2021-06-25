import express from 'express';
const http = require('http');
const { Server, Socket } = require("socket.io");


// const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: "https://example.com",
//     methods: ["GET", "POST"]
//   }
// });


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }});
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
