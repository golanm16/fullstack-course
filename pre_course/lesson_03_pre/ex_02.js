let sum = 0;
let num = 0;
while (true) {
    let input_num = prompt("enter number:");
    if (input_num === 'exit') {
        console.log("exiting loop");
        break;
    }
    if (isNaN(input_num)) {
        console.log("number must be a number.");
        continue;
    }
    input_num = Number(input_num)
    ++num;
    sum += input_num
}
console.log(`${num} numbers were entered,\nand their sum is ${sum}`)