import React, { useContext, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from "./styles";
import { Link } from 'react-router-dom';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';



const Login = () => {

  const classes = useStyles();
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    
    loginCall({ email: email.current.value, password: password.current.value }, dispatch);

  }

  console.log(user)

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant="h6">
            WELCOME TO CYPHER!
          </Typography>
          <Typography variant="body1" className={classes.text}>
            Connect with dancers around your area
          </Typography>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleClick} className={classes.form} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              inputRef={email}
            />
            <TextField
              variant="outlined"
              margin="normal"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isFetching? <CircularProgress/> : "Sign In"}
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default Login
