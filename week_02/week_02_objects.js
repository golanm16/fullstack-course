
let password = 'key';

let person = {
    f_name: 'golan',
    l_name: 'matuf',
    age: 28,
    address: 'kokhav yaakov',
    is_father: true,
    kids: [1, 2],
    [password]: '0000'
}
person['age'] == person.age;
person.money = 3;
// console.log(person);

function create_person(f_name, age, is_father) {
    return {
        f_name: f_name,
        age: age,
        is_father: is_father
    }
}

function Person(f_name, age, is_father) {
    this.f_name = f_name;
    this.age = age;
    this.is_father = is_father;
}

let p1 = create_person('avi', 50, true);
let p2 = create_person('david', 15, false);
let p3 = create_person('rina', 54, false);
let p = new Person('gila', 9, false);

for(i in p1){
    console.log(i+p1[i]);
}