import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@mui/material";
 
const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav"  sx={{ backgroundColor: "#E6E1EF" }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block", color: "black" } }}
            >
              LOGO
            </Typography>
            <Button sx={{ direction: "flex", background: "#C9B5D4",  "&:hover": { backgroundColor: "#B098C1"} }}>
              {" "}
              <Link
                to="/add"
                style={{ textDecoration: "none", color: "white" }}
              >
                Add User data
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
    </>
  );
};

export default Home;
