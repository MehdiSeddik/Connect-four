import ws = require("ws");
import { Game, Player, Board } from "../types";
import * as WebSocket from "ws";

const defaultBoard: Board = [
  [
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
  ], // row 0
  [
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
  ], // row 1
  [
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
  ], // row 2
  [
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
  ], // row 3
  [
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
  ], // row 4
  [
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
    { color: "none" },
  ], // row 5
];

export class GameInstance {
  id: string;
  player1?: Player;
  player2?: Player;
  turn: string = "";
  status?: "waiting" | "playing" | "finished";
  countDown: number = 30;
  wss: ws.Server;
  winner?: Player;

  // if game status is playing, start count down

  startCountdown = () => {
    const interval = setInterval(() => {
      this.countDown--;
      this.wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ game: this.exportGame() }));
        }
      });
      if (this.countDown === 0) {
        clearInterval(interval);
        this.turn =
          this.turn === this.player1!.id ? this.player2!.id : this.player1!.id;
        this.countDown = 30;
        this.startCountdown();
      }
      if (this.status === "finished") {
        clearInterval(interval);
      }
    }, 1200);
  };

  gameBoard = defaultBoard;

  constructor(wss: ws.Server) {
    this.id = "123456";
    this.wss = wss;
  }

  start = () => {
    this.startCountdown();
  };
  stop = () => {
    this.status = "finished";
  };

  checkId = (id: string) => id === this.id;

  initPlayer1 = (id: string) => {
    this.player1 = {
      id: id,
      color: "red",
    };
    this.status = "waiting";
  };

  initPlayer2 = (id: string) => {
    this.player2 = {
      id: id,
      color: "yellow",
    };
    this.status = "playing";
    this.turn = this.player1!.id;
  };

  logGameStatus = () => {
    console.log(`Game ID: ${this.id}`);
    console.log(`Player 1 ID: ${this.player1}`);
    console.log(`Player 2 ID: ${this.player2}`);
    console.log(`Turn: ${this.turn}`);
  };
  /**
   *
   * @returns Game formatted for frontend
   */
  exportGame = (): Game => {
    return {
      gameId: this.id,
      player1: this.player1,
      player2: this.player2,
      turn: this.turn,
      board: this.gameBoard,
      status: this.status,
      countDown: this.countDown,
      winner: this.winner,
    };
  };

  getTurn = () => {
    return this.turn;
  };

  getBoard = () => {
    return this.gameBoard;
  };
  // if there is a winner, return the color of the winner ( connect four )
  checkWinner(): "red" | "yellow" | "none" {
    const rows = this.gameBoard.length;
    const columns = this.gameBoard[0].length;

    // Check horizontally
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns - 3; col++) {
        const color = this.gameBoard[row][col].color;
        if (
          color !== "none" &&
          color === this.gameBoard[row][col + 1].color &&
          color === this.gameBoard[row][col + 2].color &&
          color === this.gameBoard[row][col + 3].color
        ) {
          return color;
        }
      }
    }

    // Check vertically
    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows - 3; row++) {
        const color = this.gameBoard[row][col].color;
        if (
          color !== "none" &&
          color === this.gameBoard[row + 1][col].color &&
          color === this.gameBoard[row + 2][col].color &&
          color === this.gameBoard[row + 3][col].color
        ) {
          return color;
        }
      }
    }

    // Check diagonally (top-left to bottom-right)
    for (let row = 0; row < rows - 3; row++) {
      for (let col = 0; col < columns - 3; col++) {
        const color = this.gameBoard[row][col].color;
        if (
          color !== "none" &&
          color === this.gameBoard[row + 1][col + 1].color &&
          color === this.gameBoard[row + 2][col + 2].color &&
          color === this.gameBoard[row + 3][col + 3].color
        ) {
          return color;
        }
      }
    }

    // Check diagonally (top-right to bottom-left)
    for (let row = 0; row < rows - 3; row++) {
      for (let col = columns - 1; col >= 3; col--) {
        const color = this.gameBoard[row][col].color;
        if (
          color !== "none" &&
          color === this.gameBoard[row + 1][col - 1].color &&
          color === this.gameBoard[row + 2][col - 2].color &&
          color === this.gameBoard[row + 3][col - 3].color
        ) {
          return color;
        }
      }
    }

    return "none"; // No winner
  }

  resetGame = () => {

  }

  dropPiece = (column: number, color: "yellow" | "red" | "none") => {
    if (this.winner) {
      return;
    }
    let row = 5;
    while (this.gameBoard[row][column].color !== "none") {
      row--;
    }
    // check if there is a winner

    this.gameBoard[row][column].color = color;

    const winner = this.checkWinner();
    if (winner !== "none") {
      console.log("winner found");
      this.winner = winner === "red" ? this.player1 : this.player2;
      console.log(winner);
      this.status = "finished";
      this.wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ game: this.exportGame() }));
        }
      });
      return;
    }
    this.turn =
      this.turn === this.player1!.id ? this.player2!.id : this.player1!.id;
    this.countDown = 30;
  };
}
