import { MongoKey, MongoUser } from "./secret.js";
const mongoUrl = `mongodb+srv://${MongoUser}:${MongoKey}@cluster0.eeeyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

import mongoose from "mongoose";

console.log(mongoUrl);

const getConnection = async () => {
  try {
    return await mongoose.connect(mongoUrl);
  } catch (e) {
    console.log(e);
  }
};
const Cat = mongoose.model("cat", { catName: String });

async function saveCat() {
  try {
    const connection = await getConnection();
    const cat = { catName: "cat from outer model" };
    const kitty = new Cat(cat);
    const some = await kitty.save();
    console.log(some);
    const dis = await connection.disconnect();
    console.log(dis);
  } catch (e) {
    console.log(e);
  }
}

async function find() {
  try {
    const connection = await getConnection();
    const cat = await Cat.find({ catName: "zelda the 4th" });
    console.log(cat);
    const dis = await connection.disconnect();
    console.log(dis);
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

saveCat();
