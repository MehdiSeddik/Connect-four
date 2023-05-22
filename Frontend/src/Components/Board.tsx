import { css } from "@emotion/css";
export default function Board() {
  return <div className={styles.boardWrapper}>Board</div>;
}

const styles = {
  boardWrapper: css`
    height: 600px;
    width: 700px;
    /* background-color: #22a3c1; */
    background-image: linear-gradient(to right, #1dd1a1, #1abc9c);
    border-radius: 12px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  `,
};
