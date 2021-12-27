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

const workers = [];

const generatedIds = [];

function randNum(a, b) {
    return a + Math.floor(Math.random() * b);
}

function generateId() {
    const minSn = 100000000;
    const maxSn = 999999999;
    let snExists = false;
    let randSn;
    do {
        randSn = Math.floor(randNum(minSn, maxSn));
        snExists = generatedIds.includes(randSn);
    } while (snExists);
    generatedIds.push(randSn);
    return randSn;
}

class Worker {
    constructor() {
        this.id = generateId();
        this.shifts = [];
        this.currShift = null;
        this.currShiftIndex = 0;
        this.salary = SALARY;
    }
}

const getHoursDiff = (startTime, endTime) => {
    return Math.abs((new Date(endTime) - new Date(startTime)) / 36e5);
}

const getWorkerHours = (shifts) => {
    shifts.map(v => getHoursDiff(v.start, v.end)).reduce((prev, curr) => prev + curr)
}

app.get('/punchtime/:id/:action/:time?', (req, res) => {
    console.log(`got punch time ${req.params.time}`);
    const action = req.params.action;
    const id = Number(req.params.id);
    const time = Number(req.params.time ?? new Date());
    const punchDate = new Date(time);
    let msg = '';
    let worker = workers.find(w => w.id === id);
    if (!worker) {
        worker = new Worker();
        workers.push(worker);
    }
    if (action === PUNCH_IN) {
        if (worker.shifts[worker.currShiftIndex]) {
            res.status(500)
                .send(JSON.stringify('shift was already started previously'));
            console.log('tried punch in when already is');
            return;
        }
        worker.currShift = { start: time };
        worker.shifts.push(worker.currShift);
        console.log(`worker ${worker.id} punched in at ${punchDate.toLocaleString()}`);
        msg = `shift started at ${punchDate.toLocaleTimeString()}`;
    }
    if (action === PUNCH_OUT) {
        if (!worker.shifts[worker.currShiftIndex]) {
            res.status(500)
                .send(JSON.stringify('must punch in first'));
            console.log('tried punch out when not punched in');
            return;
        }
        worker.shifts[worker.currShiftIndex] = { ...worker.shifts[worker.currShiftIndex], end: time };
        worker.currShiftIndex++;
        console.log(`worker ${worker.id} punched out at ${punchDate.toLocaleString()}`);

        msg = `your shift was ${getHoursDiff(worker.currShift.start, time)} hours long`;
    }
    res.send(JSON.stringify(worker));
})

app.get('/workers', (req, res) => {
    res.send(JSON.stringify(workers));
})
app.get('/shifts', (req, res) => {
    res.send(JSON.stringify(worker.shifts));
})
app.get('/shifts/hours', (req, res) => {
    const worker = workers.find(w => w.id === id);
    if (worker.shifts.length > 0) {
        res.send(JSON.stringify(getWorkerHours(worker.shifts)));
    }
    else {
        res.send(JSON.stringify('no hours worked'));
    }
})

app.all("*", (req, res) => {
    res.status(404).send("<h1> sorry :(</h1>");
})

app.get('/shifts/salary', (req, res) => {
    const worker = workers.find(w => w.id === id);
    if (worker.shifts.length > 0) {
        res.send(JSON.stringify(
            `your salary is: ${getWorkerHours(worker.shifts) * worker.salary} ₪.`
        ));
    }
    else {
        res.send(JSON.stringify('no hours worked'));
    }
})



app.listen(port, () => {
    console.log(`work hours server listening at port ${port}`);
})