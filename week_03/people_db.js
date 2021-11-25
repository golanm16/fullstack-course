import { BirthDate, calc_age, Person } from './classes.js';
import { validate } from './validity_checks.js';


// TODO: URGENT!! make all th ecatches inside the functions throw their own errors

/**
 * generate people and start playing with the database
 */
function generate_people() {
  add_user('Sason', 'Yaakov', 123456789, "Be'er Sheva", 15, 5, 1998);
  add_user('gila', 'bueno', 458549870, "Be'er yaakov", 24, 8, 1992);

  add_user('mani', 'mono', 845879851, 'shaar binyamin', 1, 5, 1985, 123456789);

  add_user('mina', 'teqala', 558406589, 'Tel Aviv', 5, 11, 2003, 845879851);

  add_user('juju', 'hita', 854789658, 'new new york', 11, 12, 1991, 558406589);

  add_user('yehezkel', 'zrubavelovich', 987654321, 'dimona', 10, 12, 1999);
  add_user('asd', 'fff', 584868545, 'dimona', 10, 12, 1999);
  add_user('aaffsdv', 'gdsfd', 698548524, 'dimona', 20, 5, 2020);


  //delete_user(users_db,558406589);


  edit_user(123456789, '', '', 'zichron');

  console.log(print_user(123456789, true));

  console.log(search_user_by_str('l'));
}


function generate_id() {
  const min_id = 100000000;
  const max_id = 999999999;
  let rand_id;
  do {
    rand_id = min_id + Math.random() * (max_id - min_id);
    let id_exists = USER_DB.some(v => v.id === rand_id);
  } while (id_exists)
  return rand_id;
}

//#region helper functions for main
/**
 * 
 * @param {number} user_id the user id to look for
 * @returns the index of the user that have the id
 */
function get_user_index(user_id) {
  let index = USER_DB.map(p => p.id).indexOf(Number(user_id));
  if (index == -1) {
    throw `Error getting user location in database
user with id ${user_id} was not fount in the database.`
  }
  return index;
}

function get_user_children(user_id) {
  return USER_DB.filter(p => p.parent_id == user_id);
}
//#endregion

//#region main functions for EX
/**
 * 
 * @param {string} first_name 
 * @param {string} last_name 
 * @param {number} id 
 * @param {string} city 
 * @param {number} day 
 * @param {number} month 
 * @param {number} year 
 * @param {number} parent_id 
 */
function add_user(first_name, last_name, id, city,
  day, month, year, parent_id) {
  try {
    // database related properties check
    // check that id is not in the database
    if (USER_DB.map(p => p.id).includes(id)) {
      throw `id ${id} already exists in database`;
    }
    // check that if parent id exists, there is a person in the database with this id
    if (parent_id && !USER_DB.some(p => p.id == parent_id)) {
      throw `parent id ${parent_id} not in the database`;
    }
    USER_DB.push(new Person(first_name, last_name, id, city,
      new BirthDate(day, month, year), parent_id));
  } catch (e) {
    throw `Error adding user to database:\n${e}`;
  }
}
/**
 * delete a user from the database
 * @param {number} user_id the id of the user to delete
 */
function delete_user(user_id) {
  try {
    let user_index = get_user_index(user_id);
    // delete his children form the db using recursion
    get_user_children(user_id)
      .forEach(child => delete_user(child.id));

    // delete the user and return his string
    return USER_DB.splice(user_index, 1)[0].toString();

  } catch (e) {
    throw `Error deleting user:\n${e}`;
  }
}

/**
 * 
 * @param {number} user_id 
 * @param {string} first_name 
 * @param {string} last_name 
 * @param {string} city 
 */
function edit_user(user_id, first_name, last_name, city) {
  // make an object from the key of the properties you can edit
  let edited = { first_name, last_name, city };
  try {
    // get the user from the database
    let user = USER_DB[get_user_index(user_id)];
    // change properties by key
    for (let key in edited) {
      if (edited[key]) {
        if (validate(edited[key], key))
          user[key] = edited[key];
      }
    }
    return print_user(user_id);
  } catch (e) {
    throw `Error editing user ${user_id}:\n${e}`;
  }
}

function print_user(user_id, print_children) {
  let msg = search_user_by_id(user_id).toString();
  if (print_children) {
    let childern = get_user_children(user_id);
    msg += childern.length != 0 ?
      `\nchildren:\n${print_multi_user(childern)}` : `\nno children found`;
  }
  return msg;
}

/**
 * 
 * @param {number} user_id 
 * @returns the user with the given id
 */
function search_user_by_id(user_id) {
  try {
    return USER_DB[get_user_index(Number(user_id))];
  } catch (e) {
    console.error(`Error searching for user ${user_id}:\n${e}`)
  }
}

function search_user_by_str(str) {
  let msg = '';
  let users_res = USER_DB
    .filter(p => p.first_name.includes(str) || p.last_name.includes(str));
  if (users_res.length == 0) {
    msg = `no users were found with '${str}' in their names.\n`;
  } else {
    msg = `results were found with '${str}':\n${print_multi_user(users_res)}`;
  }
  return msg;
}
//#endregion

function is_palindrome(str) {
  for (i = 0; i < str.length / 2; i++) {
    if (str[i] != str[str.length - 1 - i]) {
      return false;
    }
    return true
  }
}

function get_input(msg) {
  return prompt(msg);
}

function print(msg) {
  console.log(msg);
}

function print_multi_user(users) {
  // added '[1] ' because the first item is the accumulator, 
  // and ignores my formatting inside the reduce

  return users.length == 0 ? '' : '[1]\n' + users
    .reduce((prev_v, curr_v, i) => `${prev_v}\n[${i + 1}]\n${curr_v.toString()}`);
}

const USER_DB = [];
const COMMANDS = ['0', '1', '2', '3', '4', '5', '6', '9'];
const MORE = ['1', '2', '3', '4'];
const more_msg = `more commads:
[1]. show persons above some age
[2]. a person children
[3]. a. month%2==0
     b. children>2
     c. his or one of his children name is palindrome
[4]. show every city and its residents`;
const welcome_msg = `welcome to the people database made by golan.
  available commands:
  [1] search user by id.
  [2] search user by string.
  [3] add new user.
  [4] delete existing user.
  [5] edit existing user.
  [6] show advanced commands
  [9] show full database(may take some time).
  [0] exit.`;

function main() {
  generate_people(USER_DB);
  console.table(USER_DB);

  let keep_going = true;
  while (keep_going) {

    const cmd = get_input(welcome_msg);

    // if command is not in recognized commands
    if (!COMMANDS.includes(cmd)) {
      console.error(`'${cmd}' is an urecognized command.`);
      continue;
    }

    // act by command
    switch (cmd) {

      //exit
      case '0':
        print(`exiting database...`)
        keep_going = false;
        break;

      // search user by id
      case '1':
        // get user id
        let id = get_input('enter user id to search');
        // ask if he wants to see the person children
        let see_children = confirm('do you want to see his kids?')
        try {
          print(print_user(id, see_children));
        }
        catch (e) {
          console.error(`Error while searching fr user by id: ${e}`);
        }
        break;

      //search user by string
      case '2':
        let str = get_input('enter string to search in users');
        try {
          print(search_user_by_str(str));
        }
        catch (e) {
          console.error(`Error while searching for users by string: ${e}`);
        }
        break;

      //add new user
      case '3':
        let input = get_input('enter:\nfirst_name last_name id city day month year parent_id with space in between');
        let arr = input.split(' ');
        console.log(arr);
        try {
          console.log(`adding user:`);
          add_user(arr[0], arr[1], arr[2], arr[3]
            , arr[4], arr[5], arr[6], arr[7]);
        } catch (e) {
          console.error(`Error in adding new user: ${e}`);
        }
        break;

      //delete existing user
      case '4':
        let delete_id = get_input('enter the id of the person you want ot delete');
        try {
          print(`user deleted:\n${delete_user(delete_id)}`);
        }
        catch (e) {
          console.error(`failed deleting user:\n${e}`);
        }
        break;

      //edit existing user
      case '5':
        let edit_id = get_input('enter the id of the user you want to change');
        try {
          print(print_user(edit_id));
        } catch (e) { }
        try {
          let edit_fname = get_input(`enter new first name`);
          let edit_lname = get_input(`enter new last name`);
          let edit_city = get_input(`enter new city`);
          print(edit_user(edit_id, edit_fname, edit_lname, edit_city));
        }
        catch (e) {
          console.error(e);
        }
        break;
      // cuts, queries, and reports
      case '6':
        try {

          const adv_cmd = get_input(more_msg);
          switch (adv_cmd) {

            // filter by age
            case '1':
              let input_age = get_input(`enter age`);
              if (isNaN(input_age)) {
                throw `age need to be a number. got: ${input_age}`;
              }
              print(print_multi_user(USER_DB.filter(v => calc_age(v.birth_date) > input_age)));

            // show children
            case '2':
              id = get_input(`enter the id of person to show his children`);
              if (!validate(id, 'id')) {
                throw `${id} is an invalid id`;
              }
              print_multi_user(get_user_children(id));

            // show with palindrome and more
            case '3':
              p_arr = USER_DB.filter(v => {
                children = get_user_children(v.id);
                return v.birth_date.month % 2 == 0
                  && children.length > 2
                  && (is_palindrome(v.first_name) || childern.some(v => is_palindrome(v.first_name)))
              });
              print(print_multi_user(p_arr));

            // print users by city
            case '4':
              const cities = new Set(USER_DB.map(v => v.city));
              for (let city of cities) {
                print(`City: ${city}.`);
                print(print_multi_user(USER_DB.filter(v => v.city == city)));
              }
              print(cities);
              break;

            default:
              print(`urecognized command`)
          }
        } catch (e) {
          print(e);
        }
        break;

      //show full database(may take some time)
      case '9':
        console.table(USER_DB);
        break;
      
      default:
        //dont get in here
        console.error(`how did you get here? msg me`);
    }

  }
}

// let user_db = generate_people();
// console.table(user_db);
main();
