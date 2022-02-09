import React from 'react';
import { Container, Grid, Grow, Paper, Typography } from '@material-ui/core';
import useStyles from "./styles";
import Navbar from '../../components/Navbar/Navbar';
import Feed from '../../components/Feed/Feed';
// import Rightbar from '../../components/Rightbar/Rightbar';

const Home = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Navbar />
            <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Feed />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {/* <Rightbar /> */}
                        <Paper>
                        <Typography variant="h2" align="center" >Welcome to Cypher, where you can showcase your artistry!</Typography>
                        <img src="/images/malone1.png"></img>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            </Grow>
        </Container>
        
    )
}

export default Home
