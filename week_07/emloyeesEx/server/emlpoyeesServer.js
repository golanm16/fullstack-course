const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const port = 5215;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(cors({ origin: `http://localhost` }));

const employeesArr = [];
const generatedIds = [];

function randNum(a, b) {
    return a + Math.floor(Math.random() * b);
}

function generateId() {
    const minSn = 100000000;
    const maxSn = 999999999;
    let snExists = false;
    let randSn;
    do {
        randSn = Math.floor(randNum(minSn, maxSn));
        snExists = generatedIds.includes(randSn);
    } while (snExists);
    generatedIds.push(randSn);
    return randSn;
}

class Employee {
    constructor(empName) {
        if (!empName) {
            throw `invalid name: '${empName}'`
        }
        this.empName = empName;
        this.id = generateId();
    }
}

function getEmployeeIndex(employeeId) {
    console.log('sending all employees');
    return employeesArr.findIndex(p => p.id == employeeId);
}

app.get('/employees', (req, res) => {
    console.log(`sending all employees`);
    res.send(JSON.stringify(employeesArr));
})


app.get('/employees/:id', (req, res) => {
    const id = req.params.id
    const employee = employeesArr.find(emp => emp.id == id);
    const rsp = {
        isFound: false,
    }
    if (employee) {
        rsp.isFound = true;
        rsp.value = employee;
    }
    res.send(JSON.stringify(rsp));
})

app.post('/employees', (req, res) => {
    console.log('adding employee');
    const rsp = {
        isAdded: false
    };
    try {
        emp = new Employee(req.body.empName);
        employeesArr.push(emp);
        rsp.isAdded = true;
        rsp.added = emp;
        rsp.value = employeesArr;
        // rsp.value = [...employeesArr];
    }
    catch (e) {
        rsp.value = e;
    }
    console.log(rsp);
    res.send(JSON.stringify(rsp));
})

app.put('/employees/:id', (req, res) => {
    const id = req.params.id
    rsp = {
        isUpdated: false
    }
    if (!id) {
        rsp.value = `must have employee id`;
        res.send(JSON.stringify(rsp));
        return;
    }
    const currEmp = employeesArr.find(emp => emp.id == id);
    if (!currEmp) {
        rsp.value = `employee with id ${id} was not found`
        res.send(JSON.stringify(rsp));
        return;
    }
    if (!req.body.empName) {
        rsp.value = `must give employee name to update`
        res.send(JSON.stringify(rsp));
        return;
    }
    rsp.isUpdated = true;
    currEmp.empName = req.body.empName;
    rsp.updated = currEmp
    rsp.value = employeesArr;
    res.send(JSON.stringify(rsp));
})

app.delete('/employees/:id', (req, res) => {
    const id = req.params.id;
    rsp = {
        isDeleted: false
    }
    if (!id) {
        rsp.value = `must have employee id`;
        res.send(JSON.stringify(rsp));
        return;
    }
    const currEmp = employeesArr.find(emp => emp.id == id);
    if (!currEmp) {
        rsp.value = `employee with id ${id} was not found`
        res.send(JSON.stringify(rsp));
        return;
    }
    rsp.isDeleted = true;
    rsp.deleted = employeesArr.splice(getEmployeeIndex(id), 1);
    rsp.value = employeesArr;
    res.send(JSON.stringify(rsp));
})

employeesArr.push(
    {
        "empName": "gabi shoshani",
        "id": 671529215
    },
    {
        "empName": "gili zaguri",
        "id": 922216884
    },
    {
        "empName": "golan matuf",
        "id": 688531456
    },
    {
        "empName": "dani devito",
        "id": 659864815
    },
    {
        "empName": "gila gamliel",
        "id": 465976854
    }
);

employeesArr.forEach(e => generatedIds.push(e.id));
console.log(generatedIds);

app.listen(port, () => {
    console.log(`employees server listening at port ${port}`);
})