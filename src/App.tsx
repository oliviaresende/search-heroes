import { Grid } from "@mui/material";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./global.css";

function App() {
  return (
    <Grid
      container
      display={"flex"}
      direction={"column"}
      justifyContent={"space-between"}
      height={"100vh"}
    >
      <Header />
      <Footer />
    </Grid>
  );
}

export default App;
