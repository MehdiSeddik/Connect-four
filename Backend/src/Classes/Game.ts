export class Game {
  id: number;
  Player1Id: string;
  Player2Id: string | undefined;
  turn: string = "";

  gameBoard = [
    [
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
    ], // row 0
    [
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
    ], // row 1
    [
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
    ], // row 2
    [
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
    ], // row 3
    [
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
    ], // row 4
    [
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
    ], // row 5
  ];

  constructor(id: number, Player1Id: string) {
    this.id = id;
    this.Player1Id = Player1Id;
  }

  initGame = () => {
    // randomly set turn to player1 id or to player2 id
    if (this.Player2Id === undefined) {
      return;
    }
    this.turn =
      Math.floor(Math.random() * 2) + 1 === 1 ? this.Player1Id : this.Player2Id;
  };

  logGameStatus = () => {
    console.log(`Game ID: ${this.id}`);
    console.log(`Player 1 ID: ${this.Player1Id}`);
    console.log(`Player 2 ID: ${this.Player2Id}`);
    console.log(`Turn: ${this.turn}`);
  };
}
