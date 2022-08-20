const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const { receiveMessageOnPort } = require("worker_threads");
const { rmSync } = require("fs");
mongoose.connect('mongodb://localhost:27017/dancewebsitedata');
// var jsonParser = bodyparser.json()
// var urlencodedParser = bodyparser.urlencoded({ extended: false })
// app.configure(function(){
//     app.use(express.bodyParser());
//   });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// define mongoose schema 
let cotnactSchema  = new mongoose.Schema({
    firstname: String, 
    lastname: String,
    phone: String,
    email: String, 
    city: String,
    type: String

})

let Contact = mongoose.model('Contact', cotnactSchema);

// For serving static files
app.use('/static', express.static('static'))

// Set the template engine as pug
app.set('view engine', 'pug')

// Set the views directory
app.set('views', path.join(__dirname, 'views'))
 
// Our pug demo endpoint
app.get("/demo", (req, res)=>{ 
    res.status(200).render('home', { title: 'Hey Harry', message: 'Hello there and thanks for telling me how to use pubG!' })
});

app.get("/", (req, res)=>{ 
    res.status(200).render('base');
});

app.get("/contact", (req, res)=>{
    res.render("contact");
});

app.post("/contact", (req, res)=>{
    let myData = new Contact(req.body);
    console.log(req.body)
    myData.save().then(()=>{
     res.render('contact')
    }).catch(()=>{
        res.status(400).send('something went wrong')
    })
});

app.post("/about", (req, res)=>{
    res.send("This is a post request about page of my first express app with Harry");
});
app.get("/this", (req, res)=>{
    res.status(404).send("This page is not found on my website cwh");
});

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
