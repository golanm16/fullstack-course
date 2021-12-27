const url = "http://localhost:1521"

const mainElem = document.getElementById('main');

async function showAllWorkers() {
    print
}

async function punchIn() {
    const id = document.getElementById('idInp').value || 1;
    const time = document.getElementById('punchTimeInp');
    const date = document.getElementById('punchDateInp');
    const dateTimeNum = time.valueAsNumber + date.valueAsNumber;
    console.log(`${url}/punchtime/${id}/IN/${dateTimeNum}`);
    const worker = await fetch(`${url}/punchtime/${id}/IN/${dateTimeNum}`)
        .then(res => res.json());
    console.log(worker);
    printMyMsg(worker);
    if (worker.id) {
        document.getElementById('idInp').value = worker.id;
    }
}
async function punchOut() {
    const id = document.getElementById('idInp').value;
    const time = document.getElementById('punchTimeInp');
    const date = document.getElementById('punchDateInp');
    const dateTimeNum = time.valueAsNumber + date.valueAsNumber;
    fetch(`${url}/punchtime/${id}/OUT/${dateTimeNum}`)
        .then(res => res.json())
        .then(data => console.log(data));
}
const printMyMsg = (msg) => {
    console.log('print' + JSON.stringify(msg));
    document.getElementById('msg').innerText = JSON.stringify(msg);
}

const MainForm = () => {
    return (
        <React.Fragment>
            <input type="number" id="idInp" />
            <input type="time" defaultValue="12:00" name="punchTime" id="punchTimeInp" />
            <input type="date" defaultValue="2014-02-09" min="2021-01-25" max="2021-12-29" name="punchDate" id="punchDateInp" />
            <button id="inBtn" onClick={punchIn}>punch in</button>
            <button id="outBtn" onClick={punchOut}>punch out</button>
            <div id="msg"></div>
        </React.Fragment>
    )
}

const populateForm = () => {
    ReactDOM.render(<MainForm />, mainElem);
}

function main() {
    populateForm();
}

main();