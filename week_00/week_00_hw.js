// Author: Golan Matuf
// Date: 20211104 / 04.11.2021

// Loops & Methods homework

// ex 01

let fruits_string = "applE, BanaNa, Kiwi, AvOCado, CheRry, FiGs, LeMon, GrapEs";
let fruits = fruits_string.split(", ");

for (i = 0; i < fruits.length; i++) {
    // the current fruit =  the first letter in uppercase 
    // + the of the fruit in lowercase + '|'(seperator) + the length of the fruit
    fruits[i] = fruits[i][0].toUpperCase() + fruits[i].substring(1).toLowerCase() + '|' + fruits[i].length;
}
fruits_string = fruits.join(", ");
console.log(fruits);
console.log(fruits_string);

// ex 02
let my_string = "asdfASDF";
let my_string_copy = my_string;

let correct_guesses = 0;
let guess_num = 0;
while (guess_num < 4) {
    let guess = prompt("guess a single char from my word");
    if (guess.length != 1) {
        console.log('must guess only a single char');
        continue;
    }
    // guess length is 1
    guess_num++;
    if (my_string.toLowerCase().includes(guess.toLowerCase())){
        correct_guesses++;
        console.log('guess was successful!');

        // remove the correct guess from my word
        // (my very own first anticheat)
        my_string = my_string.replaceAll(guess.toLowerCase(),'');
        my_string = my_string.replaceAll(guess.toUpperCase(),'');
    }
    else{
        console.log('guess was incorrect');
    }
}
console.log(`you guessed ${correct_guesses}/4 correctly from the word ${my_string_copy}`);
console.log(`remaining letters: ${my_string}`);


// ex 03 method #1

let line = '';
for (i = 1; i <= 100; i++) {

    for (j = 1; j <= 10; j++){
        line += String(i*j).padEnd(8);
    }
    console.log(line);
    line = '';
}

// ex 03 method #2
multiplication_table = '';
for (i = 1; i <= 100; i++) {

    for (j = 1; j <= 10; j++){
        multiplication_table += String(i*j).padEnd(10);
    }
    multiplication_table += '\n';
}
console.log(multiplication_table);


// ex 04

let my_line = '';
for (i = 1; i <= 100; i++) {

    for (j = 1; j <= 10; j++) {
        line += ((String(i*j).includes('8'))?'boom':String(i * j)).padEnd(10);            
    }
    console.log(line);
    line = '';
}