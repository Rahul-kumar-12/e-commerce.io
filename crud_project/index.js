const express= require("express")

const hbs =require("hbs")
const path =require("path")
// const multer  = require('multer')
//Body-parser is a third-party middleware for processing incoming HTTP requests in Node. js.
// It is used to extract the request body and expose it on the request object for easier handling. When a client makes an HTTP request to a server, the request may contain data in the request body, such as form data or JSON data.
const bodyParser=require("body-parser")
const Employee = require("./Models/Employee")
require("./dbms_connect")
const app = express()

//   storage and file setting
// const storage= multer.diskStorage({
//     destination:'public/Image/',
//     filename:(req,file,cv)=>{
//         cv(null,Date.now(+file+originalname))
//         cv(null,file.originalname)

//     }
// })
// const upload= multer({
//     storage:storage
})


app.set("view engine","hbs")
app.use(express.static(path.join(__dirname, "./views/public")))
hbs.registerPartials(path.join(__dirname,"./views/partials"))
const encoder =bodyParser.urlencoded()
app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/",async(req,res)=>{
    try{
        var data= await Employee.find().sort({"_id":-1})
        res.render("index",{data})
    }catch(error)
    {
console.log(error)
res.render("index")
    }
    
 })
app.get("/", async (req, res) => {
    try {
        if(req.query.search){
            let search = req.query.search
            var data = await Employee.find({
                $or:[
                    {empname:{$regex:search,$options:"i"}},
                    {email:{$regex:search,$options:"i"}},
                    {date:{$regex:search,$options:"i"}},
                    {desg:{$regex:search,$options:"i"}},
                    {dept:{$regex:search,$options:"i"}},
                    {city:{$regex:search,$options:"i"}},
                    {salary:{$regex:search,$options:"i"}},
                    
                    
                ]
            }).sort({ "_id": -1 })
        }
        else
        var data = await Employee.find().sort({ "_id": -1 })
        res.render("index", { data })
    } catch (error) {
        console.log(error);
        res.render("index")
    }
})




//it will render add page
app.get("/add",(req,res)=>{
    res.render("add")
})
//post all data in database file
app.post("/add", encoder,upload.single('page_Photos'), async (req, res) => {
    try {
        var data = new Employee(req.body)
        //save record (collection) into mongodb file
        await data.save()
        //display record in table
        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})
//Retrieve Operation(display records)
app.get("/", async (req, res) => {
    try {

        var data = await Employee.find().sort({ "_id": -1 })
        res.render("index", { data })

        
    } catch (error) {
        console.log(error);
        res.render("index")
    }
})

//delete operation
app.get("/delete/:_id", async (req, res) => {
    try {
        await Employee.deleteOne({ _id: req.params._id })
        res.redirect("/")

    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})

//update operation
app.get("/update/:_id", async (req, res) => {
    try {
        var data = await Employee.findOne({ _id: req.params._id })
        res.render("update",{data})
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})

app.post("/update/:_id",encoder, async (req, res) => {
    try {
        var data = await Employee.findOne({ _id: req.params._id })
        data.empname = req.body.empname
        data.email = req.body.email
        data.date = req.body.date
        data.phone = req.body.phone
        data.desg = req.body.desg
        data.salary = req.body.salary
        data.city = req.body.city
        data.dept = req.body.dept
   
    
        await data.save()
        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})





app.listen(8000,()=>console.log("Server is running at http://localhost:8000"))



