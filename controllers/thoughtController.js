const { User, Thought} = require('../models');

module.exports = {
    //GET to get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    //GET to get a single thought by its _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No user with this id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No user with this id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //PUT to update a thought by its _id
    updateThought(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No user with this id!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //DELETE to remove a thought by its _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No user with this id' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Thought deleted, but no user with this id!' })
                    : res.json({ message: 'Thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    //POST to create a reaction stored in a single thought's reactions array field
    createReaction(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((reaction) =>
                !reaction
                    ? res.status(404).json({ message: 'No reaction with this id!' })
                    : res.json(reaction)
            )
            .catch((err) => res.status(500).json(err));
    },
    //DELETE to pull and remove a reaction by the reaction's reactionId value
    removeReaction(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionsId: req.params.reactionId } } }, //may be wrong
            { runValidators: true, new: true }
        )
            .then((reaction) =>
                !reaction
                    ? res.status(404).json({ message: 'No reaction with this id!' })
                    : res.json(reaction)
            )
            .catch((err) => res.status(500).json(err));
    }
};