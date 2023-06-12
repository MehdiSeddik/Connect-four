import "./App.css";
import { useState } from "react";
import { css } from "@emotion/css";
import Board from "./Components/Board/Board";
import { MenuModal } from "./Components/MenuModal/MenuModal";
import { useGame } from "./Hooks/useGame";
export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { game, onGameUpdate, userId } = useGame();

  return (
    <div className="landing">
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <Board game={game} />
          <MenuModal
            userId={userId}
            isOpen={isMenuOpen}
            onChange={setIsMenuOpen}
            onGameUpdate={onGameUpdate}
          />
          {/* <button onClick={() => setIsMenuOpen((val) => !val)}>open menu</button> */}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: css`
    height: 100%;
    width: 100%;
    transition: width 0.3s ease;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: end;
    padding-bottom: 20px;
    gap: 18px;
    position: relative;
  `,
  body: css`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(137deg, #1a1b26 0%, #2b557f 100%);
    /* all transitions */
  `,
};

export default App;
