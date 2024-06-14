const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

authRouter.post("/signup", async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username.toLowerCase() });
        if (existingUser) {
            res.status(403);
            throw new Error("That username is already taken");
        }

        const newUser = new User(req.body);
        const savedUser = await newUser.save();

        
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET);

        res.status(201).send({ token, user: savedUser.withoutPassword() });
    } catch (error) {
        console.error(error);
        res.status(500);
        next(error);
    }
});

authRouter.post("/login", async (req, res, next) => {
    try {
        const foundUser = await User.findOne({username: req.body.username})
        if (!foundUser) {
            res.status(403)
            return next(new Error("Username was not found."))
        }

        foundUser.checkPassword(req.body.password, (error, isMatch) => {
            if (error) {
                res.status(403)
                return next(error)
            }
            if (!isMatch) {
                res.status(403)
                return next(new Error("Username/Password is incorrect."))
            }

            const token = jwt.sign(foundUser.withoutPassword(), process.env.SECRET);
            return res.status(200).send({user: foundUser.withoutPassword(), token})
        })

    } catch (error) {
        console.error(error);
        res.status(500);
        next(error);
    }
})

authRouter.get("/users", async (req, res, next) => {
    try {
       const allUsers = await User.find()
       res.status(200).send(allUsers)
    } catch (error) {
        console.error(error);
        res.status(500);
        next(error);
    }
})

module.exports = authRouter