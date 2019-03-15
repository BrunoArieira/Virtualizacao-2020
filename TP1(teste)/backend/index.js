var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var User = require('./models/User.js');
var cors = require("cors");

var app = express();

var db = mongoose.connect("mongodb://localhost:27017/register", function(err, response){
    if(err) console.log("There is error connecting to mongodb.");
    console.log("Connection has been added.")
})

app.use(cors());

app.set('port', process.env.port || 3000);
app.use(bodyparser.json());
app.get('/', (req, res) => {
    res.send("HELLO!");
})


app.post('/register', (req, res) => {
    console.log(req.body);
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;  
    
    var user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    user.save((err, result) => {
        if(err) {
            console.log("There is an error in adding user on database");
            res.send({Sucess: "Failed to add user",status: 500});
        }
        res.send({Sucess: "Sucessfully added new user",status: 200});
    })
})

app.listen(app.get('port'),function(err, response){
    console.log("Server is running on port ", app.get('port'));
});