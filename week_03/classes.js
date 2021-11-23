import { is_valid_month, is_valid_day, is_valid_name, is_valid_id } from './validity_checks.js';

/**
 * 
 * @param {BirthDate} bday 
 */
function calc_age(bday) {
    let has_bday_passed = false;
    const curr_date = new Date();
    has_bday_passed = curr_date.getMonth() + 1 - bday.month > 0
    if (curr_date.getMonth() == bday.month) {
        has_bday_passed = curr_date.getDate() - bday.day > 0
    }
    if (has_bday_passed) {
        return curr_date.getFullYear() - bday.year;
    }
    return curr_date.getFullYear() - bday.year - 1;
}

class BirthDate {
    /**
     * 
     * @param {number} day day of the month (1-31)
     * @param {number} month month of the year (1-12)
     * @param {nUmber} year year
     */
    constructor(day, month, year) {
        if (!is_valid_day(day)) {
            throw `${day} is an invalid birthdate day`;
        }
        if (!is_valid_month(month)) {
            throw `${month} is an invalid birthdate month`;
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
    /**
     * 
     * @param {string} first_name the first name of the person
     * @param {string} last_name the last name of the person
     * @param {number} id person id - unique key
     * @param {string} city the person city of residence
     * @param {BirthDate} birth_date the date of birth
     * @param {number} parent_id id of the parent, if no parent exist than 0
     */
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
        this.parent_id = parent_id ? Number(parent_id) : 0;
    }
    toString() {
        return `person:
id: ${this.id},
name: ${this.first_name} ${this.last_name},
city of residence: ${this.city},
age: ${calc_age(this.birth_date)}
date of birth: ${this.birth_date},
has parent? ${this.parent_id == 0 ? 'no.' : `yes,
parent id: ${this.parent_id}.`}`;
    }
}

export { Person, BirthDate };