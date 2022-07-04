const express = require("express");
const router = require("../config/routes");

const app = express();

/** Install JSON request parser */
app.use(express.json());

/** Install Router */
app.use(router);

module.exports = app;
