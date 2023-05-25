import "./App.css";
import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import Board from "./Components/Board/Board";
import { MenuModal } from "./Components/MenuModal/MenuModal";
import SidePanel from "./Components/SidePanel/SidePanel";
import useWebSocket from "react-use-websocket";
import { Game } from "./Types/GameTypes";
export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsMenuOpen(true);
    }, 5500);
  }, []);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const { sendMessage } = useWebSocket("ws://localhost:8899", {
    shouldReconnect: (closeEvent) => true,
    onMessage: (message: any) => {
      console.log(JSON.parse(message.data).userId);
      setUserId(JSON.parse(message.data).userId ?? undefined);
    },
  });

  const [game, setGame] = useState<Game>({});
  console.log(game);
  return (
    <div className="landing">
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <SidePanel player={game.player1} />
          <Board game={game} />
          <SidePanel />
          <MenuModal
            userId={userId}
            isOpen={isMenuOpen}
            onChange={setIsMenuOpen}
            setGame={setGame}
            game={game}
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
