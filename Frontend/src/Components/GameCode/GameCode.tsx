import React from "react";
import { Game } from "../../Types/types";
import { css } from "@emotion/css";
import { Tooltip } from "@mui/material";

type Props = {
  game: Game;
  tooltipText: string;
};

export default function GameCode({ game, tooltipText }: Props) {
  return (
    <Tooltip title={tooltipText} placement="bottom-start">
      <div className={styles.wrapper}>
        <div id="game code" className={styles.inviteText}>
          Game code: {game.gameId}
        </div>
        <div id="game-status" className={styles.statusText}>
          {game.status === "waiting" && "waiting for player2"}
        </div>
      </div>
    </Tooltip>
  );
}

const styles = {
  statusText: css`
    font-size: 20px;
    margin-top: 10px;
    margin-left: auto;
  `,
  inviteText: css`
    font-size: 20px;
    margin-top: 10px;
  `,
  clickable: css`
    border: white 3px solid;
    border-radius: 5px;
    padding: 0px 5px;
    cursor: pointer;
  `,
  wrapper: css`
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 30px;
    color: white;
    gap: 10px;
  `,
};
