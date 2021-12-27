const port = 5215;


const employeesElement = document.getElementById('employees');
const formsElement = document.getElementById('forms');
const empSearchResElem = document.getElementById('searcgRes');

const url = `http://localhost:${port}/`;

const EmployeeDiv = (props) => {
    return (
        <React.Fragment>
            <div className='id'>
                {props.emp.id}
            </div>
            <div className='name'>
                {props.emp.empName}
            </div>
        </React.Fragment>
    )
}

const EmployeesUl = (props) => {
    if (props.employees.length > 0) {
        return (
            <React.Fragment>
                {props.employees.map(e =>
                    <li className='employeeLi' onClick={handleEmployeeClicked} >
                        <EmployeeDiv emp={e} />
                    </li>
                )}
            </React.Fragment>
        )
    }
    else {
        return (
            <h1 className='noEmployees'>
                no employees in database yet.
            </h1>
        )
    }
}

async function handleEmployeeClicked(ev) {
    const empId = ev.currentTarget.children[0].innerText;
    const empName = ev.currentTarget.children[1].innerText;

    document.getElementById('searchEmpName').value = empName;
    document.getElementById('EmpId').value = empId

}

const populateEmployees = (employees) => {
    ReactDOM.render(<EmployeesUl employees={employees} />, employeesElement);
}

async function addEmployee(empName) {
    fetch(url + 'employees', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ empName: empName })
    })
        .then(res => res.json())
        .then(data => {
            if (data.isAdded) {
                populateEmployees(data.value);
            }
            else {
                console.error(`error adding employee ${empName}:\n${data.value}`);
            }
        });
}

async function updateEmployee(empId, empName) {
    return fetch(url + 'employees/' + empId, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ id: empId, empName: empName })
    })
        .then(res => res.json())
        .then(data => {
            if (data.isUpdated) {
                populateEmployees(data.value);
                return data;
            }
            else {
                console.error(`error updating employee ${empName}:\n${data.value}`);
            }
        });

}

async function deleteEmployee(empId) {
    fetch(url + 'employees/' + empId, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            if (data.isDeleted) {
                populateEmployees(data.value);
            }
            else {
                console.error(`error deleting employee ${empName}:\n${data.value}`);
            }
        });
}

async function getEmployee(empId) {
    const emp = await fetch(url + 'employees/' + empId)
        .then(res => res.json())
        .then(data => {
            if (data.isFound) {
                return data.value;
            }
            else {
                console.error(`error getting employee with id ${empId}:\n${data.value}`);
            }
        });
    return emp;
}

async function clearFields() {
    document.getElementById('searchEmpName').value = '';
    document.getElementById('EmpId').value = '';
}

async function getAllEmployees() {
    return await fetch(url + 'employees')
        .then(res => res.json());
}

async function updateRes(emp) {
    await ReactDOM.render((emp ? <EmployeeDiv emp={emp} /> : EmptyRes), empSearchResElem);
}

async function handleAdd() {
    const empNameElem = document.getElementById('addEmpName');
    addEmployee(empNameElem.value);
    // clear the add employee field
    empNameElem.value = '';
}

async function handleUpdate() {
    const updatedName = document.getElementById('searchEmpName').value;
    const empId = document.getElementById('EmpId').value;
    const data = await updateEmployee(empId, updatedName);

    if (data && data.isUpdated) {
        await updateRes(data.updated);
        clearFields();
    }
}



async function handleSearch() {
    const empId = document.getElementById('EmpId').value;
    const res = await getEmployee(empId);
    //<EmployeeDiv emp={e} />
    await updateRes(res);
    clearFields();
}

async function handleDelete() {
    const empId = document.getElementById('EmpId').value;
    deleteEmployee(empId);
    clearFields()
    if (document.getElementById('searcgRes').children[0].innerText === empId) {
        clearRes()
    }
}

async function clearRes() {
    document.getElementById('searcgRes').innerHTML = "";
}

const EmptyRes = () => {
    return (
        <h1>
            no employee found
        </h1>
    )
}

const EmployeeForms = () => {
    return (
        <React.Fragment>
            <ol id="addEmp">
                <input
                    type="text"
                    placeholder="new employee name"
                    name="addEmpName"
                    id="addEmpName"
                    htmlFor="addBtn"
                />
                <button id="addBtn" onClick={handleAdd}>add employee</button>
            </ol>
            <ol id="empActions">
                <input
                    placeholder="employee id"
                    type="number"
                    min="100000000"
                    max="999999999"
                    name="EmpId"
                    id="EmpId"
                />
                <button onClick={handleSearch}>search employee</button>
                <button onClick={handleDelete}>delete employee</button>
                <input
                    type="text"
                    placeholder="updated employee name"
                    name="searchEmpName"
                    id="searchEmpName"
                />

                <button onClick={handleUpdate}>update employee</button>
            </ol>
        </React.Fragment >
    );
}

async function main() {
    // const emps = await getAllEmployees();
    populateEmployees(await getAllEmployees());
    ReactDOM.render(<EmployeeForms />, formsElement);
}

main();