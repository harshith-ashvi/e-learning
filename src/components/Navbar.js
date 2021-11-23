import { AppBar, Button, CircularProgress, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeData } from "../actions/userActions";

const Navbar = (props) => {
    const { loading, data } = props
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch(removeData())
        alert("Successfully logged out")
        localStorage.removeItem("token")
        history.push("/")
    }

    const handleClick = (url) => {
        history.push(url)
    }

    return (
        <>
            { loading? (
                <Box sx={{display: 'flex', alignItems: "center"}}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" sx={{background: "transparent", color: "blue"}}>
                        <Toolbar>
                            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                                Reopto
                            </Typography>
                            { Object.keys(data).length > 0? (
                                <>
                                    { data.role === "admin"? (
                                        <Button color="inherit" onClick={() => handleClick("#")}>Dashboard</Button>
                                    ) : (
                                        <Button color="inherit" onClick={() => handleClick("#")}>Course</Button>
                                    ) }
                                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                                </>
                            ) : (
                                <>
                                    <Button color="inherit"><Link to="/">Home</Link></Button>
                                    <Button color="inherit"><Link to="/register">Sign up</Link></Button>
                                    <Button color="inherit"><Link to="/login">Sign in</Link></Button>
                                </>
                            )}
                            
                        </Toolbar>
                    </AppBar>
                </Box>
            )}
        </>
        
    )
}

export default Navbar