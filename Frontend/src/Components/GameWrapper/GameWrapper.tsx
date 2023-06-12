import { ReactNode, createContext, useEffect, useState } from "react";
import { Game, Player } from "../../Types/types";
import useWebSocket from "react-use-websocket";

export interface GameContextProps {
  game: Game;
  onGameUpdate: (updated: Partial<Game>) => void;
  userId?: string;
  isPlayer1?: boolean;
  sendMessage?: (message: string) => void;
  isYourTurn?: boolean;
  winner?: Player;
}

export const gameContext = createContext<GameContextProps | undefined>(
  undefined
);

interface Props {
  children?: ReactNode;
}
const GameWrapper = ({ children }: Props): JSX.Element => {
  const [game, setGame] = useState<Game>({});
  const [userId, setUserId] = useState<string | undefined>();

  const { sendMessage } = useWebSocket("ws://localhost:8899", {
    shouldReconnect: (closeEvent) => true,
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

  const onGameUpdate = (updated: Partial<Game>) => {
    setGame({ ...game, ...updated });
  };
  return (
    <gameContext.Provider
      value={{
        game,
        onGameUpdate,
        userId,
        sendMessage,
        isPlayer1: game.player1?.id === userId,
        isYourTurn: game.turn === userId,
        winner: game.winner,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};

export default GameWrapper;
