import { css } from "@emotion/css";
// import svg
import BoardSvg from "../../assets/svg.svg";
import { Token } from "../Token/Token";

export default function Board() {
  const tokenMatrix = [
    [
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
    ], // row {player:null}
    [
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
    ], // row 1
    [
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
    ], // row 2
    [
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: 0 },
      { player: null },
      { player: null },
    ], // row 3
    [
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: 1 },
      { player: null },
      { player: null },
    ], // row 4
    [
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
    ], // row 5
  ];
  return (
    <div className={styles.svgWrapper}>
      {/* <Svg /> */}
      <img
        className={css`
          position: relative;
          z-index: 10;
        `}
        src={BoardSvg}
      ></img>
      <div className={styles.tokens}>
        {tokenMatrix.map((row, rowIndex) => (
          <div className={styles.row}>
            {row.map((token, columnIndex) => (
              <Token player={token.player} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  svgWrapper: css`
    overflow: hidden;
  `,
  flex: css`
    display: flex;
  `,
  row: css`
    display: flex;
    flex-direction: row;
    gap: 18px;
  `,
  tokens: css`
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
  `,
};
