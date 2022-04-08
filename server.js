var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var body_parser = bodyParser.text()

let data = {}
let id = 0

// HTML
app.use(express.static('public'));
app.get('/', function (req, res) {
   res.sendFile(__dirname + "/frontpage/index.html");
})
app.get('/bestill', function (req, res) {
   res.sendFile(__dirname + "/bestill/index.html");
})
app.get('/kontakt_oss', function (req, res) {
   res.sendFile(__dirname + "/kontakt_oss/index.html");
})
app.get('/om_oss', function (req, res) {
   res.sendFile(__dirname + "/om_oss/index.html");
})
app.get('/bestill/kjop', function (req, res) {
   res.sendFile(__dirname + "/bestill/kjop/index.html");
})

// CSS
app.get('/style.css', function (req, res) {
   res.sendFile(__dirname + "/frontpage/style.css");
})
app.get('/bestill/style.css', function (req, res) {
   res.sendFile(__dirname + "/bestill/style.css");
})
app.get('/kontakt_oss/style.css', function (req, res) {
   res.sendFile(__dirname + "/kontakt_oss/style.css");
})
app.get('/om_oss/style.css', function (req, res) {
   res.sendFile(__dirname + "/om_oss/style.css");
})
app.get('/bestill/kjop/style.css', function (req, res) {
   res.sendFile(__dirname + "/bestill/kjop/style.css");
})

// JavaScript
app.get('/script.js', function (req, res) {
   res.sendFile(__dirname + "/frontpage/script.js");
})
app.get('/bestill/script.js', function (req, res) {
   res.sendFile(__dirname + "/bestill/script.js");
})
app.get('/kontakt_oss/script.js', function (req, res) {
   res.sendFile(__dirname + "/kontakt_oss/script.js");
})
app.get('/om_oss/script.js', function (req, res) {
   res.sendFile(__dirname + "/om_oss/script.js");
})
app.get('/bestill/kjop/script.js', function (req, res) {
   res.sendFile(__dirname + "/bestill/kjop/script.js");
})

// Images
app.get('/images/PizzaBanner.jpeg', function (req, res) {
   res.sendFile(__dirname + "/images/PizzaBanner.jpeg");
})
app.get('/images/PlainPizza.jpeg', function (req, res) {
   res.sendFile(__dirname + "/images/PlainPizza.jpeg");
})
app.get('/images/PepperoniPizza.jpeg', function (req, res) {
   res.sendFile(__dirname + "/images/PepperoniPizza.jpeg");
})
app.get('/images/TacoPizza.jpeg', function (req, res) {
   res.sendFile(__dirname + "/images/TacoPizza.jpeg");
})
app.get('/images/SpecialPizza.jpeg', function (req, res) {
   res.sendFile(__dirname + "/images/SpecialPizza.jpeg");
})
app.get('/images/GoogleMaps.png', function (req, res) {
   res.sendFile(__dirname + "/images/GoogleMaps.png");
})
app.get('/images/oss.png', function (req, res) {
   res.sendFile(__dirname + "/images/oss.png");
})

// Icons
app.get('/icons/PizzaIcon.png', function (req, res) {
   res.sendFile(__dirname + "/icons/PizzaIcon.png");
})
app.get('/icons/PhoneIcon.png', function (req, res) {
   res.sendFile(__dirname + "/icons/PhoneIcon.png");
})
app.get('/icons/AboutIcon.png', function (req, res) {
   res.sendFile(__dirname + "/icons/AboutIcon.png");
})
app.get('/icons/GitHubIcon.png', function (req, res) {
   res.sendFile(__dirname + "/icons/GitHubIcon.png");
})

// Get Data
app.get('/data', function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'})
   res.end(JSON.stringify(data))
})

// 404 Page
app.get('*', function (req, res) {
   res.sendFile(__dirname + "/404.html");
})

// POST
app.post('/order_sent', body_parser, function (req, res) {
   //console.log(req.body);
   data[id] = req.body;
   id++;
})

var server = app.listen(8081, function () {
    var port = server.address().port
    console.log("Server listening at port %s", port)
})