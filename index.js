// server/index.js
const express = require("express");
const axios = require("axios")
const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const cors = require("cors");

const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',
  methods: '*',
  allowedHeaders: '*'
};

app.use(cors(corsOptions));

// Define a route handler for the root path
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

io.on('connection', (socket) => {
    console.log('New client connected');
  
  
    socket.on('message', (data) => {
      
      console.log('Received message:', data);

      io.emit('message', data); // Broadcasting the message
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

// Start the server
http.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
