import mongoose from "mongoose";
import { MongoKey, MongoUser } from "./secret.js";
const mongoUrl = `mongodb+srv://${MongoUser}:${MongoKey}@cluster0.eeeyx.mongodb.net/workers?retryWrites=true&w=majority`;

const workerModel = mongoose.model("worker", {
  id: Number,
  shifts: Array,
  currShift: Object,
  currShiftIndex: Number,
  salary: Number,
});

async function saveWorker(worker) {
  try {
    const connection = await mongoose.connect(mongoUrl);
    const dbWorker = new workerModel(worker);
    const saved = await dbWorker.save();
    console.log("worker saved:\n", saved);
    connection.disconnect();
    return saved;
  } catch (e) {
    console.log(e);
  }
}

async function getWorker(id) {
  try {
    const connection = await mongoose.connect(mongoUrl);
    const worker = await workerModel.findOne({ id });
    console.log("worker found:\n", worker);
    connection.disconnect();
    return worker;
  } catch (e) {
    console.log(e);
  }
}

async function updateWorker(worker) {
  try {
    const connection = await mongoose.connect(mongoUrl);
    const oldWorker = await workerModel.findOneAndUpdate(
      { id: worker.id },
      worker
    );
    console.log("worker:\n", oldWorker, "updated to:\n", worker);
    connection.disconnect();
    return worker;
  } catch (e) {
    console.log(e);
  }
}

async function deleteWorker(id) {
  try {
    const connection = await mongoose.connect(mongoUrl);
    const oldWorker = await workerModel.deleteOne({ id });
    console.log("worker:\n", oldWorker, "deleted");
    connection.disconnect();
    return worker;
  } catch (e) {
    console.log(e);
  }
}

async function getAllWorkers() {
  try {
    const connection = await mongoose.connect(mongoUrl);
    const collection = await workerModel.find();
    console.log(collection);
    connection.disconnect();
    return collection;
  } catch (e) {
    console.log(e);
  }
}

// saveWorker({
//   id: 123456,
//   shifts: [{ start: 1, end: 2 }],
//   currShift: { start: 1, end: 2 },
//   currShiftIndex: 1,
//   salary: 1200,
// });

// getWorker(12345);

// updateWorker({
//   id: 1234,
//   shifts: [
//     { start: 1, end: 2 },
//     { start: 3, end: 4 },
//   ],
//   currShift: { start: 3, end: 4 },
//   currShiftIndex: 2,
//   salary: 1200,
// });

// deleteWorker(123456);
export { saveWorker, updateWorker, deleteWorker, getWorker, getAllWorkers };
