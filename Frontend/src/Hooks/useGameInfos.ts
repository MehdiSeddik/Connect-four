import axios from "axios";
import { Game } from "../Types/GameTypes";

export const useGameInfos = async (userId: number) => {
  return await axios
    .get(`https://localhost:5001/api/game/fromuser${userId}`)
    .then((response) => {
      const gameInfos: Game = {
        gameId: response.data.id,
        player1Id: response.data.player1Id,
        player2Id: response.data.player2Id,
      };
      return gameInfos;
    });
};
