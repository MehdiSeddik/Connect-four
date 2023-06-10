import { Game, Player } from "../types";

export class GameInstance {
  id: string;
  player1?: Player;
  player2?: Player;
  turn: string = "";

  gameBoard = [
    [
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
    ], // row 0
    [
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
    ], // row 1
    [
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
    ], // row 2
    [
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
    ], // row 3
    [
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
    ], // row 4
    [
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
      { color: null },
    ], // row 5
  ];

  constructor() {
    this.id = "0";
  }

  initPlayer1 = (id: string) => {
    this.player1 = {
      id: id,
      color: "red",
    };
  };

  initPlayer2 = (id: string) => {
    this.player2 = {
      id: id,
      color: "yellow",
    };
  };

  initGame = () => {
    // randomly set turn to player1 id or to player2 id
    if (!this.player1 || !this.player2) {
      return;
    }
    this.turn =
      Math.floor(Math.random() * 2) + 1 === 1
        ? this.player1.id
        : this.player2.id;
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
    };
  };

  getTurn = () => {
    return this.turn;
  };

  getBoard = () => {
    return this.gameBoard;
  };
}
