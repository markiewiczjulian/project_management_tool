const mongoose = require("mongoose");
const express = require("express");
const { User } = require("../models/user");
const { Sprint } = require("../models/sprint");
const { Project, validate } = require("../models/project");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/* GET all projects (sorted by name) */
router.get("/", auth, async (req, res) => {
    const projects = await Project.find().sort("name");
    res.send(projects);
});

/* POST project (new one) */
router.post("/", [auth, admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.createdBy);
    if (!user) return res.status(400).send("Invalid user");

    let sprints = [];

    for (let i = 0; i < req.body.sprints.length; i++) {
        let sprint = await Sprint.findById(req.body.sprints[i]);
        if (sprint) {
            sprint = {
                _id: sprint._id,
                name: sprint.name,
                isClosed: sprint.isClosed
            };
            sprints.push(sprint);
        } else {
            return res.status(400).send("Invalid sprint");
        }
    }

    const project = new Project({
        name: req.body.name,
        createDate: req.body.createDate,
        createdBy: { _id: user._id, name: user.name },
        isClosed: req.body.isClosed,
        sprints: sprints
    });
    await project.save();

    res.send(project);
});

/* PUT project (replace existing one with new one) */
router.put("/:id", [auth, admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let sprints = [];

    for (let i = 0; i < req.body.sprints.length; i++) {
        let sprint = await Sprint.findById(req.body.sprints[i]);
        if (sprint) {
            sprint = {
                _id: sprint._id,
                name: sprint.name,
                isClosed: sprint.isClosed
            };
            sprints.push(sprint);
        } else {
            return res.status(400).send("Invalid sprint");
        }
    }

    const project = await Project.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            isClosed: req.body.isClosed,
            sprints: sprints
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

/* DELETE project */
router.delete("/:id", [auth, admin], async (req, res) => {
    const project = await Project.findByIdAndRemove(req.params.id);

    if (!project)
        return res
            .status(404)
            .send("The project with the given ID was not found.");

    res.send(project);
});

/* GET one project (by id) */
router.get("/:id", auth, async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project)
        return res
            .status(404)
            .send("The project with the given ID was not found.");

    res.send(project);
});

module.exports = router;
