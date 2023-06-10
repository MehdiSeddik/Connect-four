import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import { GameInstance } from "./Classes/Game";
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

//initialize a simple http server
const server = http.createServer(app);
// use c
const game = new GameInstance();
// every 10 sec, log the game
setInterval(() => {
  console.log(game.exportGame());
}, 10000);

// on /newGame
app.post("/game/new", (req, res) => {
  let id = Math.random().toString(36).substr(2, 5);
  // generate random 5 letter code

  const { player1Id } = req.body;
  if (!player1Id) {
    res.send("player 1 Id is required");
    return;
  }
  game.initPlayer1(player1Id);
  res.json(game.exportGame());
});

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: WebSocket, req) => {
  const id = req.headers["sec-websocket-key"];
  console.log("new user connected: ", id);
  ws.on("message", (message: string) => {
    console.log("received: %s", message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  // send json
  ws.send(JSON.stringify({ userId: id }));
});

//start our server
server.listen(8899, () => {
  console.log(`Server running on port 8899`);
});
