import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, default: "yosi", maxlength: 30, lowercase: true },
  age: { type: Number, max: 120, min: 0, required: true },
  date: Date,
  test: { type: mongoose.SchemaTypes.ObjectId, ref: "test" },
});

const StudentModel = mongoose.model("Student", studentSchema);

export { studentSchema };
