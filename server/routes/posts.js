const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// Create a post - createPost

router.post("/", async (req, res) => {
    const newPost = new Post(req.body)

    try {
        const savedPost = await newPost.save();

        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error)
    }
});

// Update a post - updatePost

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            
            res.status(200).json("The post has been updated");
        } else {
            res.status(403).json("You can update only your post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete a post - deletePost

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log(post)
        console.log(req.body)

        if (post.userId === req.body.userId) {
            await post.deleteOne();

            // await post.findByIdAndDelete({ _id: req.params.id });
            
            res.status(200).json("The post has been deleted");
        } else {
            res.status(403).json("You can delete only your post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Like/unlike a post - likePost

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // check whether this post's like array includes this user's or not
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: {likes: req.body.userId} });

            res.status(200).json("The post has been liked")
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }

    } catch (error) {
        res.status(500).json(error);
        
    }
});

// Get a post - getPost

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get all posts - getPosts

router.get("/allposts/:userId", async (req, res) => {
    try {

        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
               return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))

    } catch (error) {
        res.status(500).json(error);
    }
});

// Get all user's posts

router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        const posts = await Post.find({ userId: user._id });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;