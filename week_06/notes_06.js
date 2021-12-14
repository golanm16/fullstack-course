let i = 0;
const interval = setInterval(() => {
    document.getElementById('id').innerText = ++i
}, 1000);
setTimeout(()=>{
    clearInterval(interval);
    document.getElementById('id').innerText = 'cleared';
}, 10000);