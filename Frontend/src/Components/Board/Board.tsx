import { css } from "@emotion/css";
// import svg
import BoardSvg from "../../assets/svg.svg";
import { Token } from "../Token/Token";
import { Game } from "../../Types/GameTypes";
interface Props {
  game: Game;
}
export default function Board({ game }: Props) {
  return (
    <div id="gameBoard" className={styles.svgWrapper}>
      {/* <Svg /> */}
      <img className={styles.img} src={BoardSvg} />
      <div className={styles.tokens}>
        {game.board?.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((token, columnIndex) => (
              <Token color={token.color} key={columnIndex} />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.columnOverlay}>ICI</div>
    </div>
  );
}

const styles = {
  columnOverlay: css`
    position: absolute;
    top: -10px;
  `,
  svgWrapper: css`
    position: relative;
  `,
  flex: css`
    display: flex;
    align-items: end;
  `,
  row: css`
    display: flex;
    flex-direction: row;
    gap: 18px;
  `,
  tokens: css`
    position: absolute;
    top: 17px;
    left: 17px;
    z-index: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
  `,
  img: css`
    position: inherit;
    z-index: 10;
  `,
};
