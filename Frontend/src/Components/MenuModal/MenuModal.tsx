import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { css } from "@emotion/css";
import { useRef, useState } from "react";
import SelectGame from "../SelectGame/SelectGame";
import { SendMessage } from "react-use-websocket";
import axios from "axios";
import { Game } from "../../Types/GameTypes";
import GameCode from "../GameCode/GameCode";
type Props = {
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
  userId: string | undefined;
  setGame: React.Dispatch<React.SetStateAction<Game>>;
  game: Game;
};

export const MenuModal = ({
  isOpen,
  onChange,
  userId,
  setGame,
  game,
}: Props) => {
  const ref = useRef(null);

  useOnClickOutside(ref, () => onChange(false));

  const createGame = async () => {
    const res = await axios.post("http://localhost:8899/game/new", {
      player1Id: userId,
    });
    if (res.data.gameId && userId) {
      setGame({
        ...game,
        player1: { id: userId, color: "red", name: "player1" },
        turn: { id: userId, color: "red", name: "player1" },
        gameId: res.data.gameId,
        status: "waiting",
        board: res.data.board,
      });
      onChange(false);
    }
  };
  const hasGameId = game.gameId !== undefined;
  const [tooltipText, setTooltipText] = useState("click to copy");

  return (
    <div
      id="menu-modal"
      ref={ref}
      onClick={() => {
        !isOpen && !hasGameId && onChange(!isOpen);
        if (!game.gameId) {
          return;
        }
        setTooltipText("copied!");
        navigator.clipboard.writeText(game.gameId);
        setTimeout(() => {
          setTooltipText("click to copy");
        }, 1000);
      }}
      className={styles.modalWrapper(isOpen)}
    >
      <div className={styles.modalContainer}>
        {hasGameId ? (
          <GameCode game={game} tooltipText={tooltipText} />
        ) : (
          <span className={styles.menuText}>Menu</span>
        )}
        <SelectGame onCreateGame={createGame} />
      </div>
    </div>
  );
};

const styles = {
  menuText: css`
    color: white;
    font-size: 30px;
    /* center */
    display: flex;
    align-items: center;
  `,
  modalContainer: css`
    height: 100%;
    width: 100%;
    padding: 20px;

    padding-top: 0;
    transition: height 0.5s, width 0.5s;
  `,
  modalWrapper: (isOpen: boolean) => css`
    background-color: #1944a1;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
    border-radius: 0 0 20px 20px;
    position: absolute;
    z-index: 100;
    top: 0;
    opacity: 1;
    width: 720px;
    /* border 3 px except top */
    border: 3px solid white;
    border-top: none;
    overflow: hidden;
    /* on hover, cursor */
    &:hover {
      cursor: ${!isOpen && "pointer"};
      width: ${!isOpen && "750px"};
    }
    height: ${isOpen ? "340px" : "50px"};

    transition: height 0.5s, width 0.5s;
  `,
};
