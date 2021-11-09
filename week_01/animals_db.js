// author: golan

let txt1 = "Dog12, CAT3, LiOn7, DolphiN11, fish6 ".toLowerCase().trim();
let txt2 = "PIG17, bear29, BiRd8, SNAKE39, donkey14 ".toLowerCase().trim();

// get the aimals sorted like:
//[ "12:dog", "3:cat", "7:lion"...
let animals_db = sort_animals((txt1.split(', ')).concat(txt2.split(', ')));


function first_number_index(str_with_num) {
    // return the index of the first digit in the string
    // if no digit was found, return -1
    for (i in str_with_num) {
        if (!isNaN(str_with_num[i])) {
            return i;
        }
    }
    return -1;
}

function get_animal_with_code(animal) {
    // return the animal and the code:
    // 'code':'animal'
    return String(animal).slice(first_number_index(animal))
        + ':'
        + String(animal).slice(0, first_number_index(animal));
}

function sort_animals(animals_mess) {
    // sort the animals recieved in the start with my own protocol
    let animals_sorted = [];
    for (animal of animals_mess) {
        animals_sorted.push(get_animal_with_code(animal));
    }
    return animals_sorted;
}

function get_code(rec) {
    return rec.split(':')[0];
}

function get_animal(rec) {
    return rec.split(':')[1];
}

function get_animal_by_code(code) {
    for (rec of animals_db) {
        if (code == get_code(rec))
            return get_animal(rec);
    }
    throw `animal with code ${code} not found`;
}
function get_code_by_animal(animal) {
    for (rec of animals_db) {
        if (animal == get_animal(rec))
            return get_code(rec);
    }
    throw `animal with name ${animal} not found`;
}
function add_animal(code, animal_name){
    if(isNaN(code)){
        throw `given code: ${code} is not a number!`
    }
    if(!animal_name){
        throw "animal name can't be empty";
    }
    animals_db.push()

}
let keep_going = true;
while (keep_going) {
    cmd = prompt("welcome to the animal database!\n"
        + "please enter a command:"
        + "1: search by animal code."
        + "2: search by animal name."
        + "3: add an animal(TBD)."
        + "4: remove an animal(TBD)."
        + "0: exit database.");
    if (isNaN(cmd)) {
        console.log('command must be a number');
        continue;
    }
    cmd = Number(cmd);
    if (cmd < 0 || cmd > 4 || !Number.isInteger(cmd)) {
        console.log('command must be an integer between 0 and 4');
    }
    switch (cmd) {
        case 0:
            //0: exit database.
            keep_going = false;
            break;
        case 1:
            //1: search by animal code.
            code = prompt('enter animal code');

            console.log(`animal code: ${code}.\n`
                + `name of the animal: ${get_animal_by_code(code)}`);
                break;

        case 2:
            //2: search by animal name.
            animal_name = prompt('enter animal name').toLowerCase();

            console.log(`animal name: ${animal_name}.\n`
                + `code of the animal: ${get_code_by_animal(animal_name)}`);
            break;

        case 3:
            //3: add an animal(TBD).
            console.log('add an animal not command implemented yet');
            break;

        case 4:
            //4: remove an animal(TBD).
            console.log('remove an animal command not implemented yet');
            break;
        default:
            console.log('irrational behavior: not supposed to get here');

    }
}




