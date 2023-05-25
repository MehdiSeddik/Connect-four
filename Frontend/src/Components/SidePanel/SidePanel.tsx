import { Player } from "../../Types/PlayerTypes";
import { css } from "@emotion/css";

type Props = {
  player?: Player;
};

export default function SidePanel({ player }: Props) {
  return (
    <div className={styles.panelWrapper(player?.color)}>
      <span className={styles.panelText}>{player?.name}</span>
    </div>
  );
}

const styles = {
  panelWrapper: (playerColor?: string) => css`
    height: 300px;
    flex: 1;
    margin: 0px 40px;
    padding: 20px;
    border-radius: 40px;
    background-color: ${playerColor || "#1944a1"};
    border: white 3px solid;
    display: flex;
    flex-direction: column;
  `,
  panelText: css`
    color: white;
    font-size: 25px;
    /* center */
    display: flex;
    align-items: center;
  `,
};
