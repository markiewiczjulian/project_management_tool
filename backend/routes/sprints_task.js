const mongoose = require("mongoose");
const express = require("express");
const { Task } = require("../models/task");
const { Sprint, validateTasks } = require("../models/sprint");
const router = express.Router();
const auth = require("../middleware/auth");

/* POST task into sprint (add new one) */
router.post("/", auth, async (req, res) => {
    const { error } = validateTasks(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task = await Task.findById(req.body.task);
    if (!task) return res.status(400).send("Invalid task");

    const sprint = await Sprint.findByIdAndUpdate(
        req.body.sprint,
        {
            $addToSet: {
                subtasks: {
                    _id: task._id,
                    name: task.name,
                    status: task.status,
                    priority: task.priority,
                    assignedTo: task.assignedTo
                }
            }
        },
        {
            new: true
        }
    );

    if (!sprint)
        return res
            .status(404)
            .send("The sprint with the given ID was not found.");

    res.send(sprint);
});

/* PATCH task in sprint (remove one from a list) */
router.patch("/", auth, async (req, res) => {
    const { error } = validateTasks(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task = await Task.findById(req.body.task);
    if (!task) return res.status(400).send("Invalid task");

    const sprint = await Sprint.findByIdAndUpdate(
        req.body.sprint,
        {
            $pull: {
                subtasks: {
                    _id: task._id
                }
            }
        },
        { new: true }
    );

    if (!sprint)
        return res
            .status(404)
            .send("The sprint with the given ID was not found.");

    res.send(sprint);
});

module.exports = router;
