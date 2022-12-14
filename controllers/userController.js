const User = require('../models/User');

module.exports = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
        .then((users) => res.json(users))
        .catch((err) => console.log(err));
    },
    //get a single user
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //create a new user
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    //update an existing user
    updateUser(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
        //delete a user
        deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json({ message: 'User successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
        },
    //add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
        {_id: req.params.userId},
        {$push: {friends: req.params.friendId}},
        { new: true, runValidators: true}
        )
        .then( (user) => {
        !user 
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
        })
        .catch((err) => res.status(500).json(err));
    },
    //remove a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: { friends: req.params.friendId}},
        {new: true}
        )
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    }
};