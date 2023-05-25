import { css } from "@emotion/css";

interface Props {
  color?: string;
}
export const Token = ({ color }: Props) => {
  return <div className={styles.token(color)} />;
};

const styles = {
  token: (color?: string) => css`
    height: 70px;
    width: 70px;
    border-radius: 50%;
    // if player is null then token is not visible
    opacity: ${color ? 1 : 0};
    background-color: ${color ?? "transparent"};
    z-index: 10;
  `,
};
