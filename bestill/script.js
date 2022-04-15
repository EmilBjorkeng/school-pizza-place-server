const textLimit = 35;
const shoppingCartLimit = 6;
const allSizes = ['Liten', 'Medium', 'Stor'];
const allPizzas = ['Plain', 'Pepperoni', 'Taco', 'Vår Spesial'];
var ShoppingCart = [];

// Start checked
for (let i = 0; i < allPizzas.length; i++) {
    document.getElementsByClassName(allSizes[1])[i].checked = true;
}
// Shopping cart default
const shoppingCartDefault = '<img src="/icons/ShoppingBasketIcon.png" class="removeWhenEmptyList"><div class="line removeWhenEmptyList"></div>'

// Check box function
function checkBox(sizeIndex, pizzaIndex) {
    // Stops you from removing all sizes
    if (document.getElementsByClassName(allSizes[sizeIndex])[pizzaIndex].checked == false) {
        document.getElementsByClassName(allSizes[sizeIndex])[pizzaIndex].checked = true;
        return;
    }
    // Turn off all other checkboxes
    pizzaSizes = allSizes.slice();
    pizzaSizes.splice(sizeIndex, 1);
    for (let i = 0; i < pizzaSizes.length; i++) {
        document.getElementsByClassName(pizzaSizes[i])[pizzaIndex].checked = false;
    }
}

// Cookie popup button
function cookieButton() {
    document.getElementById('cookie').style.display = "none";
}

// Word counter
for (let i = 0; i < allPizzas.length; i++) {
    let textBox = document.getElementsByClassName('input-box')[i];
    let result = document.getElementsByClassName('word-limit')[i];
    result.textContent = 0 + "/" + textLimit;
    textBox.addEventListener("input",function(){
        let textLength = textBox.value.length;
        result.textContent = textLength + "/" + textLimit;
    
        if (textLength > textLimit) result.style.color = "#ff2851";
        else result.style.color = "#31821b";
    });
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

// Load order from cookies
let OrdersCookie = getCookie("order");
if (OrdersCookie != "[]" && getCookie("order")) {
    makeShoppingCart(OrdersCookie);
}

// Check if list is not empty
function notEmpty(value) {
    if (value) return true;
    return false;
}

function makeShoppingCart(string) {
    // Cenvert to list
    list = string.substr(1, string.length - 2).split('],[');
    let totalpris = 0;
    for (let i = 0; i < list.length; i++) {
        list[i] = list[i].replace("[", "").replace("]", "").split(',').filter(notEmpty);
        totalpris += parseInt(list[i][2]);
        if (list[i].length > 4) {
            let str = "";
            for (let j = 2; j < list[i].length; j++) {
                str += list[i][j] + ",";
            }
            str = str.substr(0, str.length - 1);
            list[i][2] = str;
            list[i] = list[i].slice(0, 3);
        }
    }
    ShoppingCart = list;
    // Edit HTML
    let orderid = 0;
    let ul = document.getElementById('orderlist');
    ul.innerHTML = shoppingCartDefault;
    for (let i = 0; i < list.length; i++) {
        let li = document.createElement('li');
        li.id = orderid;
        // Add Button
        let button = document.createElement('button');
        button.className = "removeButton"
        button.innerHTML = "<b>X</b>";
        button.setAttribute("onclick", `removePizza(${orderid})`);
        orderid++;
        li.appendChild(button);
        // Add Elements
        for (let j = 0; j < list[i].length; j++) {
            // Fix Up Extra Info
            if (j == 3) {
                // Add Line before extra info
                let div = document.createElement('div');
                div.className = "line";
                li.appendChild(div);
                // Split up over 15 character long words 
                // into 14 long words
                let text = list[i][j].split(" ");
                let string = ""
                for (let i = 0; i < text.length; i++) {
                    if (text[i].length > 15) {
                        string += text[i].slice(0, 14) + " ";
                        text[i] = text[i].slice(14, text[i].length);
                        i--;
                    }
                    else string += text[i] + " ";
                }
                list[i][j] = string;
            }
            // Add Price Element
            if (j == 2) {
                let span = document.createElement('span');
                span.innerHTML = "Pris: " + list[i][j];
                span.style = "color: #747b84"
                li.appendChild(span);
            }
            // Add The Non Price Elements
            else {
                let span = document.createElement('span');
                span.innerHTML = list[i][j];
                li.appendChild(span);
                // Newline
                let br = document.createElement('br');
                br.className = "removeWhenEmptyList";
                li.appendChild(br);
            }
        }
        ul.appendChild(li);
    }
    // Add Total Price
    let span = document.createElement('span');
    span.innerHTML = "Totalt: " + totalpris + "kr";
    span.className = "removeWhenEmptyList";
    ul.appendChild(span);
    // Newline
    let br = document.createElement('br');
    br.className = "removeWhenEmptyList";
    ul.appendChild(br);
    // Add Line
    let div = document.createElement('div');
    div.className = "line";
    div.className = "removeWhenEmptyList";
    div.style = "margin-bottom: 5px;"
    ul.appendChild(div);
    // Add Buy Button
    let button = document.createElement('button');
    button.innerHTML = 'Bestill<img src="/icons/CreditCardIcon.png">';
    button.className = "removeWhenEmptyList";
    button.setAttribute("onclick", 'order()');
    ul.appendChild(button);
}

function addPizza(pizzaIndex) {
    // Check for word count
    let textBox = document.getElementsByClassName('input-box')[pizzaIndex];
    if (textBox.value.length > textLimit) {
        return alert("Du har for mange karakterer i ekstra info boksen");
    }
    // Remove Spamming you can't even trust your own group partners ):<
    if (ShoppingCart.length > shoppingCartLimit) {
        return alert("Bro, du har lagt til litt vel mye nå");
    }
    // Check size
    let size;
    for (let i = 0; i < allSizes.length; i++) {
        if (document.getElementsByClassName(allSizes[i])[pizzaIndex].checked) {
            size = allSizes[i];
            break;
        }
    }
    let price = document.getElementsByTagName('small')[pizzaIndex * 4 + 1 + allSizes.indexOf(size)].textContent;
    list = [allPizzas[pizzaIndex] + " Pizza", size, price];
    let input = document.getElementsByClassName('input-box')[pizzaIndex].value;
    if (input) list.push(input);
    ShoppingCart.push(list);
    // Convert to string
    let string = "";
    for (let i = 0; i < ShoppingCart.length; i++) {
        string += "[" + ShoppingCart[i] + "],"
    }
    string = "[" + string.substr(0, string.length - 1) + "]";
    document.cookie = "order=" + string;
    makeShoppingCart(string)
}

// Remove pizza button
function removePizza(id) {
    // Remove element
    ShoppingCart.splice(id, 1);
    document.getElementById(id).remove();
    // Regenerate cookies
    let string = "";
    for (let i = 0; i < ShoppingCart.length; i++) {
        string += "[" + ShoppingCart[i] + "],";
    }
    string = "[" + string.substr(0, string.length - 1) + "]";
    document.cookie = "order=" + string;
    // Make shopping cart again
    if (string != '[]') makeShoppingCart(string);
    // Remove the cart list when its empty
    else {
        let removeElements = document.getElementsByClassName('removeWhenEmptyList');
        let length = removeElements.length;
        for (let i = 0; i < length; i++) {
            removeElements[0].remove()
        }
    }
}

// Clear order button
function clearOrder() {
    ShoppingCart = [];
    document.cookie = "order=[]";
    let ul = document.getElementById("orderlist");
    while (ul.childElementCount > 2) {
        ul.removeChild(ul.childNodes[2]);
    }
    let removeElements = document.getElementsByClassName('removeWhenEmptyList');
    let length = removeElements.length;
    for (let i = 0; i < length; i++) {
        removeElements[0].remove()
    }
}

// Order Cooldown
var orderCooldown = false;
function ordercooldown() {
    orderCooldown = false
}

// Order
function order() {
    if (orderCooldown) {
        alert("Woah! ikke så raskt der. Du har ikke lyst å fryse/crashe serveren vil du.")
    } else {
        let string = "";
        for (let i = 0; i < ShoppingCart.length; i++) {
            string += "[" + ShoppingCart[i] + "],"
        }
        fetch("/order_sent", {
            method: "POST", 
            body: "[" + string.substr(0, string.length - 1) + "]"
        });
        clearOrder();
        orderCooldown = true;
        setTimeout(ordercooldown, 4000);
    }
}