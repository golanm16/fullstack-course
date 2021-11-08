// Author: Golan Matuf
// Date: 20211104 / 04.11.2021

// Math library homework
/*
קלטו מהמשתמש כמות מספרים רצויה, מספר מינימלי ומספר מקסימלי.
הדפיסו את כמות המספרים רנדומליים לפי הכמות שדרש המשתמש , כל מספר יהיה בטווח בין המס' המינימלי למקסימלי.

לשם כך עליכם לעבוד עם ספריית Math .
נא לא לחפש איך מוצאים מספר רנדומלי בגוגל , אלא להפעיל את הראש ולנסות בעצמכם
*/

let number_of_numbers = prompt("enter how many random numbers you want to get");
while (isNaN(number_of_numbers)) {
  number_of_numbers = prompt(
    "must be a number.\nenter how many random numbers you want to get"
  );
}
let max_number = prompt("enter what the maximum number is");
while (isNaN(max_number)) {
  max_number = prompt("must be a number.\nenter what the maximum number is");
}
let min_number = prompt("enter what the minimum number is");
while (isNaN(min_number)) {
  min_number = prompt("must be a number.\nenter what the minimum number is");
}
number_of_numbers = Number(number_of_numbers);
max_number = Number(max_number);
min_number = Number(min_number);

for (i = 0; i < number_of_numbers; i++) {
  console.log(
    `#${i + 1}: ${min_number + Math.random() * (max_number - min_number)}`
  );
}
