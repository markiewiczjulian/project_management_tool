const Joi = require("joi");
const mongoose = require("mongoose");

const Project = mongoose.model(
    "Project",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
        },
        createDate: { type: Date, default: Date.now },
        createdBy: {
            type: new mongoose.Schema({
                name: {
                    type: String,
                    required: true,
                    trim: true,
                    minlength: 3,
                    maxlength: 50
                }
            }),
            required: true
        },
        isClosed: { type: Boolean, default: false },
        sprints: [
            {
                type: new mongoose.Schema({
                    name: {
                        type: String,
                        minlength: 5,
                        maxlength: 255
                    },
                    isClosed: { type: Boolean, default: false }
                })
            }
        ]
    })
);

function validateProject(project) {
    const schema = {
        name: Joi.string()
            .min(5)
            .max(255)
            .required(),
        createdBy: Joi.objectId(),
        isClosed: Joi.boolean(),
        sprints: Joi.array().items(Joi.objectId())
    };

    return Joi.validate(project, schema);
}

function validateProjectSprints(project) {
    const schema = {
        project: Joi.objectId(),
        sprint: Joi.objectId()
    };

    return Joi.validate(project, schema);
}

exports.Project = Project;
exports.validate = validateProject;
exports.validateSprints = validateProjectSprints;
