try {
  require("dotenv").config();
} catch (error) {
  // Render and other environments can rely on real environment variables.
}

const app = require("./app.js");
const connectDB = require("./src/config/db.js");

const port = process.env.PORT || 3200;

connectDB();

app.listen(port,()=>{
    console.log(`port is running on ${port}`)
})
