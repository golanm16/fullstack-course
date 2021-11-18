import { is_valid_month, is_valid_day, is_valid_name, is_valid_id } from './validity_checks.js';

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
    toString() {
        return `${this.day}.${this.month}.${this.year}`;
    }
}

class Person {
    constructor(first_name, last_name, id, city, birth_date, parent_id) {
        if (!is_valid_name(first_name)) {
            throw `${first_name} is an invalid string for first name`;
        }
        if (!is_valid_name(last_name)) {
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
        this.id = Number(id);
        this.city = city;
        this.birth_date = birth_date;
        this.parent_id = parent_id ? Number(parent_id) : "0";
    }
}

export {Person, BirthDate};