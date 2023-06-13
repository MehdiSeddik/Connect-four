import "./App.css";
import { useState } from "react";
import { css } from "@emotion/css";
import Board from "./Components/Board/Board";
import { MenuModal } from "./Components/MenuModal/MenuModal";
import GameWrapper from "./Components/GameWrapper/GameWrapper";
export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <GameWrapper>
      <div className="landing">
        <div className={styles.body}>
          <Board />
          <MenuModal isOpen={isMenuOpen} onChange={setIsMenuOpen} />
        </div>
      </div>
    </GameWrapper>
  );
};

const styles = {
  body: css`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(137deg, #1a1b26 0%, #2b557f 100%);
    transition: width 0.3s ease;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: end;
    padding-bottom: 20px;
    gap: 18px;
    position: relative;
  `,
};

export default App;
