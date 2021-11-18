import { BirthDate, Person } from './classes.js';

function generate_people(users_db) {
  add_user(users_db,
    'Sason', 'Yaakov', 123456789, "Be'er Sheva", 15, 5, 1998);
  add_user(users_db,
    'gila', 'bueno', 458549870, "Be'er yaakov", 24, 8, 1992);
  add_user(users_db,
    'mani', 'mono', 845879851, 'shaar binyamin', 1, 5, 1985), 123456789;
  add_user(users_db,
    'mina', 'teqala', 558406589, 'Tel Aviv', 5, 11, 2003), 845879851;
  add_user(users_db,
    'juju', 'hita', 854789658, 'new new york', 11, 8, 1991);
  add_user(users_db,
    'yehezkel', 'zrubavelovich', 987654321, 'dimona', 10, 2, 1999);
  try {
    add_user(users_db,
      'a', 'a', 987654321, 'a', 1, 1, 2001);
  } catch (e) {
    console.error(`error generating people:\n${e}`);
  }
  delete_user(users_db,987654321);
  try {
    add_user(users_db,
      'a', 'a', 987654321, 'a', 1, 1, 2001);
  } catch (e) {
    console.error(`error generating people:\n${e}`);
  }
}


function add_user(db, first_name, last_name, id, city,
  day, month, year, parent_id) {
  try {
    // database related properties check
    // check that id is not in the database
    if (db.map(p => p.id).includes(id)) {
      throw `id ${id} already exists in database`;
    }
    // check that if parent id exists, there is a person in the database with this id
    if (parent_id && !db.map(p => p.id).includes(parent_id)) {
      throw `parent id ${parent_id} not in the database`;
    }
    db.push(new Person(first_name, last_name, id, city,
      new BirthDate(day, month, year), parent_id));
  } catch (e) {
    throw `Error adding user to database:\n${e}`;
  }
}

function delete_user(user_db, user_id) {
  let user_index = user_db.map(p => p.id).indexOf(user_id);
  if (user_index != -1) {
    //TODO: delete his children form the db
    user_db.splice(user_index, 1);
  } else {
    throw `Error deleting user:
user with id: ${user_id} does not exist in th database`
  }
}

function main() {
  const user_db = [];
  generate_people(user_db);
  console.table(user_db);
  console.log(user_db[0].birth_date);
}

// let user_db = generate_people();
// console.table(user_db);
main();
