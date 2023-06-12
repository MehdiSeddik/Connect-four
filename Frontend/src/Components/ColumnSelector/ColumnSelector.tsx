import { css } from "@emotion/css";
// import svg
import { Token } from "../Token/Token";
import { Game } from "../../Types/types";
import { useGame } from "../../Hooks/useGame";
interface Props {
  onColumnSelect: (column: number) => void;
  onColumnClick: (column: number) => void;
  selectedColumn: number;
}
export default function ColumnSelector({
  onColumnSelect,
  selectedColumn,
  onColumnClick,
}: Props) {
  const { game, isYourTurn } = useGame();
  return (
    <div id="gameBoard" className={styles.svgWrapper}>
      {/* <div className={styles.columnOverlay}>ICI</div> */}
      <div className={styles.tokens}>
        {game.board?.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((token, columnIndex) => (
              <Token
                onHover={() => onColumnSelect(columnIndex)}
                onClick={() => isYourTurn && onColumnClick(columnIndex)}
                key={columnIndex}
              />
            ))}
          </div>
        ))}
      </div>
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
    z-index: 50;
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
    height: 100%;
  `,
};
