const mongoose = require("mongoose");
const express = require("express");
const ObjectId = require("mongodb").ObjectID;
const { User } = require("../models/user");
const { Task } = require("../models/task");
const { Project } = require("../models/project");
const { Sprint, validate } = require("../models/sprint");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/* GET all sprints (sorted by name) */
router.get("/", auth, async (req, res) => {
    const sprints = await Sprint.find().sort("name");
    res.send(sprints);
});

/* POST sprint (new one) */
router.post("/", [auth, admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.createdBy);
    if (!user) return res.status(400).send("Invalid user.");

    let tasks = [];

    for (let i = 0; i < req.body.subtasks.length; i++) {
        let task = await Task.findById(req.body.subtasks[i]);
        if (task) {
            task = {
                _id: task._id,
                name: task.name,
                status: task.status,
                priority: task.priority,
                assignedTo: {
                    _id: task.assignedTo._id,
                    name: task.assignedTo.name
                }
            };
            tasks.push(task);
        } else {
            return res.status(400).send("Invalid task.");
        }
    }

    const sprint = new Sprint({
        name: req.body.name,
        createDate: req.body.createDate,
        createdBy: { _id: user._id, name: user.name },
        isClosed: req.body.isClosed,
        subtasks: tasks
    });
    await sprint.save();

    res.send(sprint);
});

/* PUT sprints (replace existing one with new one) */
router.put("/:id", [auth, admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let tasks = [];
    for (let i = 0; i < req.body.subtasks.length; i++) {
        let task = await Task.findById(req.body.subtasks[i]);
        if (task) {
            task = {
                _id: task._id,
                name: task.name,
                status: task.status,
                priority: task.priority,
                assignedTo:task.assignedTo
            };
            tasks.push(task);
        } else {
            return res.status(400).send("Invalid task.");
        }
    }

    const sprint = await Sprint.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            isClosed: req.body.isClosed,
            subtasks: tasks
        },
        {
            new: true
        }
    );
    if (!sprint) return res.status(404).send("Invalid sprint.");


    await Project.updateMany(
        { "sprints._id": sprint._id },
        {
            $set: {
                "sprints.$.name": req.body.name,
                "sprints.$.isClosed": req.body.isClosed
            }
        },
        { new: true }
    );

    res.send(sprint);
});

/* DELETE sprint */
router.delete("/:id", [auth, admin], async (req, res) => {
    const sprint = await Sprint.findByIdAndRemove(req.params.id);
    if (!sprint) return res.status(400).send("Invalid sprint.");

    const projects = await Project.find({
        "sprints._id": ObjectId(sprint.id)
    });

    if (projects) {
        for (let i = 0; i < projects.length; i++) {
            await Project.findByIdAndUpdate(
                projects[i].id,
                {
                    $pull: {
                        sprints: {
                            _id: sprint._id
                        }
                    }
                },
                { new: true }
            );
        }
    }
    res.send(sprint);
});

/* GET one sprint (by id) */
router.get("/:id", auth, async (req, res) => {
    const sprint = await Sprint.findById(req.params.id);

    if (!sprint) return res.status(404).send("Invalid sprint.");

    res.send(sprint);
});

module.exports = router;
