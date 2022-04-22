const shoppingCartLimit = 6;
const allSizesEnglish = ['Small', 'Medium', 'Large'];
const allPizzasEnglish = ['Plain', 'Pepperoni', 'Taco', 'Our Special'];

// Load order from cookies
let OrdersCookie = getCookie("order");
if (OrdersCookie != "[]" && getCookie("order")) {
    makeShoppingCart(OrdersCookie);
}

// Make shopping cart
function makeShoppingCart(string) {
    // Cenvert to list
    let list = string.substr(1, string.length - 2).split('],[');
    let totalpris = 0;
    let amt = 0;
    for (let i = 0; i < list.length; i++) {
        amt++;
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
    document.getElementById('indicator').innerHTML = amt;
    // Edit HTML
    let ul = document.getElementById('orderlist');
    let innerUL = "";
    for (let i = 0; i < list.length; i++) {
        let pizza = list[i][0];
        let size = list[i][1];
        // If English
        if (getCookie("lang") == "en") {
            pizza = allPizzasEnglish[allPizzas.indexOf(list[i][0].slice(0, -6))];
            size = allSizesEnglish[allSizes.indexOf(list[i][1])];
        }
        // Fix text length
        if (list[i][3])
        {
            let text = list[i][3].split(" ");
            let fixesText = "";
            for (let i = 0; i < text.length; i++) {
                if (text[i].length > 30) {
                    text[i] = text[i].substr(0, 29) + " " + text[i].substr(29, text[i].length)
                }
                fixesText += text[i];
            }
            list[i][3] = fixesText;
        }
        innerUL += `
            <li id="${i}">
            <button class="removeButton" onclick="removePizza(${i})"><b>X</b></button>
            <span>${pizza} Pizza</span>
            <div class="v-line"></div>
            <span>${size}</span>
            <br>`;
        if (list[i][3]) innerUL += `<div style="width: 80%;"><span>${list[i][3]}</span></div>`;
        innerUL += `
            <br>
            <span style="color: #747b84;">Pris: ${list[i][2]}</span>
            </li>
            <div class="h-line"></div>`;
    }
    innerUL += `
        <span>Totalt: ${totalpris}kr</span>
        <br>
        <button onclick="order()" class="order">Bestill</button>`;
    ul.innerHTML = innerUL;
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
    let list = [allPizzas[pizzaIndex] + " Pizza", size, price];
    let input = document.getElementsByClassName('input-box')[pizzaIndex].value;
    if (input) list.push(input);
    ShoppingCart.push(list);
    // Convert to string
    let string = "";
    for (let i = 0; i < ShoppingCart.length; i++) {
        string += "[" + ShoppingCart[i] + "],"
    }
    string = "[" + string.substr(0, string.length - 1) + "]";
    document.cookie = "order=" + string + "; path=/";
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
    document.cookie = "order=" + string + "; path=/";
    // Make shopping cart again
    if (string != '[]') makeShoppingCart(string);
    // Remove the cart list when its empty
    else {
        document.getElementById('orderlist').innerHTML = "<h3>Currently Empty</h3>";
        document.getElementById('indicator').innerHTML = "";
    }
}

// Clear order button
function clearOrder() {
    ShoppingCart = [];
    document.cookie = "order=[]; path=/";
    document.getElementById('orderlist').innerHTML = "<h3>Currently Empty</h3>";
    document.getElementById('indicator').innerHTML = "";
}