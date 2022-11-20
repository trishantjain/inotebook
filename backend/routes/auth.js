const express = require('express');
const User = require('../models/User');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// Sercet key for authorization token
const JWT_SECRET = "trishantkaiseho@88"

// Creating a user using POST '/api/auth/createuser'
router.post('/createuser', [
    body('email', 'Enter a valid Name').isEmail(),
    body('name', 'Enter a valid email').isLength({ min: 6 }),
    body('password', 'set password of atleast 6 character').isLength({ min: 2 })

], async (req, res) => {

    // If there are errors return bad requests and error messages
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry! User with email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        // Checking authorized token
        const data = {
            user: {
                id: user.id
            }
        }

        // Signing authorization token
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken });

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }

})


// Authoticate a user using POST '/api/auth/login'
router.post('/login', [
    body('email', 'Enter a valid email').isLength({ min: 6 }),
    body('password', 'Password cannot be blank').exists({ min: 6 }),
], async (req, res) => {

    // If there are errors return bad requests and error messages
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "please try to login with correct credentials" });
        }

        // Checking authorized token
        const data = {
            user: {
                id: user.id
            }
        }

        // Signing authorization token
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken });

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server error occured")
    }
})


// Getting details of loggedIn user using POST '/api/auth/getuser'

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server error occured")
    }
})

module.exports = router
