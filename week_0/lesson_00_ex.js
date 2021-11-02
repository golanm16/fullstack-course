// ex 01

let color = prompt("enter light color");

let msg = (color === "red") ? "stop!" : (color === "green") ? "go!" :  (color === "orange") ? "slow down!" : "color not recognized";

console.log(msg)


// ex 02

let speed;
while (true) {
    speed = prompt("enter car speed");
    if (!isNaN(speed)) {
        speed = Number(speed);
        break;
    }
    console.log("must be a number");
}
msg = (speed < 40) ? "drive already!" :  ( speed < 80) ? "have a good drive" :  (speed < 120) ? "slow down!" : "stop now!";

console.log(msg);


// ex 03

let num1 = 10, num2 = 20, num3 = 30;

let msg = (num1>num2)?(num1>num3)?`${num1} is big`:`${num3} is big`:(num2>num3)?`${num2} is big`:`${num3} is big`;

console.log(msg);