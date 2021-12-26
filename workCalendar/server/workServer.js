const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 1521;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

import * as constants from '../constants.js';

app.get('/punchtime/:action/:time', (req, res) => {
    const action = req.params.action;
    const time = req.params.time;

})