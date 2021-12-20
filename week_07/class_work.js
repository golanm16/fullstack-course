const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5215;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/', (req,res)=>{
    res.send('hi from home');
})

app.get('/users', (req,res)=>{
    res.send('hi users');
})

app.get('/food/:item/yum/:user', (req,res)=>{
    console.log(req.params);
    const item = req.params.item;
    const user = req.params.user;
    res.send(`${user} picked ${item}`);
})

app.get('/ab*cd', (req,res)=>{
    console.log(req.params);
    const item = req.params.item;
    res.send(`you picked`);
})

app.post('/adduser', (req, res)=>{
    console.log(req.body);
    res.send(` got f ${req.body.firstName} l ${req.body.lastName}`);
})

app.listen(port, ()=>{
    console.log(`example app listening at port ${port}`);
})