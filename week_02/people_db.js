import { BirthDate, Person } from './classes.js';

const USER_DB = [];

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

  try {
    add_user('a', 'a', 987654321, 'a', 1, 1, 2001);
  } catch (e) {
    console.error(`error generating people:\n${e}`);
  }

  delete_user(987654321);
  //delete_user(users_db,558406589);


  try {
    add_user('a', 'a', 987654321, 'a', 1, 1, 2001);
  } catch (e) {
    console.error(`error generating people:\n${e}`);
  }

  edit_user(123456789, '', '', 'zichron');

  try {
    edit_user(987654322, 'a', 1, 1, 2001);
  } catch (e) {
    console.error(`error editing user:\n${e}`);
  }
  console.log(print_user(123456789, true));

  console.log(search_user_by_str('l'));
}

/**
 * 
 * @param {number} user_id the user id to look for
 * @returns the index of the user that have the id
 */
function get_user_index(user_id) {
  let index = USER_DB.map(p => p.id).indexOf(user_id);
  if (index == -1) {
    throw `Error getting user location in database
user with id ${user_id} was not fount in the database.`
  }
  return index;
}

function get_user_children(user_id) {
  return USER_DB.filter(p => p.parent_id == user_id);
}

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
    if (parent_id && !USER_DB.map(p => p.id).includes(parent_id)) {
      throw `parent id ${parent_id} not in the database`;
    }
    USER_DB.push(new Person(first_name, last_name, id, city,
      new BirthDate(day, month, year), parent_id));
  } catch (e) {
    throw `Error adding user to database:\n${e}`;
  }
}
/**
 * delete a usr from a database
 * @param {number} user_id the id of the user to delete
 */
function delete_user(user_id) {
  try {
    let user_index = get_user_index(user_id);
    // delete his children form the db using recursion
    get_user_children(user_id)
      .forEach(child => delete_user(child.id));

    // delete the user
    USER_DB.splice(user_index, 1);

  } catch (e) {
    console.error(`Error deleting user:\n${e}`)
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
  let edited = { first_name, last_name, city };
  try {
    let user = USER_DB[get_user_index(user_id)];
    for (let key in edited) {
      if (edited[key]) {
        user[key] = edited[key];
      }
    }
  } catch (e) {
    console.error(`Error editing user ${user_id}:\n${e}`)
  }
}

function get_input(msg) {
  return prompt(msg);
}

function print_user(user_id, print_children) {
  let msg = search_user_by_id(user_id).toString();
  if (print_children) {
    let children_msg = '';
    let childern = get_user_children(user_id);
    msg += childern.length != 0 ?
      `\nchildren:\n${print_multi_user(childern)}` : `\nno children found`;
  }
  return msg;
}

function print_multi_user(users) {
  // added '[1] ' because the first item is the accumulator, and ignores my formatting
  return '[1]\n' + users
    .reduce((prev_v, curr_v, i) => `${prev_v}\n[${i + 1}]\n${curr_v.toString()}\n`);
}

/**
 * 
 * @param {number} user_id 
 * @returns the user with the given id
 */
function search_user_by_id(user_id) {
  try {
    return USER_DB[get_user_index(user_id)];
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

function main() {
  generate_people(USER_DB);
  console.table(USER_DB);

}

// let user_db = generate_people();
// console.table(user_db);
main();
