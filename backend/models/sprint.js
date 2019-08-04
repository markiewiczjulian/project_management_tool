const Joi = require("joi");
const mongoose = require("mongoose");

const Sprint = mongoose.model(
    "Sprint",
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
        subtasks: [
            {
                type: new mongoose.Schema({
                    name: {
                        type: String,
                        minlength: 5,
                        maxlength: 255
                    },
                    status: {
                        type: String,
                        enum: [
                            "none",
                            "to do",
                            "in progress",
                            "in review",
                            "done"
                        ],
                        trim: true
                    },
                    priority: {
                        type: String,
                        enum: ["low", "medium", "high", "highest"],
                        trim: true
                    },
                    assignedTo: {
                        type: new mongoose.Schema({
                            name: {
                                type: String,
                                trim: true,
                                minlength: 3,
                                maxlength: 50
                            }
                        })
                    }
                })
            }
        ]
    })
);

function validateSprint(sprint) {
    const schema = {
        name: Joi.string()
            .min(5)
            .max(255)
            .required(),
        createdBy: Joi.objectId(),
        subtasks: Joi.array().items(Joi.objectId()),
        isClosed: Joi.boolean()
    };

    return Joi.validate(sprint, schema);
}

function validateSprintTasks(sprint) {
    const schema = {
        sprint: Joi.objectId(),
        task: Joi.objectId()
    };

    return Joi.validate(sprint, schema);
}

exports.Sprint = Sprint;
exports.validate = validateSprint;
exports.validateTasks = validateSprintTasks;
