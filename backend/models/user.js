const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 15,
        maxlength: 250
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /\S+@\S+\.\S+/
    },
    createDate: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        config.get("jwtPrivateKey")
    );
    return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        password: Joi.string()
            .min(15)
            .max(250),
        email: Joi.string()
            .email()
            .required(),
        isAdmin: Joi.boolean()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
