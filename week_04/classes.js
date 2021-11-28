const generated_sns = [];

function generate_sn() {
    const min_sn = 100000000;
    const max_sn = 999999999;
    let sn_exists = false;
    let rand_sn;
    do {
        rand_sn = Math.floor(min_sn + Math.random() * (max_sn - min_sn));
        sn_exists = generated_sns.includes(rand_sn);
    } while (sn_exists);
    generated_sns.push(rand_sn);
    return rand_sn;
}



function validate(prop, type) {
    const num_types = ['price', 'weight', 'volume']
    if (type === 'product_name') {
        return prop && isNaN(prop);
    }
    if (num_types.includes(type)) {
        return prop && !isNaN(prop);
    }
    return true;
}

class Product {
    constructor(product_name, price, weight, volume, sn) {
        const obj = { product_name, price, weight, volume, sn };
        for (let key in obj) {
            if (validate(obj[key], key)) {
                this[key] = isNaN(obj[key]) ? obj[key] : Number(obj[key])
            }else{
                throw `invalid prop: ${key}: ${obj[key]} `
            }
        }
        if (!sn) {
            this.sn = generate_sn();
        }
    }
}

let p = new Product('asd', '5.53', 1, 1);

console.log(p);