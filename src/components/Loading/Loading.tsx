import { CircularProgress, Grid } from "@mui/material";

const Loading = () => {
  return (
    <Grid
      flex={1}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CircularProgress color="primary" />
    </Grid>
  );
};

export default Loading;
