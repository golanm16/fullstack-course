import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {
  saveWorker,
  deleteWorker,
  getAllWorkers,
  getWorker,
  updateWorker,
} from "./dbAccess/funcs.js";
import { checkAction, checkId, checkTime } from "../server/checkFuncs.js";
import { PUNCH_IN, PUNCH_OUT, PORT, URL } from "../constants.js";

const app = express();
const SALARY = 12000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// const workers = [];

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
};

const getWorkerHours = (shifts) => {
  return shifts
    .map((v) => getHoursDiff(v.start, v.end))
    .reduce((prev, curr) => prev + curr);
};

app.get("/punchtime/:id/:action/:time?", async (req, res) => {
  // get and check params
  const action = req.params.action;
  const id = req.params.id;
  const time = Number(req.params.time ?? new Date());

  if (!checkAction(action)) {
    res
      .status(400)
      .send(
        JSON.stringify(
          `invalid action '${action}' recieved. must be: '${PUNCH_IN}' or '${PUNCH_OUT}'`
        )
      );
  }
  if (!checkTime(time)) {
    res
      .status(400)
      .send(JSON.stringify(`invalid time format recieved. must be a number`));
  }
  const punchDate = new Date(time);

  // log worker action
  console.log(
    `worker ${id} punching ${action} at ${punchDate.toLocaleString()}`
  );
  let msg = "";
  let worker = await getWorker(id);
  let isNewWorker = false;
  console.log(worker);
  // handle worker not found
  if (!worker) {
    isNewWorker = true;
    worker = new Worker();
  }
  console.log(worker);

  // handle worker punched in
  if (action === PUNCH_IN) {
    // worker has active shift currently

    //TODO: make it possible to override and start new
    if (worker.shifts[worker.currShiftIndex]) {
      res
        .status(500)
        .send(JSON.stringify("shift was already started previously"));
      return;
    }
    worker.currShift = { start: time };
    worker.shifts.push(worker.currShift);
    msg = `shift started at ${punchDate.toLocaleTimeString()}`;
  }

  // handle worker punched in
  if (action === PUNCH_OUT) {
    // shift hasn't started yet
    if (!worker.shifts[worker.currShiftIndex]) {
      res.status(500).send(JSON.stringify("must punch in first"));
      return;
    }
    worker.shifts[worker.currShiftIndex] = {
      ...worker.shifts[worker.currShiftIndex],
      end: time,
    };
    worker.currShiftIndex++;

    msg = `your shift was ${getHoursDiff(
      worker.currShift.start,
      time
    )} hours long`;
  }

  isNewWorker ? saveWorker(worker) : updateWorker(worker);

  res.send(JSON.stringify(worker));
});

// get all workers
app.get("/workers", async (req, res) => {
  res.send(JSON.stringify(await getAllWorkers()));
});

// get all worker's hours worked
app.get("/hours/:id?", async (req, res) => {
  const id = req.params.id;
  console.log(`getting hours for worker ${id}`);
  // if no worker chosen->send all workers hours
  if (!id) {
    const workers = await getAllWorkers();
    res.send(
      JSON.stringify(
        workers.some((w) => w.shifts)
          ? workers
              .map((w) => getWorkerHours(w.shifts))
              .reduce((prev, next) => prev + next)
          : "no work hours detected at all"
      )
    );
    return;
  }
  const worker = await getWorker(id);
  if (!worker) {
    res.status(500).send(JSON.stringify(`worker id ${id} not found`));
    return;
  }
  if (worker.shifts.length > 0) {
    const hours = getWorkerHours(worker.shifts);
    console.log(hours);
    res.send(JSON.stringify(hours));
  } else {
    res.send(JSON.stringify(`worker ${id} have no hours worked`));
  }
});

app.get("/shifts/:id?", async (req, res) => {
  const id = req.params.id;
  const status = 200;
  const msg = "";

  console.log(`getting shifts for worker ${id}`);
  // no worker was chosen
  if (!id) {
    const workers = await getAllWorkers();
    res.send(JSON.stringify(workers.map((w) => w.shifts)));
    return;
  }

  const worker = await getWorker(id);
  // worker with given id wasn't found
  if (!worker) {
    res.status(500).send(JSON.stringify(`worker id ${id} not found`));
    return;
  }
  res.send(JSON.stringify(worker.shifts));
});

app.get("/salary/:id?", async (req, res) => {
  const id = req.params.id;
  console.log(`getting salary for worker ${id}`);
  if (!id) {
    const workers = await getAllWorkers();
    res.send(
      JSON.stringify(
        workers.some((w) => w.shifts)
          ? workers
              .map((w) => getSalary(w.shifts) * w.salary)
              .reduce((prev, next) => prev + next) + " ₪."
          : `no workers shifts found`
      )
    );
    return;
  }
  const worker = await getWorker(id);
  if (!worker) {
    res.status(500).send(JSON.stringify(`worker id ${id} not found`));
    return;
  }
  if (worker.shifts.length > 0) {
    res.send(
      JSON.stringify(
        `your salary is: ${getWorkerHours(worker.shifts) * worker.salary} ₪.`
      )
    );
  } else {
    res.send(JSON.stringify("no hours worked"));
  }
});

app.all("*", (req, res) => {
  res.status(404).send("<h1> 404 Not Found :(</h1>");
});

app.listen(PORT, () => {
  console.log(`work hours server listening at port ${PORT}`);
});
