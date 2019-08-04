const mongoose = require("mongoose");
const express = require("express");
const ObjectId = require("mongodb").ObjectID;
const { User } = require("../models/user");
const { Sprint } = require("../models/sprint");
const { Task, validate } = require("../models/task");
const router = express.Router();
const auth = require("../middleware/auth");

/* GET all tasks (sorted by name) */
router.get("/", auth, async (req, res) => {
    const tasks = await Task.find().sort("name");
    res.send(tasks);
});

/* POST task (new one) */
router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userCreated = await User.findById(req.body.createdBy);
    if (!userCreated) return res.status(400).send("Invalid user");

    let userAssigned = {};
    if (req.body.assignedTo) {
        const user = await User.findById(req.body.assignedTo);
        if (!user) return res.status(400).send("Invalid user");
        userAssigned = { _id: user._id, name: user.name };
    } else {
        userAssigned = req.body.assignedTo;
    }

    const task = new Task({
        name: req.body.name,
        createDate: req.body.createDate,
        createdBy: { _id: userCreated._id, name: userCreated.name },
        assignedTo: userAssigned,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority
    });
    await task.save();

    res.send(task);
});

/* PUT task (replace existing one with new one) */
router.put("/:id", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let userAssigned = {};
    if (req.body.assignedTo) {
        const user = await User.findById(req.body.assignedTo);
        if (!user) return res.status(400).send("Invalid user");
        userAssigned = { _id: user._id, name: user.name };
    } else {
        userAssigned = req.body.assignedTo;
    }

    const userModified = await User.findById(req.body.modifiedBy);
    if (!userModified) return res.status(400).send("Invalid user");

    const task = await Task.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            assignedTo: userAssigned,
            modificationDate: Date.now(),
            modifiedBy: { _id: userModified._id, name: userModified.name },
            description: req.body.description,
            status: req.body.status,
            priority: req.body.priority
        },
        {
            new: true
        }
    );

    if (!task) return res.status(404).send("Invalid task.");

    await Sprint.updateMany(
        { "subtasks._id": task._id },
        {
            $set: {
                "subtasks.$.name": req.body.name,
                "subtasks.$.status": req.body.status,
                "subtasks.$.priority": req.body.priority,
                "subtasks.$.assignedTo": userAssigned
            }
        },
        { new: true }
    );

    res.send(task);
});

/* DELETE task */
router.delete("/:id", auth, async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) return res.status(404).send("Invalid task.");

    const sprints = await Sprint.find({
        "subtasks._id": ObjectId(task.id)
    });

    if (sprints) {
        for (let i = 0; i < sprints.length; i++) {
            await Sprint.findByIdAndUpdate(
                sprints[i].id,
                {
                    $pull: {
                        subtasks: {
                            _id: task._id
                        }
                    }
                },
                { new: true }
            );
        }
    }
    res.send(task);
});

/* GET one task (by id) */
router.get("/:id", auth, async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Invalid taks.");

    res.send(task);
});

module.exports = router;
