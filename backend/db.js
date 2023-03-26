const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("connected to mongo successfully")
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectToMongo;