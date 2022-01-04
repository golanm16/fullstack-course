import { MongoKey, MongoUser } from './secret.js'
const mongoUrl = `mongodb+srv://${MongoUser}:${MongoKey}@cluster0.eeeyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
