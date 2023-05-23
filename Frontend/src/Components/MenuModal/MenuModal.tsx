import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { css } from "@emotion/css";
import { useRef } from "react";
import SelectGame from "../SelectGame/SelectGame";
import { SendMessage } from "react-use-websocket";
import axios from "axios";
type Props = {
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
  userId: string | undefined;
};

export const MenuModal = ({ isOpen, onChange, userId }: Props) => {
  const ref = useRef(null);

  useOnClickOutside(ref, () => onChange(false));

  const createGame = async () => {
    const res = await axios.post("http://localhost:8899/createGame", {
      userId: userId,
    });
    console.log(res.data);
  };

  return (
    <motion.div
      ref={ref}
      onClick={() => !isOpen && onChange(!isOpen)}
      className={styles.modalWrapper(isOpen)}
      initial={{ opacity: 1, width: 720, height: 50 }}
      animate={{
        opacity: 1,
        width: 720,
        height: isOpen ? "auto" : 50,
      }}
      whileHover={!isOpen ? { width: "auto" } : {}}
    >
      <div className={styles.modalContainer}>
        <span className={styles.menuText}>Menu</span>
        <SelectGame onCreateGame={createGame} />
      </div>
    </motion.div>
  );
};

const styles = {
  menuText: css`
    color: white;
    font-size: 30px;
    /* center */
    display: flex;
    align-items: center;
  `,
  modalContainer: css`
    height: 100%;
    width: 100%;
    padding: 20px;
    padding-top: 0;
  `,
  modalWrapper: (isOpen: boolean) => css`
    background-color: #1944a1;
    /* beautifull shadow */
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
    border-radius: 0 0 20px 20px;
    position: absolute;
    z-index: 100;
    top: 0;
    /* border 3 px except top */
    border: 3px solid white;
    border-top: none;
    overflow: hidden;
    /* on hover, cursor */
    &:hover {
      cursor: ${!isOpen && "pointer"};
    }
  `,
};
