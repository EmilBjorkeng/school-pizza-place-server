const { exit } = require("process");
const bcrypt = require('bcryptjs');
const fs = require("fs");

const accounts = require("./json/accounts.json");
const args = process.argv.slice(2);

// There must be only 2 args
if (args.length != 2) {
    console.log("Add (only) username and password as args")
    exit();
}

// Check if username is taken
var count = Object.keys(accounts).length;
for (let i = 0; i < count; i++) {
    if (args[0] == Object.keys(accounts)[i]) {
        console.log("Username already taken");
        exit();
    }
}

password = args[1];
bcrypt.genSalt(10, function (err, Salt) {
    bcrypt.hash(password, Salt, function (err, hash) {
        if (err) {
            return console.log('Cannot encrypt');
        }
        accounts[args[0]] = hash;
        fs.writeFile("./json/accounts.json", JSON.stringify(accounts), err => {
            if (err) throw err; 
            console.log("User added");
        });
    })
})