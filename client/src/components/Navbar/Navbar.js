import React, { useContext } from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import useStyles from './styles';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { logoutCall } from '../../apiCalls';

const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();

    const { user, dispatch } = useContext(AuthContext);

    const logout = (e) => {
        e.preventDefault();


        logoutCall({ user: null }, dispatch);

        history.push("/login");
    }

    return (
        <AppBar >
            <Toolbar className={classes.navContainer}>
                    <Button color="inherit" component={Link} to="/"><HomeOutlinedIcon /></Button>
                    <Button color="inherit" component={Link} to={`/profile/${user.username}`}><AccountCircleOutlinedIcon /></Button>
                    <Button color="inherit" onClick={logout}>Logout</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
