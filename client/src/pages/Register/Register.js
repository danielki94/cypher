import React, { useRef } from 'react';
import useStyles from "./styles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const classes = useStyles();
    const username = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        if (confirmPassword.current.value !== password.current.value) {
            password.current.setCustomValidity("The passwords you have entered do not match.");
        } else {
            const user = {
                username: username.current.value,
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {

                await axios.post("/auth/register", user);
                history.push("/login")
            } catch (error) {
                console.log(error)
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form onSubmit={handleClick} className={classes.form} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="uname"
                                name="userName"
                                variant="outlined"
                                required
                                fullWidth
                                id="userName"
                                label="Username"
                                autoFocus
                                inputRef={username}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                inputRef={firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                inputRef={lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                inputRef={email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                inputProps={{ minLength: 6 }}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={confirmPassword}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>

            </Paper>

        </Container>
    )
}

export default Register
