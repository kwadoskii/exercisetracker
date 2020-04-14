const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    console.log(username);
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json("User added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => res.status(200).json(`User ${user.username} was deleted.`))
        .catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id, 'username') //using projection
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
});

router.route('/update/:id').patch((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username

            user.save()
                .then(() => res.status(200).json('User saved!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;