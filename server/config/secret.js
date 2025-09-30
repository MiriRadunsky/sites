require("dotenv").config();

exports.config={
    tokenSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    mongoConnectionString: process.env.MONGODB_URI

}