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
    let ul = document.getElementById('orderlist');
    let innerUL = `
        <img src="/icons/ShoppingBasketIcon.png" class="removeWhenEmptyList">
        <div class="line removeWhenEmptyList"></div>`;
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
            <br class="removeWhenEmptyList">
            <span>${size}</span>
            <br class="removeWhenEmptyList">
            <span style="color: #747b84;">Pris: ${list[i][2]}</span>`;
        if (list[i][3]) innerUL += `
            <div class="line"></div>
            <span>${list[i][3]}</span>`;
        innerUL += '</li>';
    }
    innerUL += `
        <span class="removeWhenEmptyList">Totalt: ${totalpris}kr</span>
        <br class="removeWhenEmptyList">
        <div class="removeWhenEmptyList line" style="margin-bottom: 5px;"></div>
        <button class="removeWhenEmptyList" onclick="order()">Bestill<img src="/icons/CreditCardIcon.png"></button>`;
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
    document.cookie = "order=[]; path=/";
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