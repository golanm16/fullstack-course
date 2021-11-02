let my_string = 'abcd';
let guesses_left = 4;
let guessed_right = 0;
while(true){
    if(guesses_left===0){
        break;
    }
    let input_char = prompt("guess a character");
    if(input_char.length > 1){
        console.log("must guess only single character");
        continue;
    }
    --guesses_left;
    if(my_string.includes(input_char)){
        console.log(`success! ${input_char} is in my word!`);
        ++guessed_right;
    }
    else{
        console.log(`fail! ${input_char} is in not my word!`);
    }
}
console.log(`you guessed ${guessed_right}/4 guesses right`)