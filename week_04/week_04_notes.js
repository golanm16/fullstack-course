
function getTable() {
    let h = [...document.getElementsByClassName('thead')[0]["cells"]].map(v => v.innerText);
    let arr = [...document.getElementsByClassName('anon')];
    let my_arr = arr.map(v => [...v.cells].map(v2 => v2.innerText));
    return my_arr.map(v => {
        let obj = {};
        for (i in v) {
            obj[h[i]] = v[i];
        }
        return obj;
    });
}

function getTableNoList(){

}

function get_c_let(arr, letter){
    return arr.filter(v=>v['Country'][0]==letter);
}

function do_stuff(ev){
    console.log(new Date());
    console.log(ev);
    console.log(this);
}

function more(){
    this.onclick=do_stuff
    console.log('more');
}

function plus(){
    this.value = parseInt(this.value)*2;
}

function main()
{
    document.getElementById('btn2').onclick = do_stuff;
    document.getElementById('btn3').addEventListener('click',do_stuff);
    document.getElementById('btn3').addEventListener('click',more);
    document.getElementById('btn4').addEventListener('click',plus);
    
}
main();