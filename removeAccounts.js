const { exit } = require("process");
const fs = require("fs");

const accounts = require("./accounts.json");
const args = process.argv.slice(2);

// There must be only 1 args
if (args.length != 1) {
    console.log("Add (only) username as args")
    exit();
}

let found = false;
var count = Object.keys(accounts).length;
for (let i = 0; i < count; i++) {
    if (args[0] == Object.keys(accounts)[i]) {
        delete accounts[args[0]];
        fs.writeFile("accounts.json", JSON.stringify(accounts), err => {
            if (err) throw err; 
            console.log("User removed");
            found = true;
        });
    }
}
if (!found) console.log("Could not find the account")