const url = "http://localhost:1521"

const mainElem = document.getElementById('main');

function getAllWorkers() {
    fetch(url + '/workers')
        .then(res => res.json())
        .then(workers => printList('list of all workers:', workers));
}

function getShifts() {
    const id = document.getElementById('idInp').value || '';
    fetch(url + `/shifts/${id}`)
        .then(res => res.json())
        .then(shifts => printList(id ? 'list of current worker shifts:' : 'all workers shifts:', shifts));
}

function getHours() {
    const id = document.getElementById('idInp').value || '';
    console.log(id);
    fetch(url + `/hours/${id}`)
        .then(res => res.json())
        .then(hours => {
            printValue(id ? 'amount of current worker hours worked:' : 'sum of all workers hours worked:', hours)
        });
}

function getSalary() {
    const id = document.getElementById('idInp').value || '';
    console.log(id);
    fetch(url + `/salary/${id}`)
        .then(res => res.json())
        .then(hours => {
            printValue(id ? 'current worker salary:' : 'sum of all workers salaries:', hours)
        });
}



const getChosenTime = () => {
    const time = document.getElementById('punchTimeInp');
    const date = document.getElementById('punchDateInp');
    let dateTimeNum = time.valueAsNumber + date.valueAsNumber;
    if (!dateTimeNum) {
        dateTimeNum = new Date().getTime();
    }
    return dateTimeNum;
}

function punchIn() {
    const id = document.getElementById('idInp').value || -1;
    const dateTimeNum = getChosenTime();
    console.log(`${url}/punchtime/${id}/IN/${dateTimeNum}`);
    fetch(`${url}/punchtime/${id}/IN/${dateTimeNum}`)
        .then(res => res.json())
        .then(worker => {
            printWorker(worker);
            if (worker.id) {
                document.getElementById('idInp').value = worker.id;
            }
        });
}

function punchOut() {
    const id = document.getElementById('idInp').value;
    const dateTimeNum = getChosenTime();
    fetch(`${url}/punchtime/${id}/OUT/${dateTimeNum}`)
        .then(res => res.json())
        .then(worker => printWorker(worker));
}

const printWorker = (msg) => {
    document.getElementById('worker').innerText = JSON.stringify(msg);
}

const printList = (msg, list) => {
    document.getElementById('list').innerText = msg + '\n' + JSON.stringify(list);
}

const printValue = (msg, value) => {
    document.getElementById('value').innerText = msg + '\n' + JSON.stringify(value);
}

const MainForm = () => {
    return (
        <React.Fragment>
            <input type="number" id="idInp" placeholder='worker id' />
            <button type="button" className="collapsible">change time. default is now</button>
            <div className="content">
                <input type="time" name="punchTime" id="punchTimeInp" />
                <input type="date" min="2021-01-25" max="2021-12-29" name="punchDate" id="punchDateInp" />
            </div>
            <button id="inBtn" onClick={punchIn}>punch in</button>
            <button id="outBtn" onClick={punchOut}>punch out</button>
            <label>get list:</label>
            <select>
                <option onClick={getAllWorkers}>workers</option>
                <option onClick={getShifts}>current worker shifts</option>
                <option onClick={getHours}>current worker hours worked</option>
                <option onClick={getSalary}>current worker salaries</option>
                <option onClick={getShifts}>current worker shifts</option>
            </select>
            <div className="msgs">
                <div id="worker"></div>
                <div id="value"></div>
                <div id="list"></div>
            </div>
        </React.Fragment>
    )
}

const populateForm = async () => {
    await ReactDOM.render(<MainForm />, mainElem);
}

function makeCollapsible() {
    let coll = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.display === "flex") {
                content.style.display = "none";
            } else {
                content.style.display = "flex";
            }
        });
    }
}

async function main() {
    await populateForm();
    makeCollapsible();
}

main();