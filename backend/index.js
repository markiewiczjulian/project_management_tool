const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const cors = require("cors");

const projects = require("./routes/projects");
const sprints = require("./routes/sprints");
const users = require("./routes/users");
const tasks = require("./routes/tasks");
const sprints_task = require("./routes/sprints_task");
const projects_sprint = require("./routes/projects_sprint");
const auth = require("./routes/auth");

mongoose
    .connect("mongodb://localhost/pmt", { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB..."));

mongoose.set("useFindAndModify", false);

app.use(cors());
app.use(express.json());
app.use("/api/projects", projects);
app.use("/api/sprints", sprints);
app.use("/api/users", users);
app.use("/api/tasks", tasks);
app.use("/api/sprints/task", sprints_task);
app.use("/api/projects/sprint", projects_sprint);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
