const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://kaustabh:kaustabh@cluster0.rjnauqm.mongodb.net/inotebook'

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected to MongoDB successfully")
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error.message)
    }
};

module.exports = connectToMongo;