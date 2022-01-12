import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  category: String,
  score: Number,
  date: {
    type: Date,
    default: new Date(),
  },
});

const TestModel = mongoose.model("Test", testSchema);

export { testSchema };
