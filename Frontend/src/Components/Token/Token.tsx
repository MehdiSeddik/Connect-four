import { css } from "@emotion/css";

interface Props {
  player: number | null;
}
export const Token = ({ player }: Props) => {
  return <div className={styles.token(player)} />;
};

const styles = {
  token: (player: number | null) => css`
    height: 70px;
    width: 70px;
    border-radius: 50%;
    // if player is null then token is not visible
    opacity: ${player === null ? 0 : 1};
    background-color: ${player === 1 ? "red" : "yellow"};
  `,
};
