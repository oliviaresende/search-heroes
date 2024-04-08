import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "../../assets/marvel.jpg";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <img
          src={logo}
          alt="Logo"
          style={{ marginRight: "10px", maxHeight: "50px" }}
        />
        <Typography variant="h6">Search Heroes</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
