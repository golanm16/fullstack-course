// let s = 'string';
// let o = { o: "object" };
// // print object name with the object details
// console.log({ s, o });
// s.slice
// //TODO: something
// //FIXME: 
// //

// // function expressions:

// function say_func() {
//     console.log('func');
// }

// let say_func_exp = function () {

// }

// let say_func_arrow = (s) => {
//     console.log(s);
// }

// function ask(q, yes, no) {
//     let res = confirm(q);
//     if (res) {
//         yes();
//     }
//     else {
//         no();
//     }
// }

// ask("do you want pizza?",
//     () => {
//         ask("do you want with pineapple?",
//             () => {
//                 console.log('disgusting');
//             },
//             ()=> {
//                 console.log('yam pizza');
//             });
//     },
//     () => {
//         console.log('you heathen');
//     });
// ask("do you want banana?",
//     () => {
//         console.log('BANANA!!');
//     },
//     () => {
//         console.log('you heathen');
//     });
// ask("do you want Apple?",
//     () => {
//         console.log('macLOVER!!');
//         console.log('(the m1 is goo tho)');
//     },
//     () => {
//         console.log('you heathen');
//     });


/*
//  find
let res = names.find(
    (value, index, arr) => {
        return value.length == 3;
    })
    
    console.log(res);
    
    // filter
    res = names.filter(
        (value, index, arr) => {
            return value.length == 3;
        })
        
        console.log(res);
        
        // map
        res = names.map(
            (value, index, arr) => {
                return `${value} string length is ${value.length}`;
            })
            
            console.log(res);
            
            // every
            res = names.every(
                (value, index, arr) => {
                    return isNaN(value);
                })
                
                console.log(res);
                */

let names = ['sason', 'gabi', 'bilet', 'gojjj', 'golan', 'ggg', 'gohan', 'asd', 'tom'];

//find
let res = names.find((v, i) => v.length == 3 && i % 2 === 0);

console.log(res);
//filter
res = names.filter((v, i) => v.includes('as'))

console.log(res);
//map
res = names.map(v => `${v} string length is ${v.length}`)

for (item of res) {
    console.log(item);
}
//every
res = names.every(v => isNaN(v))

console.log(res);

//reduce
res = names.reduce((prev_v, curr_v) => `${prev_v}+${curr_v}`)

console.log(res);

//some
res = names.some(v => v.length === 5)

console.log(res);
