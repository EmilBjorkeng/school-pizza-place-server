// Start checked
for (let i = 0; i < 4; i++) {
    document.getElementsByClassName('start-checked')[i].checked = true;
}

function checkBox(box1, box2) {
    document.getElementById(box1).checked = false;
    document.getElementById(box2).checked = false;
}

let orderList = [];
let orderid = 0;

function addPizza(pizzaType) {
    // Remove Spamming you can't even trust your own group partners ):<
    if (orderList.length > 6) {
        alert("Bro, du har lagt til litt vel mye nå");
        return;
    }
    // Check size
    let checkBoxList = ["Liten", "Medium", "Stor"]; // Bigest word is 6 characters
    let size = "";
    for (let i = 0; i < 3; i++) {
        checkBox = document.getElementById(checkBoxList[i] + pizzaType);
        if (checkBox.checked) size = checkBoxList[i];
    }
    if (!size) { alert("Du må velge en størelse"); return; }
    if (size.length > 6) { alert("Du kan bare velge en størelse"); return; }
    let input = document.getElementById(pizzaType + 'Extra').value; // Check input
    
    // Make list and add to orderList
    list = [pizzaType, size];
    if (input) list.push(input);
    orderList.push(list);
    // Add To Cookies
    let string = "";
    for (let i = 0; i < orderList.length; i++) {
        string += "[" + orderList[i] + "],"
    }
    document.cookie = "order=" + "[" + string.substr(0, string.length - 1) + "]";
    // Edit order list
    var ul = document.getElementById("orderlist");
    let li = document.createElement('li');
    li.id = orderid;
    LastOrder = orderList.length - 1;
    for (let i = 0; i < orderList[LastOrder].length; i++) {
        let p = document.createElement('p');
        p.innerHTML = orderList[LastOrder][i];
        li.appendChild(p);
    }
    let button = document.createElement('button');
    button.innerHTML = "Remove Pizza";
    button.setAttribute("onclick", `removePizza(${orderid}, ${orderList.length - 1})`);
    orderid++;
    li.appendChild(button);
    ul.appendChild(li);
}

// Remove pizza button
function removePizza(id, ol) {
    orderList.splice(ol, 1);
    document.getElementById(id).remove();
    // Regenerate cookies
    let string = "";
    for (let i = 0; i < orderList.length; i++) {
        string += "[" + orderList[i] + "],";
    }
    document.cookie = "order=" + "[" + string.substr(0, string.length - 1) + "]";
}

// Clear order button
function clearOrder() {
    orderList = [];
    document.cookie = "order=[]";
    let ul = document.getElementById("orderlist");
    while (ul.childElementCount > 2) {
        ul.removeChild(ul.childNodes[5]);
    }
}

// Get cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

// Cookie popup button
function cookieButton() {
    document.getElementById('cookie').style.display = "none";
}

// Don't show cookie popup again
if (getCookie("seen") == "true") {
    document.getElementById('cookie').style.display = "none";
}
// If there is no cookies 
else {
    var date = new Date(); 
    date.setDate(date.getDate() + 30);
    date = date.toUTCString();
    document.cookie = "seen=true; expires=" + date;
}

// Check if list is not empty
function notEmpty(value) {
    if (value) return true;
    return false;
}

// If cokkies contain an order
if (getCookie("order") != "[]" && getCookie("order"))
{
    // Split order list
    orderList = getCookie("order");
    orderList = orderList.substr(1, orderList.length - 2);
    orderList = orderList.split('],[');
    // split lists inside order list
    for (let i = 0; i < orderList.length; i++) {
        orderList[i] = orderList[i].replace("[", "").replace("]", "").split(',').filter(notEmpty);
        if (orderList[i].length > 3) {
            let string = "";
            for (let j = 2; j < orderList[i].length; j++) {
                string += orderList[i][j] + ",";
            }
            string = string.substr(0, string.length - 1);
            orderList[i][2] = string;
            orderList[i] = orderList[i].slice(0, 3);
        }
    }
    // Edit order list
    var ul = document.getElementById("orderlist");
    for (let i = 0; i < orderList.length; i++) {
        let li = document.createElement('li');
        li.id = orderid;
        for (let j = 0; j < orderList[i].length; j++) {
            let p = document.createElement('p');
            p.innerHTML = orderList[i][j];
            li.appendChild(p);
        }
        let button = document.createElement('button');
        button.innerHTML = "Remove Pizza";
        button.setAttribute("onclick", `removePizza(${orderid}, ${i})`);
        orderid++;
        li.appendChild(button);
        ul.appendChild(li);
    }
}