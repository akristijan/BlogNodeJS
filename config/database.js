const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        const conn = await mongoose.connect(process.env.DB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;