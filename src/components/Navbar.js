import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{background: "transparent", color: "blue"}}>
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Reopto
                    </Typography>
                    <Button color="inherit"><Link to="/">Home</Link></Button>
                    <Button color="inherit"><Link to="#">Sign up</Link></Button>
                    <Button color="inherit"><Link to="#">Sign in</Link></Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar