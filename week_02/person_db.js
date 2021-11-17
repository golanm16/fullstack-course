import { is_valid_month, is_valid_day, is_valid_name, is_valid_id } from './validity_checks.js';

function generate_people() {
  return [
    new Person('Sason', 'Yaakov', 123456789, "Be'er Sheva", new BirthDate(15, 5, 1998)),
    new Person('gila', 'bueno', 458549870, "Be'er yaakov", new BirthDate(24, 8, 1992)),
    new Person('mani', 'mono', 845879851, 'shaar binyamin', new BirthDate(1, 5, 1985), 123456789),
    new Person('mina', 'teqala', 558406589, 'Tel Aviv', new BirthDate(5, 11, 2003), 845879851),
    new Person('juju', 'hita', 854789658, 'new new york', new BirthDate(11, 8, 1991)),
    new Person('yehezkel', 'zrubavelovich', 987654321, 'dimona', new BirthDate(10, 2, 1999))
  ]
}


class BirthDate {
  constructor(day, month, year) {
    if (!is_valid_day(day)) {
      throw `${day} is an invalid birthdate day`;
    }
    if (!is_valid_month(month)) {
      throw `${day} is an invalid birthdate month`;
    }
    this.day = day;
    this.month = month;
    this.year = year;
  }
}

class Person {
  constructor(first_name, last_name, id, city, birth_date, parent_id) {
    if (!isNaN(first_name)) {
      throw `${first_name} is an invalid string for first name`;
    }
    if (!isNaN(last_name)) {
      throw `${last_name} is an invalid string for last name`;
    }
    if (!is_valid_id(id)) {
      throw `${id} is an invalid id: must be 9 digit long int`;
    }
    if (!isNaN(city)) {
      throw `${city} is an invalid string for city`;
    }
    if (parent_id && !is_valid_id(parent_id)) {
      throw `${parent_id} is an invalid parent_id: must be 9 digit long int`;
    }
    this.first_name = first_name;
    this.last_name = last_name;
    this.id = id;
    this.city = city;
    this.birth_date = birth_date;
    this.parent_id = parent_id ? parent_id : "0";
  }
}

function add_user(db, first_name, last_name, id, city,
  day, month, year, parent_id) {
  try {
    // database related properties check
    // check that id is not in the database
    for (db_id of db.map(p => p.id)) {
      if (id === db_id) {
        throw 'id already exists in database';
      }
    }
    // check that parent id exists, there is a person in the database with this id
    if (parent_id) {
      parent_id_exists = false;
      for (user of db) {
        if (user.id === id) {
          parent_id_exists = true;
          break;
        }
      }
      if (!parent_id_exists) {
        throw 'parent id not in the database';
      }
    }
    db.push(new Person(first_name, last_name, id, city,
      new BirthDate(day, month, year), parent_id));
  } catch (e) {
    throw `Error adding user to database:\n${e}`;
  }
}

function main() {
  const user_db = generate_people();

}

let user_db = generate_people();
console.table(user_db);
//main();
