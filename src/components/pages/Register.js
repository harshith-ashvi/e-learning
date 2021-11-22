import { Avatar, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const mainBoxStyle = {
    mt: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

const avatarStyle = {
    m: 1,
    bgcolor: "primary.main"
}

const Register = (props) => {
    return (
        <Container component="main" maxWidth="xs">
            <Box sx={mainBoxStyle}>
                <Avatar sx={avatarStyle}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h4" component="h1">
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{mt: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Admin/Tutor's Details
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Username"
                                name="username"
                                fullWidth
                                required 
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Email"
                                name="email"
                                fullWidth
                                required 
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Password"
                                name="password"
                                fullWidth
                                required 
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Academy Details
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Academy Name"
                                name="academy.name"
                                fullWidth
                                required 
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Academy Website"
                                name="academy.website"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 1, mb: 2 }}
                            >
                                Register
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                color="warning"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 1, mb: 2 }}
                            >
                                Cancel
                            </Button>
                        </Grid>

                        <Grid container justifyContent="flex-end" sx={{mt: 1, paddingBottom: 5}}>
                            <Grid item>
                                <Link href="/login" variant="body2" underline="hover">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Register