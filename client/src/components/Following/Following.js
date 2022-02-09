import { Avatar, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from "./styles";

const Following = ({ friend }) => {
    const classes = useStyles();
    return (
        <>
            <Link to={`/profile/${friend.username}`} style={{ textDecoration: "none" }}>
                <div className={classes.rightbarFollowing}>
                    <Avatar alt="Remy Sharp" image={"/static/images/avatar/1.jpg"} className={classes.rightbarFollowingImg} />
                    {/* <span className="rightbarFollowingName">{friend.username}</span> */}
                    <Typography variant="body2" color="textPrimary">{friend.username}</Typography>
                </div>
            </Link>
        </>
    )
}

export default Following
