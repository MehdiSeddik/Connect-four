import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import { Game } from "./Classes/Game";

const app = express();
app.use(express.json());
const games: Game[] = [];

//initialize a simple http server
const server = http.createServer(app);

// on /newGame
app.post("/game/new", (req, res) => {
  let id = Math.random();
  while (games.find((game) => game.id === id)) {
    id = Math.random();
  }

  const { player1Id } = req.body;
  if (!player1Id) {
    res.send("player 1 Id is required");
    return;
  }
  games.push(new Game(id, player1Id));
  console.log(games[0]);
  res.json({ gameId: id, msg: "game created" });
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
