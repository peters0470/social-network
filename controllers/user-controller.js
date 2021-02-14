const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id}) 
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createUser( {body }, res) {
        console.log( body)
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id },  body, { new: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No user with this id!'
                    })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id   })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({  message: 'no user found with this id'  });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    
    addToFriendList({  params }, res) {
        User.findOneAndUpdate(
            {  _id: params.userId  },
            { $push: { friends: params.friendId }}, 
            { new: true }
            )

            .then(dbUserData => {
                if (!dbUserData) {res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    },

    removefromFriendList({ params }, res) {
        User.findOneAndDelete({  _id: params.userId })
            .then(deletedFriend => {
                if (!deletedFriend) {
                    return res.status(404).json({ message: 'No friend with this id!'  });
                }
                return User.findOneAndUpdate(
                    { friends: params.friendId }, 
                    { $pull: { friends: { friendId: params.friendId }}}, 
                    { new: true,  runValidators: true}
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'  });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },    

};


    module.exports = userController