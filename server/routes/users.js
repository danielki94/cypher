const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


// Update User

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        // if user wants to update password
        if (req.body.password) {
            try {
                // generate new password
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (error) {
            return res.status(500).json(error); 
        }
    } else {
        return res.status(403).json("You can update only your account!")
    }
})

// Delete User

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        // if user wants to update password
        
        try {
            const user = await User.findByIdAndDelete({ _id: req.params.id});
            res.status(200).json("Account has been deleted");
        } catch (error) {
            return res.status(500).json(error); 
        }
    } else {
        return res.status(403).json("You can delete only your account!")
    }
});

// // Get User

router.get("/", async (req, res) => {
    // query the user by user id i.e "1314212" or username i.e "danny"
    const userId = req.query.userId;
    const username = req.query.username;

    try {
        const user = userId 
        ? await User.findById(userId) 
        : await User.findOne({ username: username});

        const { password, updatedAt, ...other } = user._doc

        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
});

// // Get Following Users

router.get("/friends/:userId", async (req, res) => {
    try {

        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.following.map((friendId) => {
                return User.findById(friendId);
            })
        );

    
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push(  {_id, username, profilePicture}  );
        });
        res.status(200).json(friendList)
        
    } catch (error) {
        res.status(500).json(error)
    }
});

// // Follow User

router.put("/:id/follow", async (req, res) => {
    // if they are not the same user
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            // if the current user is not following another user
            if (!user.followers.includes(req.body.userId)) {
                // adding currentUser to another user's follower's array
                await user.updateOne({ $push: { followers: req.body.userId } });
                // adding selected user to currentUser's following id 
                await currentUser.updateOne({ $push: { following: req.params.id } });

                res.status(200).json("User has been followed")
            } else {
                res.status(403).json("You already follow this user")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You cannot follow yourself!")
    }
});

// // Unfollow User

router.put("/:id/unfollow", async (req, res) => {
    // if they are not the same user
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { following: req.params.id } });

                res.status(200).json("User has been unfollowed")
            } else {
                res.status(403).json("You already unfollowed this user")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You cannot unfollow yourself!")
    }
});


module.exports = router