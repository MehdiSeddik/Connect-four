import { css } from "@emotion/css";
import "./App.css";
import Board from "./Components/Board/Board";

export const App = () => {
  return (
    <body className={styles.body}>
      <Board />
    </body>
  );
};

const styles = {
  body: css`
    height: 100vh;
    width: 100vw;
    background: rgb(198, 199, 210);
    background: linear-gradient(
      137deg,
      rgba(198, 199, 210, 1) 0%,
      rgba(230, 234, 238, 1) 100%
    );
    overflow: hidden;
    // center content
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export default App;
