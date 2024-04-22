
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require('./middleware/errorHandler')
const signupRouter = require('./routes/signup')
const blogRouter = require('./routes/blog')

const app = express();

//parse information from request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/signup", signupRouter);
app.use("/api/blog", blogRouter);

// use error handler middleware
app.use(errorHandler);

module.exports = app;
