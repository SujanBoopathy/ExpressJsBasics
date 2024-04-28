const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 5000;

app.get('^/$|/index(.html)?',(req,res) => {
    // res.sendFile("./view/index.html",{root : __dirname});
    res.sendFile(path.join(__dirname,"view","index.html"))
})
app.get('/new-page(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,"view","new-page.html"))
})
app.get('/old-page(.html)?',(req,res) => {
    res.redirect(301,"/new-page.html");
})
// Route Handlers
app.get("/hello(.html)?",(req,res,next)=>{
    console.log("attempting to load hello");
    next();
}, (req,res) => {
    res.send("hello world");
})
// Chaining route handlers
const one = (req,res,next) => {
    console.log('one');
    next();
}
const two = (req,res,next) => {
    console.log('two');
    next();
}
const three = (req,res,next) => {
    console.log('three');
    res.send("Chaining Routes")
}
app.get("/chain(.html)?",[one,two,three]);
app.get('/*',(req,res) => {
    res.status(404).sendFile(path.join(__dirname,"view","404.html"))
})

app.listen(PORT,()=>{
    console.log("server listening on port "+PORT+" ...");
})