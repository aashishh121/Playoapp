const express = require("express");

const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();



// connect to db 
mongoose.connect(process.env.DB_CONNECT,
    {useUnifiedTopology:true, useNewUrlParser: true},
    ()=>console.log("connectd to db")
);

//import routes
const router = require("./routes/user-routes");

//middleware
app.use(express.json());
app.use(cors());
const Events = require("./model/Events");

//route middleware
app.use("/api" , router);

app.post("/add-event",async (req,resp,next)=>{
    let event = new Events(req.body);
    let result = await event.save();

    resp.send(result);
})



app.get("/events", async (req,resp)=>{
    const events = await Events.find();
    if(events.length > 0){
        resp.send(events);
    }else{
        resp.send({result:"No Product Found"})
    }
})


app.delete("/events/:id", async (req,resp)=>{
    let result = await Events.deleteOne({_id:req.params.id});
    resp.send(result);
})

app.get("/events/:id", async (req,resp)=>{
    let result = await Events.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }else{
        resp.send({result:"No Record found"});
    }
})

app.put("/events/:id", async (req,resp)=>{
    let result = await Events.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    )

    resp.send(result);
})
app.put("/request/:id", async (req,resp)=>{
    console.log(req);
    let result = await Events.updateOne(
        {_id: req.params.id},
        {$set: {pendingPlayers:req.body.email}}
    )

    resp.send(result);
})

app.get("/search/:key", async (req,resp)=>{
    let result = await Events.find({
        "$or":[
            {
                eventName: {$regex: req.params.key}
            },
            {
                organizerName: {$regex: req.params.key}
            }
        ]
    });

    
    resp.send(result)
})

app.listen(4000,()=>{console.log("hello")});