import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// Define the MongoDB connection URL
const mongoURL =  process.env.MONGODB_URL_LOCAL //Replace 'hotels' with your database name
// const mongoURL = 'mongodb+srv://kmrmohit04:qwerty12345@cluster0.mq9oxep.mongodb.net/hotels?retryWrites=true&w=majority'

//Set up MongoDB connection
mongoose.connect(mongoURL, {
})

// Get the default connection
// Mongoose maintains a default connection  object representing the MongoDB connection
const db=mongoose.connection;

//Define event listeners for database connection

db.on('connected', ()=>{
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('MongoDB connection error: ',err);
})

db.on('disconnected', () => {
    console.log("MongoDB disconnected");
})



// Export the database connection
export default db;