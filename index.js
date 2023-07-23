import express from "express";
import bodyParser from "body-parser"


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended:true }));


// Date
function currentDay(){
    const day = ["Sunday", "Monday", "Saturday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const nowDate = new Date();
    const fullDate = day[nowDate.getDay()]+", "+month[(nowDate.getMonth())]+" "+nowDate.getDate();
    return fullDate;
}

// Task Done 
let tasks = [];
let tasksWork = [];


app.get("/", (req, res)=>{
    res.render("index.ejs",{
        date : currentDay(),
        tasks: tasks,       
    });
});

app.post("/", (req, res) => {
    const newTask = req.body["newList"];
    if (newTask && newTask.trim() !== "") {
      tasks.push(newTask);
    }
    res.redirect("/"); // Redirect to the root URL to render the updated tasks
});



// Work list
app.get("/work", (req, res)=>{
    res.render("work.ejs",{
        tasksWork: tasksWork       
    })
})

app.post("/work", (req, res) => {
    const newTaskWork = req.body["newListWork"];
    if (newTaskWork && newTaskWork.trim() !== "") {
      tasksWork.push(newTaskWork);
    }
    res.redirect("/work"); // Redirect to the root URL to render the updated tasks
});


app.listen(port, ()=>{
    console.log(`Listening on port: ${port}.`)
})