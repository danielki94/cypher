import { Paper, Card, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from "./styles";
import axios from "axios";
import Following from '../Following/Following';



const Rightbar = ({ user }) => {
    const [ friends, setFriends ] = useState([]);
    const classes = useStyles();
    

    useEffect(() => {
        const getFriends = async () => {
            try {

                const friendList = await axios.get(`/users/friends/${user._id}`);

                setFriends(friendList.data);
                // console.log(friendList)
            } catch (error) {
                console.log(error)
            }
        };
        getFriends();
    }, [user]);


    return (
        <>
            <Paper>
                <Card>
                    <Grid>
                        <Typography variant="h5" color="secondary" align="center" className={classes.text}>Following</Typography>
                        <div className={classes.rightbarFollowings}>
                            {friends.map((friend) => (
                                <Following key={friend._id} friend={friend} />
                            ))}
                        </div>
                    </Grid>
                </Card>
            </Paper>

        </>
    )
}

export default Rightbar
