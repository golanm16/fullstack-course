// import { Product } from "./classes";
const generated_sns = [];
const items = [];
const cart = [];
const randItems = ['pinapple', 'krembo', 'rice', 'water', 'cola', 'bamba luli', 'chocobo'];


function randNum(a, b) {
    return (a + Math.random() * (b - a)).toFixed(2);
}


function generateSn() {
    const minSn = 100000000;
    const maxSn = 999999999;
    let snExists = false;
    let randSn;
    do {
        randSn = Math.floor(randNum(minSn, maxSn));
        snExists = generated_sns.includes(randSn);
    } while (snExists);
    generated_sns.push(randSn);
    return randSn;
}


function validate(prop, type) {
    const num_types = ['price', 'weight', 'volume']
    if (type === 'productName') {
        return prop && isNaN(prop);
    }
    if (num_types.includes(type)) {
        return prop && !isNaN(prop);
    }
    return true;
}


class Product {
    constructor(productName, price, weight, volume, sn) {
        const obj = { productName, price, weight, volume, sn };
        for (let key in obj) {
            if (validate(obj[key], key)) {
                this[key] = isNaN(obj[key]) ? obj[key] : Number(obj[key])
            } else {
                throw `invalid prop: ${key}: ${obj[key]} `
            }
        }
        if (!sn) {
            this.sn = generateSn();
        }
    }
}


function addItem(product) {
    const list = document.getElementById('item_list')
    let listItem = document.createElement('li');
    listItem.className = 'product';
    listItem.LocalName = product.productName
    listItem.innerHTML = `${product.productName} | ${product.price}`
    listItem.dataset.sn = product.sn;
    listItem.onclick = addToCart
    list.appendChild(listItem)
    items.push(product);
}


function addToCart(ev) {
    const getTotal = (total, val) => {
        return (Number(total) + Number(val)).toFixed(2);
    }
    const sn = ev.target.dataset.sn;
    const item = items.find(v => v.sn == sn);
    const list = document.getElementById('cart_list');
    let cartItem = list.querySelector(`[data-sn=${CSS.escape(sn)}]`);
    if (cartItem) {
        const newPrice = (item.price + Number(cartItem.dataset.price)).toFixed(2);
        cartItem.dataset.price = newPrice;
        const total = document.getElementById('total');
        total.innerText = getTotal(total.innerText, newPrice);
        cartItem.innerText = `${item.productName} | ${cartItem.dataset.price}`;
    }
    else {
        cartItem = document.createElement('li');
        cartItem.dataset.price = item.price;
        cartItem.dataset.sn = item.sn;
        cartItem.innerText = `${item.productName} | ${cartItem.dataset.price}`;
        cartItem.ondblclick = removeFromCart
        list.appendChild(cartItem);
        const total = document.getElementById('total');
        total.innerText = getTotal(total.innerText, item.price);
    }
    // console.log(cartItem);
}


function removeFromCart(ev) {
    
    const sn = ev.target.dataset.sn;
    const list = document.getElementById('cart_list');
    let cartItem = list.querySelector(`[data-sn=${CSS.escape(sn)}]`);
    const total = document.getElementById('total');
    total.innerText = (Number(total.innerText) - Number(cartItem.dataset.price)).toFixed(2);
    cartItem.remove();
}


function main() {
    // let gc = document.getElementsByClassName('anon');
    // // get HTMLCollection
    // let qs = document.querySelectorAll('.anon');
    // // get NodeList of specific class
    // let qst = document.querySelectorAll('.anon[type=input]');
    // // get NodeList of specific class that have type=input
    // let arr1 = [...gc];
    // let arr = [...qs];
    // // extract the items from the lists nad put in an array
    const total = document.getElementById('total');
    total.innerText = '0';
    for (let item of randItems) {
        addItem(new Product(item, randNum(1, 5), randNum(1, 5), randNum(1, 5)));
    }
}


main();