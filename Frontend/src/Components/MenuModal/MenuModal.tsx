import { useOnClickOutside } from "usehooks-ts";
import { css } from "@emotion/css";
import { useRef, useState } from "react";
import SelectGame from "../SelectGame/SelectGame";
import axios from "axios";
import GameCode from "../GameCode/GameCode";
import { Box, CircularProgress, Input, Typography } from "@mui/material";
import { useGame } from "../../Hooks/useGame";
type Props = {
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
};

export const MenuModal = ({ isOpen, onChange }: Props) => {
  const modalRef = useRef(null);
  const [idInput, setIdInput] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  useOnClickOutside(modalRef, () => onChange(false));
  const [tooltipText, setTooltipText] = useState("click to copy");
  const { onGameUpdate, game, isPlayer1, isYourTurn, winner, userId } =
    useGame();
  const isGameInitialized = game && game.gameId;
  const timerValue = game ? Math.round((game.countDown * 100) / 30) : 0;

  const createGame = async () => {
    const res = await axios.post("http://localhost:8899/game/new", {
      player1Id: userId,
    });
    if (res.data && userId) {
      onGameUpdate(res.data);
      onChange(false);
    }
  };

  const joinGame = async (gameId: string) => {
    const res = await axios.post("http://localhost:8899/game/join", {
      gameId,
      player2Id: userId,
    });
    if (res.data) {
      onGameUpdate(res.data);
      onChange(false);
      setIsJoining(false);
    }
  };

  const handleCodeChange = (e: any) => {
    setIdInput(e.target.value);
    joinGame(e.target.value);
  };

  const handleModalClick = () => {
    !isOpen && !isGameInitialized && onChange(!isOpen);
    if (!isGameInitialized) {
      return;
    }
    setTooltipText("copied!");
    navigator.clipboard.writeText(game.gameId);
    setTimeout(() => {
      setTooltipText("click to copy");
    }, 1000);
  };

  console.log(isPlayer1);

  return (
    <div
      ref={modalRef}
      onClick={handleModalClick}
      className={styles.modalWrapper(isOpen, isJoining, isPlayer1)}
    >
      {isGameInitialized && game.winner ? (
        <div className={styles.modalContainer}>Winner is {winner!.color}</div>
      ) : (
        <div className={styles.modalContainer}>
          {isGameInitialized ? (
            <div className={styles.secondWrapper}>
              <GameCode game={game} tooltipText={tooltipText} />
              <div className={styles.infos}>
                <span className={styles.txtColor(!!isPlayer1)}>
                  {`you play ${isPlayer1 ? "red" : "yellow"} and it's ${
                    isYourTurn ? "your Turn" : "the opponent's Turn"
                  } `}
                </span>
              </div>
              {game.status === "playing" && (
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    variant="determinate"
                    value={timerValue}
                    color="info"
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >
                      {game.countDown}
                    </Typography>
                  </Box>
                </Box>
              )}
            </div>
          ) : (
            <span className={styles.menuText}>Menu</span>
          )}

          {isJoining ? (
            <div className={styles.secondWrapper}>
              <span className={styles.text}>Enter game id :</span>
              <Input value={idInput} onChange={handleCodeChange} />
            </div>
          ) : (
            <SelectGame
              onCreateGame={createGame}
              onJoinGame={() => setIsJoining(true)}
            />
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  txtColor: (isPlayer1: boolean) => css`
    color: ${isPlayer1 !== undefined && isPlayer1 === false
      ? "black"
      : "white"} !important;
  `,
  infos: css`
    margin-left: auto;
  `,
  secondWrapper: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  `,
  menuText: css`
    color: white;
    font-size: 30px;
    display: flex;
    align-items: center;
  `,
  text: css`
    color: white;
    font-size: 20px;
    margin-right: 10px;
  `,
  modalContainer: css`
    height: 100%;
    width: 100%;
    padding: 20px;

    padding-top: 0;
    transition: height 0.5s, width 0.5s;
  `,
  modalWrapper: (
    isOpen: boolean,
    isJoining: boolean,
    isPlayer1?: boolean
  ) => css`
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
    background-color: ${isPlayer1 === undefined
      ? "#1944a1"
      : isPlayer1
      ? "red"
      : "yellow"};
    /* on hover, cursor */
    &:hover {
      cursor: ${!isOpen && "pointer"};
      width: ${!isOpen && "750px"};
    }
    height: ${isOpen ? "340px" : "50px"};
    height: ${isJoining && "100px"};

    transition: height 0.5s, width 0.5s;
  `,
};
