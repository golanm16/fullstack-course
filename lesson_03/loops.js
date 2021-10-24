// console.log('loops')

// infinite loop
// while(5<10){
//     console.log()
// }

// const num = Number(prompt('Enter Number'))

// const num = prompt('Enter Number')
// if(typeof num == Number){
//     num = Number(num)
// }

// while (Number(prompt('Enter Number')) < 5) {
//     console.log('not good')
// }
// console.log('finally')

// 'my length is 15'.length

// let input_name = prompt('enter name: ')

// if name length is bigger than 7 or less than 2
// print a message and ask again

// while (input_name.length > 7 || input_name.length < 2) {
//     console.log('name must be between 2 and 7 characters length')
//     input_name = prompt('enter name: ')
// }
// console.log(input_name + ' name received. have a nice day!')

let students_num = 0;
let max_student_grade = 0;
let min_student_grade = 100;
let grades_sum = 0;

while (true) {
    let grade = prompt("enter grade:");
    if (grade === 'exit') {
        console.log("exiting loop");
        break;
    }
    if (isNaN(grade)) {
        console.log("grade must be a number.");
        continue;
    }
    grade = Number(grade);
    ++students_num;
    grades_sum += grade;
    if (grade < min_student_grade) {
        min_student_grade = grade;
    }
    if (grade > max_student_grade) {
        max_student_grade = grade;
    }
}
let mean = grades_sum / students_num;
console.log("there are", students_num, "students in the class.");
console.log("the mean is:", mean);
console.log("the max grade is:", max_student_grade)
console.log("the min grade is:", min_student_grade)