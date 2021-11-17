function check_valid_id(id){
    return isNaN(id)||String(id).length!==9||!Number.isInteger(Number(id));
}

function Person(first_name,
    last_name,
    id,
    city,
    birth_date,
    parent_id){
        if(!isNaN(first_name)){
            throw 'invalid string for first name';
        }
        if(!isNaN(last_name)){
            throw 'invalid string for last name';
        }
        if(){
            throw 'invalid id: must be 9 digit long int';
        }
        if(!isNaN(city){
            throw 'invalid string for city';
        }
        if(isNaN(parent_id)||String(parent_id).length!==9||!Number.isInteger(Number(parent_id))){
            throw 'invalid parent_id: must be 9 digit long int';
        })
    }