export interface Game {
  gameId?: string;
  status?: "waiting" | "playing" | "finished";
  player1?: Player;
  player2?: Player;
  turn?: string;
  board?: Board;
  countDown?: number;
}

export type Board = { color: "yellow" | "red" | null }[][];

export interface Player {
  id: string;
  color: "red" | "yellow";
  name?: string;
}
