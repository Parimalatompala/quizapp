// database/conn.js

import mongoose from 'mongoose';

const connect = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/mydatabase');
        console.log("MongoDB connected:", conn.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);  // Exit the process with failure
    }
};

export default connect;