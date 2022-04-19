const express = require('express');
var device = require('express-device');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require("fs");

// Express and body parser
const app = express();
app.use(device.capture());
const body_parser = bodyParser.text()
const login_body_parser = bodyParser.urlencoded({ extended: true })

// Load from json file
const data = require("./json/orders.json");
const accounts = require("./json/accounts.json");
let id = parseInt(Object.keys(data)[Object.keys(data).length - 1]) + 1;
if (!(id > -1)) id = 0;

const defaultLang = "no";

// HTML
app.get('/no', function (req, res) {
   res.sendFile(__dirname + "/"+req.device.type + "/frontpage/no.html");
})
app.get('/en', function (req, res) {
   res.sendFile(__dirname + "/"+req.device.type + "/frontpage/en.html");
})
app.get('/order', function (req, res) {
   res.sendFile(__dirname + "/"+req.device.type + "/order/index.html");
})
app.get('/contact_us', function (req, res) {
   res.sendFile(__dirname + "/"+req.device.type + "/contact_us/index.html");
})
app.get('/about_us', function (req, res) {
   res.sendFile(__dirname + "/"+req.device.type + "/about_us/index.html");
})
app.get('/login', function (req, res) {
   res.sendFile(__dirname + "/"+req.device.type + "/staff/login.html");
})

// Redirect
app.get('/', function (req, res) {
   res.redirect('/'+defaultLang);
})
/*app.get('/home', function (req, res) {
   res.redirect('/');
})
app.get('/hjem', function (req, res) {
   res.redirect('/');
})
app.get('/bestill', function (req, res) {
   res.redirect('/order');
})
app.get('/kontakt_oss', function (req, res) {
   res.redirect('/contact_us');
})
app.get('/om_oss', function (req, res) {
   res.redirect('/about_us');
})*/

// CSS
app.get('/global/global.css', function (req, res) {
   res.sendFile(__dirname + "/global/global.css");
})
app.get('/style.css', function (req, res) {
   res.sendFile(__dirname + "/"+req.device.type + "/frontpage/style.css");
})
app.get('/order/style.css', function (req, res) {
   res.sendFile(__dirname + "/"+req.device.type + "/order/style.css");
})
app.get('/order/orderlist.css', function (req, res) {
   res.sendFile(__dirname + "/"+req.device.type + "/order/orderlist.css");
})
app.get('/order/pizzalist.css', function (req, res) {
   res.sendFile(__dirname + "/"+req.device.type + "/order/pizzalist.css");
})
app.get('/contact_us/style.css', function (req, res) {
   res.sendFile(__dirname + "/"+req.device.type + "/contact_us/style.css");
})
app.get('/about_us/style.css', function (req, res) {
   res.sendFile(__dirname + "/"+req.device.type + "/about_us/style.css");
})
app.get('/404/style.css', function (req, res) {
   res.sendFile(__dirname + "/"+req.device.type + "/404/style.css");
})

// JavaScript
app.get('/order/script.js', function (req, res) {
   res.sendFile(__dirname + "/"+req.device.type + "/order/script.js");
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
app.get('/images/PizzaMark.png', function (req, res) {
   res.sendFile(__dirname + "/images/PizzaMark.png");
})

// Icons
app.get('/icons/GitHubIcon.png', function (req, res) {
   res.sendFile(__dirname + "/icons/GitHubIcon.png");
})
app.get('/icons/ShoppingBasketIcon.png', function (req, res) {
   res.sendFile(__dirname + "/icons/ShoppingBasketIcon.png");
})
app.get('/icons/CreditCardIcon.png', function (req, res) {
   res.sendFile(__dirname + "/icons/CreditCardIcon.png");
})
app.get('/icons/PizzaIcon.png', function (req, res) {
   res.sendFile(__dirname + "/icons/PizzaIcon.png");
})
app.get('/icons/PhoneIcon.png', function (req, res) {
   res.sendFile(__dirname + "/icons/PhoneIcon.png");
})
app.get('/icons/AboutIcon.png', function (req, res) {
   res.sendFile(__dirname + "/icons/AboutIcon.png");
})

// Get Data
app.get('/data', function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'})
   res.end(JSON.stringify(data))
})

// 404 Page
app.get('*', function (req, res) {
   res.sendFile(__dirname + "/"+req.device.type + "/404/index.html");
})

// POST
app.post('/order_sent', body_parser, function (req, res) {
   data[id] = req.body;
   id++;
   // Write to JSON
   fs.writeFile("./json/orders.json", JSON.stringify(data), err => {
      if (err) throw err;
  });
})
app.post('/order_remove', body_parser, function (req, res) {
   // Split key from message data
   removeData = req.body.split(',');
   if (removeData[0] !== "SeacretKeyForValidation") return;
   // join message data back together
   let newData = "";
   for (let i = 1; i < removeData.length; i++) newData += removeData[i] + ",";
   // Split message data into an array
   newData = newData.replace("[","").replace("]","").substr(0, newData.length - 3).split(",");
   // Delete data
   for (let i = 0; i < newData.length; i++) {
      delete data[newData[i]]
   };
   // Write to JSON
   fs.writeFile("./json/orders.json", JSON.stringify(data), err => {
      if (err) throw err;
  });
})
app.post('/staff', login_body_parser, function (req, res) {
   password = req.body.password;
   username = req.body.username;

   // Check is username exists
   let found = false;
   var count = Object.keys(accounts).length;
   for (let i = 0; i < count; i++) {
      if (username == Object.keys(accounts)[i]) {
         found = true;
         break;
      }
   }
   if (!found) return res.end("Wrong username or password");

   // Check password vs hash
   bcrypt.compare(password, accounts[username],
      async function (err, isMatch) {
         if (isMatch) return res.sendFile(__dirname + "/staff/index.html");
         else return res.end("Wrong username or password");
      });
})

// Create Server
var server = app.listen(8081, function () {
    var port = server.address().port
    console.log("Server listening at port %s", port)
})