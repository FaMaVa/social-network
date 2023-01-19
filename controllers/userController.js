const { User, Thought } = require('../models');

module.exports = {
  //GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //GET a single user by its _id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: 'thoughts', select: '-__v' }) //may be wrong
      .populate({ path: 'friends', select: '-__v' }) //may be wrong
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //PUT to update a user by its _id
  updateUser(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User find with that ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE to remove user by its _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User successfully deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  //POST to add a new friend to a user's friend list
  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .populate({ path: 'friends', select: ('-__v') })
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: 'No video with this id!' })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE to remove a friend from a user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }, //may be wrong
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: 'No user with thais id' })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },
};