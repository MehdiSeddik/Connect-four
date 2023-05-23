import { css } from "@emotion/css";
// import svg
import BoardSvg from "../../assets/svg.svg";
import { Token } from "../Token/Token";

export default function Board() {
  // const gamesInfos = useGameInfos();
  const gameBoard = [
    [
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
    ], // row 0
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
      { player: 1 },
      { player: 2 },
      { player: null },
    ], // row 3
    [
      { player: null },
      { player: null },
      { player: null },
      { player: null },
      { player: null },
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
    <div id="gameBoard" className={styles.svgWrapper}>
      {/* <Svg /> */}
      <img className={styles.img} src={BoardSvg} />
      <div className={styles.tokens}>
        {gameBoard.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((token, columnIndex) => (
              <Token player={token.player} key={columnIndex} />
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
    top: 47%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
  `,
  img: css`
    position: relative;
    z-index: 10;
  `,
};
