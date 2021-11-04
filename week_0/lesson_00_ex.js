// // ex 01

// let color = prompt("enter light color");

// let msg = (color === "red") ?
//  "stop!" : (color === "green") ?
//   "go!" : (color === "orange") ?
//    "slow down!" : "color not recognized";

// console.log(msg)


// // ex 02

// let speed= prompt("enter car speed");
// while (isNaN(speed)) {
//     speed = prompt("must be a number\nenter car speed");
// }
// speed = Number(speed);
// msg = (speed < 40) ?
//  "drive already!" : (speed < 80) ?
//   "have a good drive" : (speed < 120) ?
//    "slow down!" : "stop now!";

// console.log(msg);


// // ex 03

// let num1 = 10, num2 = 20, num3 = 30;

// let msg = (num1 > num2) ?
//  (num1 > num3) ?
//   `${num1} is big` : `${num3} is big` : (num2 > num3) ?
//    `${num2} is big` : `${num3} is big`;

// console.log(msg);

// // truthy/falsey

// let user_name = prompt("enter nickname");
// let first_name = prompt("enter private name");
// let last_name = prompt("enter family name");
// console.log(`hello ${user_name || first_name || last_name || 'anonymous'}`);

// // challenge

// alert('1') || alert('2') || alert('3');

// loops ex
user_input = prompt("enter any string");

code = prompt(`enter command:\n1: print char per line.\n2: print string backward.
3: if string is palindrom.\n4: if string contains a number`);

let user_input_backward = ''
for (i = user_input.length - 1; i >= 0; i--) {
    user_input_backward += user_input[i];
}


if (code == 1) {
    for (i = 0; i < user_input.length; i++) {
        console.log(user_input[i]);
    }
}
else if (code == 2) {

    console.log(user_input_backward)
}
else if (code == 3) {
    msg = (user_input == user_input_backward) ? 'palindrom' : 'not palindrom';
    console.log(`input is ${msg}`);
}
else if (code == 4) {
    let contains_number = false;
    for (i = user_input.length; i >= 0; i--) {
        if (!isNaN(user_input[i])) {
            contains_number = true;
            break;
        }
    }
    msg = contains_number ? "contains a number" : "does not contain a number";
    console.log(`input ${msg}`);
}