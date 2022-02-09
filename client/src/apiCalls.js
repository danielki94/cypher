import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {

        const res = await axios.post("auth/login", userCredentials)

        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
}

export const logoutCall = async (user, dispatch) => {
    try {
        
        await localStorage.clear();
        
        dispatch({ type: "LOGOUT" });
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async (postId, dispatch) => {
    try {
        await axios.delete("/posts/:id", postId);

        dispatch({ type: "DELETE" })
    } catch (error) {
        console.log(error)
    }
}