import React, { useContext, useEffect, useRef, useState } from 'react'
import { Typography, CardContent, CardMedia, Paper, Grid, Button, CardActions, Avatar } from '@material-ui/core';
import useStyles from "./styles";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import EditIcon from '@material-ui/icons/Edit';
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const EditProfile = ({ user }) => {
    const classes = useStyles();
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState([]);
    const [open, setOpen] = React.useState(false);
    // const location = useRef();
    // const bio = useRef();
    const [bio, setBio] = useState("")
    const [location, setLocation] = useState("")

    useEffect(() => {
        setBio(currentUser.bio)
    }, [currentUser.bio])

    useEffect(() => {
        setLocation(currentUser.location)
    }, [currentUser.location])

    useEffect(() => {
        setFollowed(currentUser.following.includes(user._id))
    }, [currentUser.following, user._id])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const handleClick = async () => {
        try {
            if (followed) {

                await axios.put(`/users/${user._id}/unfollow`, { userId: currentUser._id });

                dispatch({ type: "UNFOLLOW", payload: user._id })
            } else {
                await axios.put(`/users/${user._id}/follow`, { userId: currentUser._id });

                dispatch({ type: "FOLLOW", payload: user._id })
            }
        } catch (error) {
            console.log(error);
        }
        setFollowed(!followed);
    };
    

    const handleSubmit = async () => {

        if (user.username === currentUser.username) {



            try {
                await axios.put(`/users/${user._id}`, { userId: currentUser._id });

            } catch (error) {
                console.log(error)
            }
        }

        setLocation(location);
        setBio(bio);

        handleClose();
    }

    return (
        <Paper className={classes.card}>
            <Avatar image={"/static/images/avatar/1.jpg"}  title="Hi" className={classes.image} />
            <Grid item xs={12} sm={6} md={6}>
                <CardContent className={classes.content}>
                    <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                    <Typography variant="h6" >@{user.username}</Typography>
                    <form onSubmit={handleSubmit}>
                    <Typography variant="body1" color="textSecondary">{location}</Typography>
                    <Typography variant="body1">{bio}</Typography>
                    </form>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    {user.username !== currentUser.username && (
                        <Button onClick={handleClick} size="small" color="primary" >
                            {followed ? <PersonAddDisabledIcon size="small" /> : <PersonAddIcon size="small" />}
                        </Button>
                    )}
                    {user.username === currentUser.username && ( 
                    <Button size="small" color="primary" onClick={handleClickOpen} >
                        <EditIcon size="small" />
                    </Button>)}
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit your profile details</DialogTitle>
                        <DialogContent>
                    <form onSubmit={handleSubmit}> 
                        <TextField value={location} onChange={(e) => setLocation(e.target.value)}  autoFocus margin="dense" name="location" label="Location" type="text" fullWidth />
                        <TextField value={bio}  onChange={(e) => setBio(e.target.value)} autoFocus margin="dense" name="bio" variant="outlined" label="Bio" fullWidth multiline rows={4} />
                    </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" onClick={handleSubmit} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </CardActions>
            </Grid>
        </Paper>
    )
}

export default EditProfile;
