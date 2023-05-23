export interface Player {
  id: number;
  color: PlayerColor;
  name: string;
}

export enum PlayerColor {
  Red = "red",
  Yellow = "Yellow",
}
