import { Avatar, Button, Container, Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as Yup from "yup";
import { useFormik } from "formik";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useSelector, useDispatch } from "react-redux";
import { clearUserErrors, startAdminRegister } from "../../actions/userActions";

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
    username: Yup
        .string()
        .required("Username cannot be empty"),
    email: Yup
        .string()
        .required("Email cannot be empty")
        .email("Invalid email format"),
    password: Yup
        .string()
        .required("Password cannot be empty")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
          ),
    academy: Yup.object({
        name: Yup
            .string()
            .required("Academy name cannot be empty"),
        website: Yup
            .string()
    })    
})

const Register = (props) => {
    const [ showPassword, setShowPassword ] = useState(false)

    const dispatch = useDispatch()
    const registerError = useSelector(state => state.user.errors)

    const initialValues = {
        username: "",
        email: "",
        password: "",
        academy: {
            name: "",
            website: ""
        }
    }

    const redirectLogin = () => {
        return props.history.push("/login")
    }

    useEffect(() => {
        dispatch(clearUserErrors())
    }, [])

    const { handleChange, handleSubmit, values, errors, handleReset } = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: false,
        onSubmit: (values, { resetForm }) => {
            dispatch(startAdminRegister(values, resetForm, redirectLogin))
        },
        // onReset: (values, { resetForm }) => {
        //     resetForm()
        // }
    })

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={mainBoxStyle}>
                <Avatar sx={avatarStyle}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h4" component="h1">
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit} onReset={handleReset}>
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
                                value={values.username}
                                onChange={handleChange}
                                error={errors.hasOwnProperty("username")}
                                helperText={errors.username && errors.username }
                            />
                        </Grid>

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
                                value={values.academy.name}
                                onChange={handleChange}
                                error={errors?.academy?.hasOwnProperty("name")}
                                helperText={errors.academy?.name && errors.academy.name}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Academy Website"
                                name="academy.website"
                                fullWidth
                                value={values.academy.website}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom sx={{color: "red"}}>
                                { registerError.errors && registerError.errors }
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
                                Register
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