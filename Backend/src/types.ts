export interface Game {
  gameId?: string;
  status?: undefined | "waiting" | "playing" | "finished";
  player1?: Player;
  player2?: Player;
  turn?: string;
  board?: Board;
}

export type Board = { color: "yellow" | "red" | null }[][];

export interface Player {
  id: string;
  color: "red" | "yellow";
  name?: string;
}
