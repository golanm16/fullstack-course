// ex 01
let index = 0;
while (index < 10) {
    if (index !== 5) {
        console.log(index);
    }
    index++;
}

// ex 02
let index = 0;
while (index < 11) {
    console.log(index);
    index += 2;
}

// ex 03
let index = 0;
while (index < 78) {
    console.log(index);
    index += 7;
}

// ex 04
let index = 0;
while (index < 300) {
    console.log(index);
    index += 3;
}

// ex 05
let stars = '*';
let lines = 0;
while (true) {
    lines = prompt("enter number of lines to print");
    if (isNaN(lines)) {
        console.log("number of lines must be a number")
        continue;
    }
    lines = Number(lines)
    break
}
let i = 0;
while (i < lines) {
    console.log(stars);
    stars += '*';
    i++;
}

// ex 06
while (true) {
    let three_digit = prompt("enter a three digit number");
    if (isNaN(three_digit)) {
        console.log("input must be only digits");
        continue;
    }
    if (three_digit.length !== 3) {
        console.log("input must be three digits");
        continue;
    }
    console.log(`success! ${three_digit} is a three digit number!`)
    break;
}

// ex 07
/*
בגלל שאנחנו מגדירים את i בכל איטרציה מחדש אנחנו משאירים אות תמיד 0 או 1
*/

// ex 08
let prev_sum = 0;
while (true) {
    let num1 = prompt("enter number 1.\nto exit enter both numbers 0");
    let num2 = prompt("enter number 2.\nto exit enter both numbers 0");
if(num1.length === 0 || num2.length === 0){
    console.log("Error: input can't be empty.");
    continue;
}
if (isNaN(num1) || isNaN(num2) ) {
    console.log("Error: must input numbers.");
    continue;
}
    num1 = Number(num1);
    num2 = Number(num2);
    if (num1 === 0 && num2 === 0) {
        console.log("loop ended after user entered 0,0");
        break;
    }
    sum = num2 + num1;
    console.log("the sum of the numbers is: ", sum);
    if (sum < prev_sum) {
        console.log("the current sum is smaller than the previous sum.");
    }
    prev_sum = sum;
}

// ex 09
while (true) {
    let price_tag = prompt("enter the price of your shopping cart\nto exit enter 0.");
    if (price_tag.length === 0) {
        console.log("Error: input can't be empty.");
        continue;
    }
    if (isNaN(price_tag)) {
        console.log("Error: must input numbers.");
        continue;
    }
    price_tag = Number(price_tag);
    if(price_tag===0){
        console.log("user entered 0. exiting...");
        break;
    }
    if (price_tag > 250) {
        price_tag = price_tag * 0.6;
    }
    else if (price_tag > 100) {
        price_tag = price_tag * 0.8;
    }
    if (price_tag > 400) {
        price_tag -= 50;
    }
    console.log("after calculationg you have", price_tag, "left to pay");
}

// ex 10
// // allowed weight in kilos
// const ALLOWED_WEIGHT_IN_KILO = 10000;
// let current_weight = 0;
// // allowed volume in squared cm
// const ALLOWED_VOLUME_IN_SQCM = 3200;
// let current_volume = 0;


// while (current_weight < ALLOWED_WEIGHT_IN_KILO && current_volume < ALLOWED_VOLUME_IN_SQCM) {
//     let weight_left = ALLOWED_WEIGHT_IN_KILO - current_weight;
//     let volume_left = ALLOWED_VOLUME_IN_SQCM - current_volume;

//     let weight_input = prompt("enter your package weight in kilos.\n" + weight_left + "k left");
//     let volume_input = prompt("enter your package volume in cm².\n" + volume_left + "cm² left");

//     // check if inputs are empty
//     if (weight_input.length === 0 || volume_input.length === 0) {
//         console.log("Error: input can't be empty.");
//         continue;
//     }

//     // check if inputs are not numbers
//     if (isNaN(weight_input) || isNaN(volume_input)) {
//         console.log("Error: must input numbers.");
//         continue;
//     }

//     // converts inputs to type Number
//     weight_input = Number(weight_input);
//     volume_input = Number(volume_input);

//     // check if inputs are negative numbers
//     if (weight_input < 0 || volume_input < 0) {
//         console.log("Error: input must be positive number.");
//         continue;
//     }

//     // add the weight and volume to the weight and volume already on the truck
//     current_weight += weight_input;
//     current_volume += volume_input;

//     console.log("trucks' weight:", current_weight);
//     console.log("trucks' volume:", current_volume);
// }
// let reason = '';
// reason += current_volume>=ALLOWED_VOLUME_IN_SQCM?'truck reached full volume\n':'';
// reason += current_weight>=ALLOWED_WEIGHT_IN_KILO?'truck reached weight limit\n':'';

// console.log("can't put any more packages.\n reason:",reason)