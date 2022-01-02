const key = require("./secret").MongoKey;
const user = require("./secret").MongoUser;
const mongoUrl = `mongodb+srv://${user}:${key}@cluster0.eeeyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const mongoose = require("mongoose");

console.log(mongoUrl);

async function conn() {
    try {
        const connection = await mongoose.connect(
            mongoUrl
        )
        const Cat = connection.model("cat", { catName: String });
        const kitty = new Cat({ catName: "zelda the 3rd" });
        kitty
            .save()
            .then(() => connection.disconnect())
            .then(console.log("MMMM"));
    }
    catch (e) {
        console.log(e);
    }

}

conn();

