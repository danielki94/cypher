import React, { useContext, useRef, useState } from 'react'
import { TextField, Button, Paper } from '@material-ui/core';
import useStyles from "./styles";
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";



const Form = () => {
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const classes = useStyles();
    const {user} = useContext(AuthContext);
    const description = useRef();
    const [file, setFile] = useState(null)
   

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            description: description.current.value,
        }

        if (file) {
            const data = new FormData();
            // to prevent any conflicting file names that are the same
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try {
                await axios.post("/upload", data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            await axios.post("/posts", newPost);
            
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>
            <Paper className={classes.paper}>
                <form onSubmit={submitHandler} autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} >
                    <TextField name="description" variant="outlined" label="Share your Cypher!" fullWidth multiline rows={4} inputRef={description} />
        
                    <div className={classes.fileInput}>
                        <input type="file" id="file" accept=",png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                </form>
            </Paper>
        </>
    )
}

export default Form
