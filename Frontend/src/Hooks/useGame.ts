import { useContext } from "react";
import {
  GameContextProps,
  gameContext,
} from "../Components/GameWrapper/GameWrapper";

// Custom hook to access the game context
export const useGame = (): GameContextProps => {
  const context = useContext(gameContext);

  if (!context) {
    throw new Error("useGame must be used within a GameWrapper");
  }

  return context;
};
