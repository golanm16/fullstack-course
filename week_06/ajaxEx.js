function callbackAction() {
    const xhttp = new XMLHttpRequest();
    console.log('func');
    xhttp.onload = function () {
        console.log(this.responseText);
        const parsedJson = JSON.parse(this.responseText);
        const joke = parsedJson.value.joke;
        document.getElementById('id').innerHTML = joke;
    }
    xhttp.open('POST', 'http://api.icndb.com/jokes/random', true);
    xhttp.send();
}


// function asyncCalls(){
//     const p = new Promise(function(acceptFunc, rejectFunc){
//         if(true){
//             acceptFunc('asd');
//         }
//         else{
//             rejectFunc();
//         }
//     })
// }

function printFetchObj(link) {
    fetch(link)
        .then(v => console.log(v));
}

function printFetchBody(link) {
    fetch(link)
        .then(resp => console.log(JSON.parse(resp)))
        .then(text => console.log(JSON.parse(text)))
        .then(body => console.log(body))
}



function main() {
    usingAsyncAwait('http://api.icndb.com/jokes/random');
    // document.getElementById('click').onclick = callbackAction;
    // // setInterval(() => {
    // //     myFunc();
    // // }, 2500);
    // console.log('done');

}

main();
function usingAsyncAwait(link) {
    const response = await fetch('http://api.icndb.com/jokes/random')
    const text = response.text();
    console.log(text);
}