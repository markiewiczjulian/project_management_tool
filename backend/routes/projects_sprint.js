const mongoose = require("mongoose");
const express = require("express");
const { Sprint } = require("../models/sprint");
const { Project, validateSprints } = require("../models/project");
const router = express.Router();
const auth = require("../middleware/auth");

/* POST sprint into project (add new one) */
router.post("/", auth, async (req, res) => {
    const { error } = validateSprints(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const sprint = await Sprint.findById(req.body.sprint);
    if (!sprint) return res.status(400).send("Invalid sprint.");

    const project = await Project.findByIdAndUpdate(
        req.body.project,
        {
            $addToSet: {
                sprints: {
                    _id: sprint._id,
                    name: sprint.name,
                    isClosed: sprint.isClosed
                }
            }
        },
        {
            new: true
        }
    );

    if (!project)
        return res
            .status(404)
            .send("The project with the given ID was not found.");

    res.send(project);
});

/* PATCH sprint in project (remove one from a list) */
router.patch("/", auth, async (req, res) => {
    const { error } = validateSprints(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const sprint = await Sprint.findById(req.body.sprint);
    if (!sprint) return res.status(400).send("Invalid sprint");

    const project = await Project.findByIdAndUpdate(
        req.body.project,
        {
            $pull: {
                sprints: {
                    _id: sprint._id
                }
            }
        },
        { new: true }
    );

    if (!project)
        return res
            .status(404)
            .send("The project with the given ID was not found.");

    res.send(project);
});

module.exports = router;
