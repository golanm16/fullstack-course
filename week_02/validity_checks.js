function is_valid_integer(num) {
    return num && !isNaN(num) && Number.isInteger(Number(num));
}

function is_valid_id(id) {
    return is_valid_integer(id) && String(id).length === 9;
}

function is_valid_name(name) {
    return name && isNaN(name) && !/[a-zA-Z]+/.test(name)
}

function is_valid_day(day) {
    return is_valid_integer(day) && day > 0 && day < 32;
}

function is_valid_month(month) {
    return is_valid_integer(month) && month > 0 && month < 13;
}

export { is_valid_month, is_valid_day, is_valid_name, is_valid_id }