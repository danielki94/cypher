import React, { useContext, useEffect, useState } from 'react'
import useStyles from "./styles";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const Post = ({ post }) => {
    const classes = useStyles();
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);




    // due to a post already liked in our MongoDB
    useEffect(() => {
        // set to true if a post already includes a like
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data)
        };
        fetchUser();
    },[post.userId]);

    const likeHandler = () => {
        try {
            
            axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });

        } catch (error) {
            console.log(error)
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked)
    }

    const deleteClick = (e) => {
        e.preventDefault()

        try {

            axios.delete(`/posts/${post._id}`, { data: {userId: currentUser._id} });
            
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Grid item xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                    <CardMedia className={classes.media} src={post.img} title="photo" />
                    <img className="postImg" src={post.img} alt="" />
                    <div className={classes.overlay}>
                        <Link to={`/profile/${user.username}`}>
                            <Typography color="white" variant="h6">@{user.username}</Typography>
                        </Link>
                        <Typography variant="body2">{format(post.createdAt)}</Typography>
                    </div>
                    <div className={classes.details}>
                    </div>
                    {/* <Typography className={classes.title} gutterBottom variant="h5" component="h2">Title</Typography> */}
                    <CardContent>
                        <Typography variant="body2" color="textPrimary" component="p">{post?.description}</Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button onClick={likeHandler} size="small" color="primary" ><ThumbUpAltIcon fontSize="small" />{like}</Button>
                            { post.userId === currentUser._id ? <Button onClick={deleteClick} size="small" color="primary" ><DeleteIcon fontSize="small" /> </Button>  : null }
                    </CardActions>
                </Card>
            </Grid>



        </>
    )
}

export default Post
