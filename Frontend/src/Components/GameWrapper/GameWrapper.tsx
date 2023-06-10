import { ReactNode, createContext, useEffect, useState } from "react";
import { Game } from "../../Types/types";
import useWebSocket from "react-use-websocket";

export interface GameContextProps {
  game: Game;
  onGameUpdate: (updated: Partial<Game>) => void;
  userId?: string;
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
  // each time game change, console.log(game)
  const { sendMessage } = useWebSocket("ws://localhost:8899", {
    shouldReconnect: (closeEvent) => true,
    onMessage: (message: any) => {
      if (!message.data) {
        return;
      }
      if (JSON.parse(message.data).userId) {
        setUserId(JSON.parse(message.data).userId);
      }
    },
  });
  useEffect(() => {
    game && console.log("game has changed", game);
  }, [game]);

  const onGameUpdate = (updated: Partial<Game>) => {
    setGame({ ...game, ...updated });
  };
  return (
    <gameContext.Provider value={{ game, onGameUpdate, userId }}>
      {children}
    </gameContext.Provider>
  );
};

export default GameWrapper;
