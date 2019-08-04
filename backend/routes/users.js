const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const ObjectId = require("mongodb").ObjectID;
const config = require("config");
const sgMail = require("@sendgrid/mail");
const { User, validate } = require("../models/user");
const { Task } = require("../models/task");
const { Sprint } = require("../models/sprint");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/* GET all users (sorted by name) */
router.get("/", [auth], async (req, res) => {
    const users = await User.find()
        .sort("name")
        .select("-password");
    res.send(users);
});

/* POST user (new one) */
router.post("/", [auth, admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send("User already registred on this email.");

    if (!req.body.password)
        return res.status(400).send("You have to pass a password.");
    user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    sgMail.setApiKey(config.get("sendgridApiKey"));
    const msg = {
        to: req.body.email,
        from: "markiewicz.julian@gmail.com",
        subject: "Welcome in PMT",
        html:
            "<p>Hello</p>" +
            "<p>We proudly welcome You in PMT. Your account is ready to use, " +
            "all You have to do is to log in with the password <b>" +
            req.body.password + "</b>. Later, do not forget about changing the " +
            "password for safety reasons.</p> <p> All the best<br>" +
            "Julian Markiewicz and PMT team</p>"
    };
    sgMail.send(msg);

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(
        _.pick(user, ["_id", "name", "email", "createDate", "isAdmin"])
    );
});

/* PUT user (replace existing one with new one) */
router.put("/:id", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findById(req.params.id);
    let userEmail = await User.findOne({ email: req.body.email });
    if (userEmail && user.email != userEmail.email)
        return res.status(400).send("User already registred on this email.");

    let password = user.password;
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(req.body.password, salt);
    }

    user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            password: password,
            isAdmin: req.body.isAdmin
        },
        {
            new: true
        }
    ).select("-password");

    if (!user)
        return res
            .status(404)
            .send("The user with the given ID was not found.");

    const tasks = await Task.find({
        "assignedTo._id": ObjectId(user.id)
    });

    if (tasks) {
        for (let i = 0; i < tasks.length; i++) {
            await Task.findByIdAndUpdate(
                tasks[i].id,
                {
                    $set: {
                        assignedTo: {
                            _id: user._id,
                            name: user.name
                        }
                    }
                },
                { new: true }
            );
        }
    }

    await Sprint.updateMany(
        { "subtasks.assignedTo._id": user._id },
        {
            $set: {
                "subtasks.$.assignedTo.name": user.name
            }
        },
        { new: true }
    );

    res.send(user);
});

/* DELETE user */
router.delete("/:id", [auth, admin], async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id).select(
        "-password"
    );
    if (!user) return res.status(404).send("Invalid user.");

    const tasks = await Task.find({
        "assignedTo._id": ObjectId(user.id)
    });

    if (tasks) {
        for (let i = 0; i < tasks.length; i++) {
            await Task.findByIdAndUpdate(
                tasks[i].id,
                {
                    $unset: {
                        assignedTo: {
                            _id: user._id
                        }
                    }
                },
                { new: true }
            );
        }
    }

    await Sprint.updateMany(
        { "subtasks.assignedTo._id": user._id },
        {
            $unset: {
                "subtasks.$.assignedTo": user._id
            }
        },
        { new: true }
    );

    res.send(user);
});

/* GET one user (by id) */
router.get("/:id", auth, async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user)
        return res
            .status(404)
            .send("The user with the given ID was not found.");

    res.send(user);
});

module.exports = router;
