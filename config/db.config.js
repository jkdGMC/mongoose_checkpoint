
//dotnet configuration and mongoose connection
const mongoose = require("mongoose");
require("dotenv").config()


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connecté à la base de données mongodb !")
}).catch((error) => {
    console.error("error : ", error)
})
