/*
alt+shift+up/down: duplicate line
alt+up/down: move currnet line
ctrl+g: jump to line
ctrl+shift+f: search globally 
ctrl+p: current folder files
*/

let arr = [3,4,5];

// get and remove last object
let last = arr.pop();
console.log(arr);
// get and remove first object
let first = arr.shift();
console.log(arr);

// add object to end
arr.push(6);
console.log(arr);
// add object to start and move all to right
arr.unshift(2);
console.log(arr);

// makes arr[1] 'empty'
delete arr[1];
console.log(arr);

let arr2 = arr.concat([7,[8,[9]]]);
console.log(arr);
console.log(arr2);

console.log(arr.includes());

arr2.pop();
console.log(arr2);

