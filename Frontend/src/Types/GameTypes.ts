import { Player } from "./PlayerTypes";

export interface Game {
  gameId?: string;
  status?: undefined | "waiting" | "playing" | "finished";
  player1?: Player;
  player2?: Player;
  turn?: Player;
  board?: Board;
}

export type Board = { color: "yellow" | "red" }[][];
