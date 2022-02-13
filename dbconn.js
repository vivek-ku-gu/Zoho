function dbconnection() {
//db connection
//db connection
const mongoose  = require("mongoose");
mongoose.connect("mongodb://localhost:27017/comment").then(() => console.log("connection successful")).catch((err)=>console.log(err));

// mongoose.connect("mongodb://localhost:27017/loginforcomment").then(() => console.log("connection successful to loginforcomment")).catch((err)=>console.log(err));

}
module.exports = dbconnection