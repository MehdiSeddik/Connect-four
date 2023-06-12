import { css } from "@emotion/css";

interface Props {
  color?: string;
  onHover?: () => void;
  onClick?: () => void;
}
export const Token = ({ color, onHover, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onHover}
      className={styles.token(color)}
    />
  );
};

const styles = {
  token: (color?: string) => css`
    height: 70px;
    width: 70px;
    border-radius: 50%;
    opacity: ${color ? 1 : 0};
    background-color: ${color ?? "transparent"};
    z-index: 10;
  `,
};
