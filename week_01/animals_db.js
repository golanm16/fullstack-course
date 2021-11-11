// author: golan

let txt1 = "Dog12, CAT3, LiOn7, DolphiN11, fish6 ".toLowerCase().trim();
let txt2 = "PIG17, bear29, BiRd8, SNAKE39, donkey14 ".toLowerCase().trim();

class Animal {
    constructor(code, name) {
        if (isNaN(code) || !Number.isInteger(Number(code))) {
            throw `in method Animal.constructor():\ngiven code: '${code}' is not an integer!`;
        }
        if (!name) {
            throw "in method Animal.constructor():\nanimal name can't be empty";
        }
        this.code = code;
        this.name = name;
    }
}

Animal.prototype.toString = function () {
    return `animal: code: ${this.code}, name: ${this.name}.`;
}

let animals_db = [];

//#region initial sorting methods. one time use.
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
    try {
        return make_record(String(animal).slice(first_number_index(animal)),
            String(animal).slice(0, first_number_index(animal)));
    } catch (e) {
        throw `in function get_animal_with_code:\n${e}`
    }
}


function sort_animals(animals_mess) {
    // sort the animals recieved in the start with my own protocol
    let animals_sorted = [];
    try {
        for (animal of animals_mess) {
            animals_sorted.push(get_animal_with_code(animal));
        }
    } catch (e) {
        throw `in function sort_animals:\n${e}`
    }
    return animals_sorted;
}
//#endregion


//#region record manipulation functions.
// the only functions that manipulate the record type
// if you you want to change record type, change only here
function sort_animal_db() {
    // sort my database by code smaller -> bigger
    animals_db.sort((a, b) => Number(a.code) - Number(b.code));
}


function make_record(code, name) {
    try {
        return new Animal(code, name);
    } catch (e) {
        throw `in function make_record:\n${e}`
    }
}

function get_code(record) {
    return String(record.code);
}

function get_animal(record) {
    return String(record.name);
}
//#endregion


// get the aimals sorted like:
//[ "12:dog", "3:cat", "7:lion"...
try {
    animals_db = sort_animals((txt1.split(', ')).concat(txt2.split(', ')));
    sort_animal_db();
} catch (e) {
    console.error(`in main code block file "animals_db.js":\n${e}`);
}

//#region commands functions
// functions that need animal_db to exist
// add/change here if you want to add/change commands

function get_animal_by_code(code) {
    if (isNaN(code)) {
        throw 'animal code must be a number';
    }
    if(!code){
        throw `animal code can't be empty`;
    }
    for (rec of animals_db) {
        if (code == get_code(rec))
            return get_animal(rec);
    }
    throw `animal with code '${code}' was not found`;
}

function search_animals_by_string(str) {
    if(!str){
        throw `search string can't be empty`;
    }
    let animals_res = [];
    for (rec of animals_db) {
        if (get_animal(rec).includes(str)) {
            animals_res.push(rec.toString());
        }
    }
    if (animals_res.length === 0) {
        throw `animal with string '${str}' in their name was not found`;
    }
    return animals_res;
}
function add_animal(code, animal_name) {
    if (isNaN(code) || code === '') {
        throw `given code: '${code}' is not a number!`;
    }
    if (!animal_name) {
        throw "animal name can't be empty";
    }
    for (item of animals_db) {
        // throw an exception if animal code or name was already in the database
        if (get_animal(item) === animal_name) {
            throw `animal with the name '${animal_name}' was already in the database.`
            + `record found: ${item}`;
        }
        if (get_code(item) === code) {
            throw `animal with the code '${code}' was already in the database.`
            + `record found: ${item}`;
        }
    }
    try {
        animals_db.push(make_record(code, animal_name));
        sort_animal_db();
    } catch (e) {
        throw `in function add_animal:\n${e}`
    }
}

function delete_animal(code) {
    if (isNaN(code) || code === '') {
        throw `given code: '${code}' is not a number!`;
    }
    let delete_index = null;
    for (i in animals_db) {
        if (get_code(animals_db[i]) === code) {
            delete_index = i;
            break;
        }
    }
    if (delete_index) {
        let deleted_animal = animals_db[delete_index];
        animals_db.splice(delete_index, 1);
        return deleted_animal;
    }
    else {
        throw `animal with code ${code} was not found for deletion`;
    }

}

// TODO: add try/catch to all cases
let welcome_msg = "welcome to the animal database!\n"
    + "please enter a command:\n"
    + "1: search by animal code.\n"
    + "2: search by animal name.\n"
    + "3: add an animal.\n"
    + "4: remove an animal.\n"
    + "5: show entire database. (may take some time)\n"
    + "0: exit database.\n";
let keep_going = true;
let command_codes = [0, 1, 2, 3, 4, 5];
while (keep_going) {
    cmd = prompt(welcome_msg);

    if (isNaN(cmd)) {
        console.log('command must be a number');
        continue;
    }
    cmd = Number(cmd);
    if (!command_codes.includes(cmd) || !Number.isInteger(cmd)) {
        console.log(`command must be one of the following: ${command_codes}`);
        continue;
    }
    switch (cmd) {
        case 0:
            //0: exit database.
            keep_going = false;
            break;
        case 1:
            //1: search by animal code.
            code = prompt('enter animal code');
            try {
                console.log(`searching animal by code ${code}...`);
                console.log(`animal code: ${code}.\n`
                    + `name of the animal: ${get_animal_by_code(code)}`);
            }
            catch (e) {
                console.error(`in search by animal code file "animals_db.js":\n${e}`);
            }
            break;

        case 2:
            //2: search by string.
            let animal_str = prompt('enter string to search in aninal names').toLowerCase();
            try {
                console.log(`searching animal by string ${animal_str}...`);
                let animals_found = search_animals_by_string(animal_str);
                console.log('animals found:');
                for (rec of animals_found) {
                    console.log(rec);
                }
            }
            catch (e) {
                console.error(`in search by string file "animals_db.js":\n${e}`);
            }
            break;

        case 3:
            //3: add an animal.
            let name_add = prompt("enter animal name to add");
            let code_add = prompt(`enter a code for animal ${name_add}`);
            try {
                console.log(`attempting to add animal: ${code_add}: ${name_add}...`);
                add_animal(code_add, name_add);
                console.log(`animal ${name_add} with code ${code_add} was added succesfuly`);
            }
            catch (e) {
                console.error(`in add an animal file "animals_db.js":\n${e}`);
            }
            break;

        case 4:
            //4: remove an animal.
            let code_del = prompt('enter the code of the animal you want to delete');
            try {
                console.log(`attempting to delete animal with code: ${code_del}...`);
                console.log(`successfuly deleted: ${delete_animal(code_del)}`);;
            }
            catch (e) {
                console.error(`in remove an animal file "animals_db.js":\n${e}`);
            }
            break;
        case 5:
            //5: print all the records
            if (animals_db.length === 0) {
                console.log('the database is empty');
            }
            else {
                console.log('showing the full animal database:');
                for (rec of animals_db) {
                    console.log(rec.toString());
                }
                console.log(`the database currently has ${animals_db.length} entries.`);
            }
            break;
        default:
            console.error('something is wrong: not supposed to get here');

    }
}




