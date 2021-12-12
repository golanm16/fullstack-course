// import { Product } from "./classes";
const randItems = ['pinapple', 'krembo', 'rice', 'water', 'cola', 'bamba luli', 'chocobo'];
const itemsElems = document.getElementById('item_list');
const cartElems = document.getElementById('cart_list');
const cardBack = 'https://i.pinimg.com/originals/4d/40/95/4d4095cc1994dfda327e2856d0a8c203.jpg';



function randNum(a, b) {
    return (a + Math.random() * (b - a)).toFixed(2);
}


function storeGeneratedSns(generated) {
    localStorage.generatedSns = JSON.stringify(generated);
}
function storeCartItems(cart) {
    localStorage.cart = JSON.stringify(cart);
}
function storeStoreItems(items) {
    localStorage.items = JSON.stringify(items);
}
function storeTotal(total) {
    localStorage.total = JSON.stringify(total);
}


function retrieveGeneratedSns() {
    return localStorage.generatedSns ? JSON.parse(localStorage.generatedSns) : [];
}
function retrieveCartItems() {
    return localStorage.cart ? JSON.parse(localStorage.cart) : [];
}
function retrieveStoreItems() {
    return localStorage.items ? JSON.parse(localStorage.items) : [];
}
function retrieveTotal() {
    return localStorage.total ? JSON.parse(localStorage.total) : 0;
}

function generateSn() {
    const minSn = 100000000;
    const maxSn = 999999999;
    let snExists = false;
    let randSn;
    const generatedSns = retrieveGeneratedSns();
    do {
        randSn = Math.floor(randNum(minSn, maxSn));
        snExists = generatedSns.includes(randSn);
    } while (snExists);
    generatedSns.push(randSn);
    return randSn;
}


function validate(prop, type) {
    const num_types = ['price', 'weight', 'volume', 'count']
    if (type === 'productName') {
        return prop && isNaN(prop);
    }
    if (num_types.includes(type)) {
        return !isNaN(prop);
    }
    if (type === 'sn') {
        return !isNaN(prop) && String(prop).length == 9;
    }
    return true;
}


class Product {
    constructor(productName, price = randNum(1, 5), weight = randNum(1, 5),
        volume = randNum(1, 5), sn = generateSn()) {
        const obj = { productName, price, weight, volume, sn };
        for (let key in obj) {
            if (validate(obj[key], key)) {
                this[key] = isNaN(obj[key]) ? obj[key] : Number(obj[key]);
            } else {
                throw `invalid prop: ${key}: ${obj[key]} `;
            }
        }
        // if (!sn) {
        //     this.sn = generateSn();
        // }
    }
}


class CartItem {
    constructor(sn, count) {
        this.sn = sn;
        this.count = count;
    }
}

function getProductBySn(sn) {
    return retrieveStoreItems().find(v => v.sn == sn);
}


function createItemListElement(product) {
    const elem = document.createElement('li');

    elem.className = 'product';
    elem.dataset.sn = product.sn;
    elem.onclick = evAddToCart;

    elem.appendChild(document.createElement('div'));
    elem.children[0].className = 'pName';
    elem.children[0].innerHTML = product.productName + '<br>' + product.sn;

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


function getCartElem(sn) {
    return cartElems.querySelector(`[data-sn=${CSS.escape(sn)}]`);
}


function updateCartElement(product, el, count) {
    if (isNaN(product.price)) {
        throw `tried adding NaN value to total of cart item`;
    }
    if (isNaN(el.dataset.price)) {
        throw `total price of cart item in NaN value`;
    }
    el.dataset.price = (Number(el.dataset.price) + Number(product.price)).toFixed(2);
    el.children[1].innerHTML = el.dataset.price + '<br>' + count;
}




function addItem(product) {
    const storeItems = retrieveStoreItems();
    storeItems.push(product);
    storeStoreItems(storeItems);
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
    localStorage.total = total.innerText;
}

function addToCart(sn) {
    let cartElem = getCartElem(sn);
    if (!cartElem) {
        cartElem = createCartElement(sn);
    }
    const cart = retrieveCartItems();
    let cartItem = cart.find(v => v.sn == sn);
    if (!cartItem) {
        cartItem = new CartItem(sn, 0);
        cart.push(cartItem);
    }
    cart.find(v => v.sn == sn).count++;
    updateCartElement(getProductBySn(sn), cartElem, cartItem.count);
    storeCartItems(cart)
    updateTotal(getProductBySn(sn).price);
}

function submitItemField(ev){
    ev.stopPropagation();
}

function submitItem() {
    const prod_name = document.getElementById('addField').value;
    if(!prod_name){
        console.log('empty product name');
        return;
    }
    addItem(new Product(prod_name));
}


function cancelAdd(ev){
    this.remove();
}


function evAddItem() {
    let addDiv = document.createElement('div');
    let addInnerDiv = document.createElement('div');
    let addField = document.createElement('input');
    let addBtn = document.createElement('button');
    addDiv.onclick = cancelAdd;
    addDiv.id = 'addDiv';
    addField.id = 'addField';
    addField.placeholder = 'product name';
    addField.onclick = submitItemField;
    addField.type = 'text';
    addBtn.onclick = submitItem;
    addBtn.innerText = 'add item';
    addInnerDiv.appendChild(addField);
    addInnerDiv.appendChild(addBtn);
    addDiv.appendChild(addInnerDiv);
    document.getElementById('main').appendChild(addDiv);

}

function evAddToCart(ev) {
    addToCart(this.dataset.sn);
}


function removeFromCart(ev) {
    const sn = this.dataset.sn;
    const cartElem = cartElems.querySelector(`[data-sn=${CSS.escape(sn)}]`);
    const total = document.getElementById('total');
    let cartItems = retrieveCartItems();
    const deleteIndex = cartItems.map(v => v.sn).indexOf(sn);
    cartItems.splice(deleteIndex, 1);
    storeCartItems(cartItems);
    updateTotal(Number(cartElem.dataset.price) * -1);
    cartElem.remove();
}


function getAllFromStorage() {
    for (const storeItem of retrieveStoreItems()) {
        itemsElems.appendChild(createItemListElement(storeItem));
    }
    for (const cartItem of retrieveCartItems()) {
        for (let i = 0; i < cartItem.count; i++) {
            const sn = cartItem.sn;
            const cartElem = getCartElem(sn) ?? createCartElement(sn);
            updateCartElement(getProductBySn(sn), cartElem, cartItem.count);
            updateTotal(getProductBySn(sn).price);
        }
    }
}

function init() {

    const total = document.getElementById('total');
    const addItemBtn = document.getElementById('addItemBtn');
    addItemBtn.onclick = evAddItem
    total.innerText = '0';
    if (retrieveStoreItems().length != 0) {
        getAllFromStorage();
    }
    else {
        for (let prod_name of randItems) {
            addItem(new Product(prod_name));
        }
    }
}
function main() {
    init();
}


main();