// import { Product } from "./classes";
const generated_sns = [];
const items = [];
const cart = [];
const randItems = ['pinapple', 'krembo', 'rice', 'water', 'cola', 'bamba luli', 'chocobo'];
const itemsElems = document.getElementById('item_list');
const cartElems = document.getElementById('cart_list');


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
    constructor(productName, price = randNum(1, 5), weight = randNum(1, 5),
                     volume = randNum(1, 5), sn = generateSn()) {
        const obj = { productName, price, weight, volume, sn };
        for (let key in obj) {
            if (validate(obj[key], key)) {
                this[key] = isNaN(obj[key]) ? obj[key] : Number(obj[key])
            } else {
                throw `invalid prop: ${key}: ${obj[key]} `
            }
        }
        // if (!sn) {
        //     this.sn = generateSn();
        // }
    }
}


function getProductBySn(sn) {
    return items.find(v => v.sn == sn);
}


function createItemListElement(product) {
    const elem = document.createElement('li');

    elem.className = 'product';
    elem.dataset.sn = product.sn;
    elem.onclick = addToCart;

    elem.appendChild(document.createElement('div'));
    elem.children[0].className = 'pName';
    elem.children[0].innerText = product.productName;

    elem.appendChild(document.createElement('div'));
    elem.children[1].className = 'price';
    elem.children[1].innerText = product.price;

    return elem;
}


function createCartElement(sn) {

    const cartItem = document.createElement('li');
    cartItem.dataset.price = 0;
    cartItem.dataset.sn = sn;
    cartItem.ondblclick = removeFromCart

    const product = getProductBySn(sn);
    cartItem.appendChild(document.createElement('div'));
    cartItem.children[0].className = 'pName';
    cartItem.children[0].innerText = product.productName;

    cartItem.appendChild(document.createElement('div'));
    cartItem.children[1].className = 'price';
    cartItem.children[1].innerText = product.price;

    cartElems.appendChild(cartItem);
    return cartItem;
}


function getCartItem(sn) {
    return cartElems.querySelector(`[data-sn=${CSS.escape(sn)}]`);
}


function updateCartElement(sn) {
    let product = getProductBySn(sn);
    let el = cartElems.querySelector(`[data-sn=${CSS.escape(sn)}]`);
    if (isNaN(product.price)) {
        throw `tried adding NaN value to total of cart item`;
    }
    if (isNaN(el.dataset.price)) {
        throw `total price of cart item in NaN value`;
    }
    el.dataset.price = (Number(el.dataset.price) + Number(product.price)).toFixed(2);
    el.children[1].innerText = el.dataset.price;
}


function addItem(product) {
    items.push(product);
    itemsElems.appendChild(createItemListElement(product));
}


function updateTotal(valueToAdd) {
    if (isNaN(valueToAdd)) {
        throw `tried adding NaN value to total of cart`;
    }
    const total = document.getElementById('total');

    if (isNaN(total.innerText)) {
        throw `total price of cart in NaN value`;
    }
    total.innerText = (Number(total.innerText) + Number(valueToAdd)).toFixed(2);
}


function addToCart(ev) {
    const sn = this.dataset.sn;
    const cartItem = getCartItem(sn) ?? createCartElement(sn);
    updateCartElement(sn)
    updateTotal(getProductBySn(sn).price);
    // console.log(cartItem);
}


function removeFromCart(ev) {
    const sn = this.dataset.sn;
    let cartItem = cartElems.querySelector(`[data-sn=${CSS.escape(sn)}]`);
    const total = document.getElementById('total');
    updateTotal(Number(cartItem.dataset.price) * -1);
    cartItem.remove();
}


function main() {
    const total = document.getElementById('total');
    total.innerText = '0';
    for (let item of randItems) {
        addItem(new Product(item, randNum(1, 5), randNum(1, 5), randNum(1, 5)));
    }
}


main();