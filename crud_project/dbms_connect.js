const mongoose = require("mongoose")
// mongoose.connect("mongodb://127.0.0.1:27017/crudmernbatch")
//connect through promise

// .then(()=>{
//     console.log("Database connected!!!")
// })
// .catch((error)=>{
//     console.log(error)
// })

// use second method
async function getConnect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/crudmernbatch")
        console.log("Database connected!!!")

    }
    catch (error) {
        console.log(error)
    }
}
getConnect()