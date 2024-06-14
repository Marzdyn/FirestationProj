const express = require('express')
const callRouter = express.Router()
const Call = require('../models/call.js')

callRouter.get("/", async (req, res, next) => {
    try {
        const allCalls = await Call.find()
        res.status(200).send(allCalls)
    } catch (error) {
        console.error(error);
        res.status(500);
        next(error);
    }
})

callRouter.post("/", async (req, res, next) => {
    try {
        const newCall = new Call(req.body)
        const savedCall = await newCall.save()
        res.status(201).send(newCall)
    } catch (error) {
        console.error(error);
        res.status(500);
        next(error);
    }
})


module.exports = callRouter