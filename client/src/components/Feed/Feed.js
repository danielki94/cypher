import React, { useContext, useEffect, useState } from 'react'
import Post from '../Post/Post'
import { Grid } from '@material-ui/core';
// import useStyles from "./styles";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import Form from '../Form/Form';

const Feed = ({ username }) => {
    // const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username 
            ? await axios.get(`/posts/profile/${username}`) 
            : await axios.get(`/posts/allposts/${user._id}`);
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }))
        };
        fetchPosts();
    },[ username, user._id ]);
    
    return (
        <Grid container alignItems="stretch" spacing={3}>
            <Grid item xs={12}>
                { (!username || username === user.username) && <Form /> }
            </Grid>
            {posts.map((p) => (
                <Post key={p._id} post={p} />
            ))}
            
           
            
        </Grid>
    )
}

export default Feed
