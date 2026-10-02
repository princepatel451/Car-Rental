import mongoose from "mongoose";

let isConnecting = false;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (isConnecting) {
        return;
    }

    try {
        isConnecting = true;
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error("MONGODB_URI environment variable is not defined");
            return;
        }

        await mongoose.connect(uri, {
            dbName: 'car-rental',
            serverSelectionTimeoutMS: 8000,
            socketTimeoutMS: 45000,
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);
    } finally {
        isConnecting = false;
    }
};

mongoose.connection.on('connected', () => {
    console.log("Database Connected");
});

mongoose.connection.on('error', (err) => {
    console.error("MongoDB connection error:", err.message);
});

mongoose.connection.on('disconnected', () => {
    console.warn("MongoDB disconnected. Reconnecting...");
    setTimeout(() => {
        connectDB();
    }, 3000);
});

export default connectDB;