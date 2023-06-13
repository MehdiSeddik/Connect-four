import { css } from "@emotion/css";
import BoardSvg from "../../assets/svg.svg";
import { Token } from "../Token/Token";
import { useState } from "react";
import ColumnSelector from "../ColumnSelector/ColumnSelector";
import { useGame } from "../../Hooks/useGame";
import axios from "axios";
export default function Board() {
  const [hoveredColumn, setHoveredColumn] = useState(0);
  const { isPlayer1, game } = useGame();
  const isGameInitialized = game && game.gameId;

  const handleColumnClick = async (column: number) => {
    await axios.post("http://localhost:8899/game/drop", {
      column,
      color: isPlayer1 ? "red" : "yellow",
    });
  };

  return (
    <div id="gameBoard" className={styles.svgWrapper}>
      <ColumnSelector
        onColumnSelect={(column) => setHoveredColumn(column)}
        selectedColumn={hoveredColumn}
        onColumnClick={handleColumnClick}
      />
      <img className={styles.img} src={BoardSvg} />
      <div className={styles.tokens}>
        {isGameInitialized &&
          game.board.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((token, columnIndex) => (
                <Token color={token.color} key={columnIndex} />
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
