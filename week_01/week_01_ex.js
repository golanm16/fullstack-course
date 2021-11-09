// // ex 01: numbers array

// let arr = [8, 1.6, 0.1, 22, 15, 8.8, 54.1, 1000];
// let dec_arr = [];
// let sum = 0, max = 0, min = Infinity;
// for (i = 0; i < arr.length; i++) {
//     if (!Number.isInteger(arr[i])) {
//         dec_arr.push(arr[i]);
//         min = (arr[i] < min) ? arr[i] : min;
//         max = (arr[i] > max) ? arr[i] : max;
//     }
//     else {
//         sum += arr[i];
//     }
// }

// console.log(`the sum of the removed number is: ${sum}`);

// console.log(`the max number in the new array is ${max}, and the min is ${min}.`);


// // ex 02: grades

// let grades = [];

// while (true) {
//     let temp_grade = prompt("enter a single grade betwwen 0 and 100");
//     // check that input is number
//     if (isNaN(temp_grade)) {
//         console.log('must be a number');
//         continue;
//     }
//     temp_grade = Number(temp_grade);
//     // check that input number is less that or equal to 100
//     if (temp_grade > 100) {
//         console.log('grade cant be bigger than 100');
//         continue;
//     }
//     // check if input is negative and stop the inputs
//     if (temp_grade < 0) {
//         console.log('negative number recieved, ending adding grades');
//         break;
//     }
//     // if grade is number and is between 0 and 100:
//     // insert it to the grades array
//     grades.push(temp_grade);
// }
// let sum = 0;
// // let  max = 0, min = Infinity;
// for (i = 0; i < grades.length; i++) {
//     sum += grades[i];
//     // min = (grades[i] < min) ? grades[i] : min;
//     // max = (grades[i] > max) ? grades[i] : max;
// }
// grades.sort((a, b) => a - b);

// console.log(`the class has ${grades.length} students`);
// console.log(`the average of the class is: ${sum / grades.length}`);
// console.log(`the max grade is ${grades[grades.length - 1]}, and the min grade is ${grades[0]}.`);
// // console.log(`the max grade is ${max}, and the min grade is ${min}.`);
// grades.reverse();
// console.log(`the sorted grades array is: \n${grades}`);

// // ex 03: reverse implementation

// let arr = [1, 2, 3, 4, 5, 6];
// let rev_arr = [];

// for (i = 0; i < arr.length; i++) {
//     rev_arr.unshift(arr[i]);
// }
// arr = rev_arr;
// console.log(arr);

// // ex 04: popular number

// let arr=[8, 'a', 'a', 'a', 12, 8, 'a', 3, 'a', 12, 4, 9, 3];
// let popular;
// let popular_counter=0;
// let counter = 0;
// arr.sort();
// //arr.reverse();
// for(i=0;i<arr.length;i++){
//     counter++;
//     if(counter>popular_counter){
//         popular_counter = counter;
//         popular = arr[i];
//     }
//     // check if the next item exists and than check if equal
//     if(arr[i+1]&&arr[i]!==arr[i+1]){
//         counter = 0;
//     }
// } 
// console.log(arr);
// console.log(`the popular item is: ${popular} and the item repeats ${popular_counter} times`);
