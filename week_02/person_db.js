function is_valid_integer(num) {
  return num && !isNaN(num) && Number.isInteger(Number(num));
}

function is_valid_id(id) {
  return is_valid_integer(id) && String(id).length === 9;
}

function is_valid_day(day) {
  return is_valid_integer(day) && day > 0 && day < 32;
}

function is_valid_month(month){
    return is_valid_integer(month) && month > 0 && month < 13;
}

class BirthDate {
  constructor(day, month, year) {
    if (is_valid_day) {
    }
  }
}

class Person {
  constructor(first_name, last_name, id, city, birth_date, parent_id) {
    if (!isNaN(first_name)) {
      throw "invalid string for first name";
    }
    if (!isNaN(last_name)) {
      throw "invalid string for last name";
    }
    if (!is_valid_id(id)) {
      throw "invalid id: must be 9 digit long int";
    }
    if (!isNaN(city)) {
      throw "invalid string for city";
    }
    if (!is_valid_id(parent_id)) {
      throw "invalid parent_id: must be 9 digit long int";
    }
    this.first_name = first_name;
    this.last_name = last_name;
    this.id = id;
    this.city = city;
    this.birth_date = birth_date;
    this.parent_id = parent_id;
  }
}
