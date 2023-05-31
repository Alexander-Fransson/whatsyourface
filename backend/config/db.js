const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = process.env.DB || 'mongodb+srv://Alex:1337leet@cluster0.t92dhox.mongodb.net/?retryWrites=true&w=majority'; 
        const conn = await mongoose.connect(db);
        console.log('Connected to db');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;