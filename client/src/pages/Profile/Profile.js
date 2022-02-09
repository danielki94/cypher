import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import EditProfile from '../../components/EditProfile/EditProfile';

import { Grid, Container, Grow } from '@material-ui/core';
import useStyles from './styles';
import Feed from '../../components/Feed/Feed';
import Rightbar from '../../components/Rightbar/Rightbar';
import axios from 'axios';
import { useParams } from "react-router-dom";

const Profile = () => {
    const classes = useStyles();
    const [user, setUser] = useState({});
    const username = useParams().username

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data)
        };
        fetchUser();
    },[ username ]);

    return (
        <>
            <Container maxWidth="lg" className={classes.container}>
                <Navbar />
                <Grow in>
                    <Container>
                        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} md={8}>
                                <EditProfile user={user} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Rightbar user={user} />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Feed username={username}/>
                            </Grid>
                            {/* <Grid item xs={12} md={4}>
                                <Typography variant="h1" color="secondary">We'll be back</Typography>
                            </Grid> */}
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </>
    )
}

export default Profile;


