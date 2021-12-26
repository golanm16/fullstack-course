const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 1521;
const PUNCH_IN = 'IN';
const PUNCH_OUT = 'OUT';
const SALARY = 12000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const shifts = [];
let currShift = null;
let currShiftIndex = 0;

// const constants = require('../constants.js');

const getHoursDiff = (startTime, endTime) => {
    return Math.abs((new Date(endTime) - new Date(startTime)) / 36e5);
}

app.get('/punchtime/:action/:time?', (req, res) => {
    console.log(`got punch time ${req.params.time}`);
    const action = req.params.action;
    const time = Number(req.params.time ?? new Date());
    const punchDate = new Date(time);
    let msg = '';
    if (action === PUNCH_IN) {
        if (shifts[currShiftIndex]) {
            res.status(500)
                .send(JSON.stringify('shift was already started previously'));
            console.log('tried punch in when already is');
            return;
        }
        currShift = { start: time - 100000 };
        shifts.push(currShift);
        msg = `shift started at ${punchDate.toLocaleTimeString()}`;
    }
    if (action === PUNCH_OUT) {
        if (!shifts[currShiftIndex]) {
            res.status(500)
                .send(JSON.stringify('must punch in first'));
            console.log('tried punch out when not punched in');
            return;
        }
        shifts[currShiftIndex] = { ...shifts[currShiftIndex], end: time + 100000 };
        currShiftIndex++;
        msg = `your shift was ${getHoursDiff(currShift.start, time)} hours long`;
    }
    res.send(JSON.stringify(msg));
})

app.get('/shifts', (req, res) => {
    res.send(JSON.stringify(shifts));
})

app.get('/shifts/hours', (req, res) => {
    if (shifts.length > 0) {
        res.send(JSON.stringify(
            shifts.map(v => getHoursDiff(v.start, v.end)).reduce((prev, curr) => prev + curr)
        ));
    }
    else {
        res.send(JSON.stringify('no hours worked'));
    }
})

app.all("*", (req, res) => {
    res.status(404).send("<h1> sorry :(</h1>");
})

app.get('/shifts/salary', (req, res) => {
    if (shifts.length > 0) {
        res.send(JSON.stringify(`your salary is: ${shifts.map(v => getHoursDiff(v.start, v.end)).reduce((prev, curr) => prev + curr) * SALARY
            } ₪.`
        ));
    }
    else {
        res.send(JSON.stringify('no hours worked'));
    }
})



app.listen(port, () => {
    console.log(`work hours server listening at port ${port}`);
})