import "./App.css";
import { useState } from "react";
import { css } from "@emotion/css";
import Board from "./Components/Board/Board";
import { MenuModal } from "./Components/MenuModal/MenuModal";
import SidePanel from "./Components/SidePanel/SidePanel";
import useWebSocket from "react-use-websocket";
export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const { sendMessage } = useWebSocket("ws://localhost:8899", {
    shouldReconnect: (closeEvent) => true,
    onMessage: (message: any) => {
      console.log(JSON.parse(message.data).userId);
      setUserId(JSON.parse(message.data).userId ?? undefined);
    },
  });
  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <SidePanel />
        <Board />
        <SidePanel />
        <MenuModal
          userId={userId}
          isOpen={isMenuOpen}
          onChange={setIsMenuOpen}
        />
        {/* <button onClick={() => setIsMenuOpen((val) => !val)}>open menu</button> */}
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
    align-items: center;
    gap: 18px;
  `,
  body: css`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(137deg, #1a1b26 0%, #2b557f 100%);
    /* all transitions */
  `,
};

export default App;
