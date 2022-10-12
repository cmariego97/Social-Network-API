const { Thought, User } = require ('../models');

module.exports = {
    // get all thoughts 
    getAllThoughts(req, res) {
        Thought.find({})
            .then((thoughts) => res.json(thoughts))
            .cath((err) => res.status(500).json(err));
    },

    // get one single thought by its Id
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'sorry, no thought has been found with that ID'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // create a new thought with user
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: {
                        thoughts: thought._id
                        },
                    },
                    { new: true }
                );
            })
            .then((user) => 
                !user
                    ? res.status(404).json_({
                        message: 'The Thought has been created, but found no user exists with that ID',
                        })
                    : res.json('The Thought has been created!!!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // update an existing thought by Id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: `Sorry, no thought has been found with this Id!`})
                    : res.json(thought)
                )
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
    },

    // delete a thought by its Id
    
}