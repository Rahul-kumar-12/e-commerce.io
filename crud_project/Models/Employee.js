const mongoose=require("mongoose")
const EmployeeSchema = new mongoose.Schema({
    empname:{
        type:String
    },
    email:{
        type:String
    },
    date:{
        type:String
    },
    dept:{
        type:String
    },
    desg:{
        type:String
    },
   phone:{
        type:String
    },
   city:{
        type:String
    },
    image:{
        type:String
    },
   salary :{
        type:String
    }


})
const Employee= new mongoose.model("Employee",EmployeeSchema)
module.exports= Employee