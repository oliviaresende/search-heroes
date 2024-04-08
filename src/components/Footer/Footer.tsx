import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar
      position="static"
      style={{
        top: "auto",
        bottom: 0,
        marginTop: "auto",
      }}
      component={"footer"}
    >
      <Toolbar>
        <Typography variant="body2" style={{ margin: "auto" }}>
          © 2024 Search Heroes.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
