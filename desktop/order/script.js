const textLimit = 35;
const allSizes = ['Liten', 'Medium', 'Stor'];
const allPizzas = ['Vanlig', 'Pepperoni', 'Taco', 'Vår Spesial'];

var ShoppingCart = [];

// Start checked
for (let i = 0; i < allPizzas.length; i++) {
    document.getElementsByClassName(allSizes[1])[i].checked = true;
}

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

// Check if list is not empty
function notEmpty(value) {
    if (value) return true;
    return false;
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