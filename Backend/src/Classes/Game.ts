import { Game, Player } from "../types";

export class GameInstance {
  id: string;
  player1?: Player;
  player2?: Player;
  turn: string = "";
  status?: "waiting" | "playing" | "finished";
  countDown: number = 30;

  // if game status is playing, start count down

  setCountDown = () => {
    const interval = setInterval(() => {
      this.countDown--;
      if (this.countDown === 0) {
        clearInterval(interval);
        this.turn =
          this.turn === this.player1!.id ? this.player2!.id : this.player1!.id;
        this.countDown = 60;
      }
    }, 1000);
  };

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
    this.id = "123456";
  }

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
      status: this.status,
      countDown: this.countDown,
    };
  };

  getTurn = () => {
    return this.turn;
  };

  getBoard = () => {
    return this.gameBoard;
  };
}
