import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("Database Connected");
        });

        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }

        await mongoose.connect(uri, {
            dbName: 'car-rental',
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

export default connectDB;