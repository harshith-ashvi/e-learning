import { Avatar, Button, Container, Grid, IconButton, InputAdornment, Link, TextField, Typography, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as Yup from "yup";
import { useFormik } from "formik";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useSelector, useDispatch } from "react-redux";
import { clearUserErrors, startGetAdminDetails, startLoginAdmin } from "../../actions/userActions";

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

const validationSchema = Yup.object({
    email: Yup
        .string()
        .required("Email cannot be empty")
        .email("Invalid email format"),
    password: Yup
        .string()
        .required("Password cannot be empty") 
})

const Login = (props) => {
    const [ showPassword, setShowPassword ] = useState(false)
    const [ tab, setTab ] = useState("admin")

    const dispatch = useDispatch()
    const loginError = useSelector(state => state.user.errors)

    const initialValues = {
        email: "",
        password: ""
    }

    const redirectHome = () => {
        return props.history.push("/")
    }

    const handleTabsChange = (e, tabValue) => {
        setTab(tabValue)
    }

    useEffect(() => {
        dispatch(clearUserErrors())
    }, [])

    const { handleChange, handleSubmit, values, errors, handleReset } = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: false,
        onSubmit: (values, { resetForm }) => {
            if (tab === "admin") {
                dispatch(startLoginAdmin(values, resetForm, redirectHome))
            } else {
                console.log("student", values)
            }
            
            // dispatch(startAdminRegister(values, resetForm, redirectLogin))
        },
        // onReset: (values, { resetForm }) => {
        //     resetForm()
        // }
    })

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={mainBoxStyle}>
                <Box sx={{mb: 2}}>
                    <Tabs value={tab} onChange={handleTabsChange}>
                        <Tab label="Admin" value="admin"/>
                        <Tab label="Student" value="student"/>
                    </Tabs>
                </Box>


                <Avatar sx={avatarStyle}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h4" component="h1">
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={{mt: 3}} onSubmit={handleSubmit} onReset={handleReset}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Email"
                                name="email"
                                fullWidth
                                required 
                                value={values.email}
                                onChange={handleChange}
                                error={errors.hasOwnProperty("email")}
                                helperText={errors.email && errors.email}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Password"
                                name="password"
                                fullWidth
                                required
                                value={values.password}
                                onChange={handleChange}
                                error={errors.hasOwnProperty("password")}
                                helperText={errors.password && errors.password}
                                type={showPassword? "text":"password"}
                                InputProps={{
                                    endAdornment: (
                                        values.password.trim().length > 0 && (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                    { showPassword? (
                                                        <VisibilityOutlinedIcon/>
                                                    ) : (
                                                        <VisibilityOffOutlinedIcon/>
                                                    ) }
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    )
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom sx={{color: "red"}}>
                                { loginError.errors && loginError.errors }
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 1, mb: 2 }}
                                type="submit"
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                color="warning"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 1, mb: 2 }}
                                type="reset"
                            >
                                Cancel
                            </Button>
                        </Grid>

                        <Grid container justifyContent="flex-end" sx={{mt: 1, paddingBottom: 5}}>
                            <Grid item>
                                <Link href="/register" variant="body2" underline="hover">
                                    Don't have an account (For Admin only)? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Login