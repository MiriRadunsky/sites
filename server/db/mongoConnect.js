const mongoose = require('mongoose');
// require('dotenv').config(); 
const { config } = require('../config/secret');

const connectDB = async () => {
    try {
        const mongoURI = config.mongoConnectionString;
        
        if (!mongoURI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        await mongoose.connect(mongoURI);

        console.log(' MongoDB Atlas connected successfully!');
    
        
    } catch (error) {
        console.error(' MongoDB connection error:', error.message);
        process.exit(1); 
    }
};

module.exports = connectDB;