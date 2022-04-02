pizzas = {
    PlainPizza:0, 
    PepperoniPizza:0, 
    TacoPizza:0, 
    SpecialPizza:0
}

function update() {
    document.getElementById('PlainPizzaAmt').innerHTML = pizzas.PlainPizza;
    document.getElementById('PepperoniPizzaAmt').innerHTML = pizzas.PepperoniPizza;
    document.getElementById('TacoPizzaAmt').innerHTML = pizzas.TacoPizza;
    document.getElementById('SpecialPizzaAmt').innerHTML = pizzas.SpecialPizza;
}

function addPizza(pizzaType) {
    pizzas[pizzaType]++;
    update()
}

function removePizza(pizzaType) {
    if (pizzas[pizzaType] > 0) {
        pizzas[pizzaType]--;
    }
    update()
}

function order() {
    fetch("/order_sent", { 
        method: "POST", 
        body: JSON.stringify(pizzas) 
    });
}