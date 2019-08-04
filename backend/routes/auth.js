const Joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const router = express.Router();

/* POST auth (verify if email and password is correct, return token) */
router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword)
        return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();

    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string()
            .email()
            .min(5)
            .max(255)
            .required(),
        password: Joi.string()
            .min(10)
            .max(255)
            .required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;
