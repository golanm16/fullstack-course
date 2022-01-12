import { studentSchema } from "./models/Student.js";
import { testSchema } from "./models/Test.js";
import { MongoKey, MongoUser } from "./secret.js";
import mongoose from "mongoose";

const mongoUrl = `mongodb+srv://${MongoUser}:${MongoKey}@cluster0.eeeyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const getConnection = async () => {
  try {
    return await mongoose.connect(mongoUrl);
  } catch (e) {
    console.log(e);
  }
};

async function saveStudent() {
  try {
    const connection = await getConnection();
    const StudentModel = connection.model("Student", studentSchema);
    const student = new StudentModel({
      name: "bobi",
      age: 32,
      test: "61db2ffa65e6c4de40b455b8",
    });
    await student.save();

    const dis = await connection.disconnect();
  } catch (e) {
    console.log(e);
  }
}

async function saveTest() {
  try {
    const connection = await getConnection();
    const TestModel = connection.model("Test", testSchema);
    const test = new TestModel({ score: 85, category: "english" });
    await test.save();

    const dis = await connection.disconnect();
  } catch (e) {
    console.log(e);
  }
}

async function find() {
  try {
    const connection = await getConnection();
    const StudentModel = connection.model("Student", studentSchema);

    const students = await StudentModel.find({ name: "bobi" });
    console.log(students);
    const dis = await connection.disconnect();
  } catch (e) {
    console.log(e);
  }
}
async function findOneAndUpdate() {
  try {
    const connection = await getConnection();
    const beforeUpdate = await Cat.findOneAndUpdate(
      { catName: "zelda" },
      { catName: "zelda the 1st" }
    );
    console.log(beforeUpdate);
    const dis = await connection.disconnect();
    console.log(dis);
  } catch (e) {
    console.log(e);
  }
}

find();
