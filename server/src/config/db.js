const mongoose = require("mongoose");

async function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=> console.log("mongoDB is connected"))
    .catch((err)=> console.log(err))
}
 module.exports = connectDB;