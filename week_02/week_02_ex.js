num_arr = [1, 2, 5, 5, 6, 4, 8, 465, 2.55465, 84651, -544, 770, 22, 5, 123, 456, 1112, 102, 321];

let sep = String.raw`==================================================`;

console.log(sep);
console.log('is bigger than 150?');
console.log(sep);

num_arr.filter(v => v > 150).forEach(v => console.log(`${v} is bigger than 150`));

console.log(sep);
console.log('values length:');
console.log(sep);

num_arr.forEach((v, i) => console.log(`[${i}] ${v}|${String(v).length}`));

console.log(sep);
console.log('is length bigger than 2');
console.log(sep);

num_arr.filter(v => String(v).length > 2).forEach(v => console.log(`${v} length is bigger than 2`));

console.log(sep);
console.log('does my array contains 770?');
console.log(sep);

console.log(`my array ${num_arr.some(v => v == 770) ? 'contains' : "doesn't contain"} the number 770`);

console.log(sep);
console.log('if equal*2 else*3');
console.log(sep);

num_arr.map(v=>v%2==0?v*2:v*3).forEach((v,i)=>console.log(`[${i}] ${num_arr[i]} -> ${v}`));