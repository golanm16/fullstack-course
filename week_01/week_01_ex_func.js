
function get_rand(min, max){
    return Math.round(Math.random()*(max-min)+min);
}

function get_rand_arr(size, min, max){
    let arr = [];
    for(i=0;i<size;i++){
        arr.push(get_rand(min, max));
    }
    return arr;
}

function add_nums(a, b){
    return a+b;
}

function sum_rand_arr(arr){
    let sum = 0;
    for(item of arr){
        sum = add_nums(sum, item);
    }
    return sum;
}
let arr = get_rand_arr(10,5,15);
console.log(arr);
let sum = sum_rand_arr(arr);
console.log(sum);