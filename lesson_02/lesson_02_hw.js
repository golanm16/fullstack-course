// q01
// let num1 = prompt("enter a number");
// let num2 = prompt("enter another number");
// alert(num1+'*'+num2+'='+num1*num2);

// q02
// let nname = prompt("enter your name");
// let age = prompt("enter your age");
// alert(nname + " is " + age + " years old" );

// q03
// let birth_year = prompt("enter your birth year");
// let age = new Date().getFullYear()-birth_year;
// alert("your age is: " + age);

// q04
// let c_hour = prompt("enter hour");
// let my_string = "";
// if (c_hour>24||c_hour<0){
//     alert("illegal hour");
// }
// else if (c_hour<12 && c_hour>4){
//     alert("good morning");
// }
// else if (c_hour<18 && c_hour>12){
//     alert("good afernoon");
// }
// else if (c_hour<22 && c_hour>18){
//     alert("good evening");
// }
// else{
//     alert("good night");
// }

// q05
// let lucky_guess = prompt("guess the number");
// if(lucky_guess==='47'){
//     alert("you won!");
// }
// else{
//     alert("you failed");
// }

// q06
// let lucky_guess = prompt("enter answer 1: ");
// grade = 0;
// if(lucky_guess === "dog"){
//     alert("your answer is correct");
//     grade += 33;
// }
// else{
//     alert("incorrect answer!");
// }
// lucky_guess = prompt("enter answer 2: ");
// if(lucky_guess === "ship"){
//     alert("your answer is correct");
//     grade += 33;
// }
// else{
//     alert("incorrect answer!");
// }
// lucky_guess = prompt("enter answer 3: ");
// if(lucky_guess === "alien"){
//     alert("your answer is correct");
//     grade += 33;
// }
// else{
//     alert("incorrect answer!");
// }
// if(grade===99){
//     grade = 100;
// }
// alert("your grade is: " + grade);

// q 07
// let word1 = prompt("enter word 1: ");
// let word2 = prompt("enter word 2: ");

// if(word1===word2){
//     alert("you have written the same thing twice");
// }
// else{
//     alert("these are two diferrent things");
// }

// q 08
// אפשר, עם if=== ועם if!==

// q 09
// let num = 2;
// if(num===1){
//     alert("i am 1");
// }
// else{
//     alert("i am not 1");
// }

// q 10
// let foo = true;
// alert("i am " + foo);

// q 11
// let foo = true;
// if(foo){
//     alert("i am true");
// }
// else{
//     alert("i am false");
// }

// q 12
// let foo = 4;
// if(foo>5){
//     alert("i am greater than 5");
// }
// else if(foo<5){
//     alert("i am lesser than 5");
// }
// else{
//     alert("i am equal 5");

// q 13
// let bar = 100;
// if(bar<100){
//     alert("i am lesser than 100");
// }
// else{
//     alert("i am 100 or greater than 100");
// }

// q 14
// if(false){}

// q 15
// if(true){}

// q 16
// let num = 10;
// if(num%2===0){
//     alert("i am even");
// }
// else{
//     alert("i am odd");
// }

// q 17
// let my_num = 47;
// let user_num = prompt("enter a number");
// if(user_num>my_num){
//     alert("your number is bigger");
// }
// else if(user_num<my_num){
//     alert("my number is bigger");
// }
// else{
//     alert("we chose the same number!");
// }
// alert("finished checking");

// q 18
// let num1 = prompt("enter a number");
// let num2 = prompt("enter a number");
// let num3 = prompt("enter a number");

// if(num1>num2&&num1>num3){
//     alert(num1);
// }
// else if(num2>num1&&num2>num3){
//     alert(num2);
// }
// else{
//     alert(num3);
// }

// q 19
// let user_name = prompt("Who's there?")
// if(user_name===''){
//     alert("canceled");
// }
// else if(user_name==='Admin'){
//     let user_password = prompt("what is the password?");
//     if(user_password===''){
//         alert("canceled");
//     }
//     if(user_password==='TheMaster'){
//         alert("Welcome!");
//     }
//     else{
//         alert("wrong password");
//     }
// }
// else{
//     alert("i dont know you");
// }

// q 20
// let sum = prompt("how much do you need to pay?");
// let tip = 0;
// if(sum>50&&sum<200){
//     tip = sum*0.15;
// }
// else if(sum>=200){
//     tip = sum*0.2;
// }
// alert("original sum: "+sum+".\ntip size: "+tip+".\nsum with tip: "+(Number(sum)+Number(tip))+".");

// q 21
// let traffic_color = prompt("enter a color: ");

// if(traffic_color==='red'){
//     alert("stop");
// }
// else if(traffic_color==='yellow'){
//     alert("slow down");
// }
// if(traffic_color==='red'){
//     alert("drive");
// }