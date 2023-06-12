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
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
const game = new GameInstance(wss);
// every 10 sec, log the game
setInterval(() => {
  const { gameId, player1, player2, status, turn, countDown, winner } =
    game.exportGame();
  console.log({ gameId, player1, player2, status, turn, countDown, winner });
}, 1000);

wss.on("connection", (ws: WebSocket, req) => {
  const id = req.headers["sec-websocket-key"];
  console.log("new user connected: ", id);
  ws.on("message", (message: string) => {
    console.log("received: %s", message);
    ws.send(`Hello, you sent -> ${message}`);
  });
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
    // send via websocket to player 1
    // return success code
    res.status(201).json(game.exportGame());
  });

  app.post("/game/drop", (req, res) => {
    const { column, color } = req.body;
    game.dropPiece(column, color);
    res.json(game.exportGame());
  });

  app.post("/game/join", (req, res) => {
    const { gameId, player2Id } = req.body;
    const isIdValid = game.checkId(gameId);
    if (!isIdValid) {
      res.send(false);
      return;
    }
    game.initPlayer2(player2Id);
    game.start();
    // boradcast to player 1 and 2 that game is ready
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ game: game.exportGame() }));
      }
    });
    res.json(game.exportGame());
  });
  // send json
  ws.send(JSON.stringify({ userId: id }));
});

//start our server
server.listen(8899, () => {
  console.log(`Server running on port 8899`);
});
