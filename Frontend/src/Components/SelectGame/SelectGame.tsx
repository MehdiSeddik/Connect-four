import Typography from "@mui/material/Typography";
import creategame from "../../assets/create-game.jpg";
import joingame from "../../assets/join-game.jpg";
import { Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import { css } from "@emotion/css";
interface Props {
  onCreateGame: () => void;
  onJoinGame?: () => void;
}
export default function SelectGame({ onCreateGame, onJoinGame }: Props) {
  return (
    <div className={styles.selectionWrapper}>
      <Card
        onClick={onCreateGame}
        sx={{
          width: 345,
          backgroundColor: "#1944a1",
          border: "3px solid white",
          color: "white",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={creategame}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Create new game
            </Typography>
            <Typography variant="body2" color="white">
              Create and configure a new game from scratch, you can then invite
              your friends.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card
        sx={{
          width: 345,
          backgroundColor: "#1944a1",
          border: "3px solid white",
          color: "white",
        }}
        onClick={onJoinGame}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={joingame}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Join existing game
            </Typography>
            <Typography variant="body2" color="white">
              Join an existing game, you will need a secret code to enter the
              game.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

const styles = {
  selectionWrapper: css`
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-top: 20px;
    /* ce,ter */
  `,
};
