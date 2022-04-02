var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var body_parser = bodyParser.text()

// html
app.use(express.static('public'));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/index.html");
})
app.get('/bestill', function (req, res) {
   res.sendFile( __dirname + "/bestill/index.html");
})

// CSS
app.get('/bestill/style.css', function (req, res) {
   res.sendFile( __dirname + "/bestill/style.css");
})

// JavaScript
app.get('/bestill/script.js', function (req, res) {
   res.sendFile( __dirname + "/bestill/script.js");
})

// Images
app.get('/images/PlainPizza.jpeg', function (req, res) {
   res.sendFile( __dirname + "/images/PlainPizza.jpeg");
})
app.get('/images/PepperoniPizza.jpeg', function (req, res) {
   res.sendFile( __dirname + "/images/PepperoniPizza.jpeg");
})
app.get('/images/TacoPizza.jpeg', function (req, res) {
   res.sendFile( __dirname + "/images/TacoPizza.jpeg");
})
app.get('/images/SpecialPizza.jpeg', function (req, res) {
   res.sendFile( __dirname + "/images/SpecialPizza.jpeg");
})

// 404 Page
app.get('*', function (req, res) {
   res.sendFile( __dirname + "/404.html");
})

// POST
app.post('/order_sent', body_parser, function (req, res) {
   console.log(req.body);
})

var server = app.listen(8081, function () {
    var port = server.address().port
    console.log("Server listening at port %s", port)
})