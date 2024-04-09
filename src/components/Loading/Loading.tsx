import { CircularProgress, Grid } from "@mui/material";

const Loading = () => {
  return (
    <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <CircularProgress color="primary" />
    </Grid>
  );
};

export default Loading;
