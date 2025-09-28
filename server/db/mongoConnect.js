const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../..', '.env') });

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        
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