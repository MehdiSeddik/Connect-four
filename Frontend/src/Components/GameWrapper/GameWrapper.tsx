import { ReactNode, createContext, useEffect, useState } from "react";
import { Game, Player } from "../../Types/types";
import useWebSocket from "react-use-websocket";

export interface GameContextProps {
  game?: Game;
  winner?: Player;
  userId?: string;
  isPlayer1?: boolean;
  isYourTurn?: boolean;
  onGameUpdate: (updated: Game) => void;
  sendMessage: (message: string) => void;
}

export const gameContext = createContext<GameContextProps | undefined>(
  undefined
);

interface Props {
  children?: ReactNode;
}
const GameWrapper = ({ children }: Props) => {
  const [game, setGame] = useState<Game>();
  const [userId, setUserId] = useState<string | undefined>();

  const { sendMessage } = useWebSocket("wss://c4-backend.game-trip.fr:80", {
    shouldReconnect: () => true,
    onMessage: (message: any) => {
      if (!message.data) {
        return;
      }
      if (JSON.parse(message.data).userId) {
        setUserId(JSON.parse(message.data).userId);
      }
      if (JSON.parse(message.data).game) {
        setGame(JSON.parse(message.data).game);
      }
    },
  });

  const onGameUpdate = (updated: Game) => {
    setGame(updated);
  };
  return (
    <gameContext.Provider
      value={{
        sendMessage,
        game,
        onGameUpdate,
        userId,
        isPlayer1: game && game.player1?.id === userId,
        isYourTurn: game && game.turn === userId,
        winner: game && game.winner,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};

export default GameWrapper;
