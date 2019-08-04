const Joi = require("joi");
const mongoose = require("mongoose");

const Task = mongoose.model(
    "Task",
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
        assignedTo: {
            type: new mongoose.Schema({
                name: {
                    type: String,
                    trim: true,
                    minlength: 3,
                    maxlength: 50
                }
            })
        },
        modificationDate: { type: Date, default: Date.now },
        modifiedBy: {
            type: new mongoose.Schema({
                name: {
                    type: String,
                    required: true,
                    trim: true,
                    minlength: 3,
                    maxlength: 50
                }
            })
        },
        description: { type: String, minlength: 5, maxlength: 500 },
        status: {
            type: String,
            enum: ["none", "to do", "in progres", "in review", "done"],
            default: "none"
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high", "highest"],
            default: "medium"
        }
    })
);

function validateTask(task) {
    const schema = {
        name: Joi.string()
            .min(5)
            .max(255)
            .required(),
        createdBy: Joi.objectId(),
        assignedTo: Joi.objectId(),
        modifiedBy: Joi.objectId(),
        description: Joi.string()
            .min(5)
            .max(500),
        status: Joi.string().valid(
            "none",
            "to do",
            "in progres",
            "in review",
            "done"
        ),
        priority: Joi.string().valid("low", "medium", "high", "highest")
    };

    return Joi.validate(task, schema);
}

exports.Task = Task;
exports.validate = validateTask;
