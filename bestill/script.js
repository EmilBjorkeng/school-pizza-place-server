let orderList = []

function update() {
    var ul = document.getElementById("orderlist");
    var li = document.createElement('li');
    content = orderList[orderList.length - 1].replace("[", "").replace("]", "").split(",")
    for (let i = 0; i < content.length; i++) {
        let p = document.createElement('p')
        p.innerHTML = content[i];
        li.appendChild(p)
    }
    let button = document.createElement('button')
    button.innerHTML = "Remove Pizza"
    li.appendChild(button)
    ul.appendChild(li);
}

function addPizza(pizzaType) {
    let checkBoxList = ["Liten", "Medium", "Stor"];
    let n = 0;
    let size;
    for (let i = 0; i < 3; i++) {
        checkBox = document.getElementById(checkBoxList[i] + pizzaType);
        if (checkBox.checked) { n++; size = checkBoxList[i]}
    }
    if (n == 0) { alert("Du må velge en størelse"); return; }
    if (n > 1) { alert("Du kan bare velge en størelse"); return; }
    let input = document.getElementById(pizzaType + 'Extra').value
    list = [pizzaType, size]
    if (input) list.push(input)
    orderList.push("[" + list + "]")
    update()
}

function order() {
    fetch("/order_sent", { 
        method: "POST", 
        body: "[" + orderList + "]"
    });
}