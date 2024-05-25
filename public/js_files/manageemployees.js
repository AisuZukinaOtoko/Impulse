import axios from 'https://cdn.skypack.dev/axios';

var manangeData = {};
var manageIDS = [];

function createRow(object){
    const employeename = object.name;
    const role = object.role;
    const project = object.project;
    const task = object.task;

    let cols = [employeename, role, project, task];


    let row = document.createElement('tr');
    row.classList.add('main_tbody');
    //add checkbox first
    const chk = document.createElement('input');
    chk.classList.add('checkboxes');
    chk.classList.add('hidden');
    chk.type = 'checkbox';
    const td = row.appendChild(document.createElement('td'));
    td.appendChild(chk);
    
    //number of columns
    const cols_len = cols.length;
    for(let i =0;i<cols_len;i++){
        const cell = row.appendChild(document.createElement('td'));
        cell.innerText = cols[i];
    }
    
    document.getElementById('main_table').appendChild(row);
}


function fetchData(){
    const url = "https://impulsewebapp.azurewebsites.net/api/manageemployees";
    axios.get(url)
    .then((response) => {
        manangeDataData = response.data.recordset;
        
        let index = 0;
        for (const object of manangeData){
            //check the email
            
            manageIDS.push(object.id);
            createRow(object);
            console.log(object);
            index += 1;
        }

        console.log(manangeData);
    })
    .catch((error) => {
        console.error('Error:', error.message); // Handle errors
      });
}

fetchData();

function saveRow() {
    const employeename = document.getElementById('employeeN_col').value.trim();
    const role = document.getElementById('role_col').value.trim();
    const project = document.getElementById('project_col').value.trim();
    const task = document.getElementById('task_col').value.trim();

    // Debugging: Log the trimmed values to the console
    console.log('Employee Name:', employeename);
    console.log('Role:', role);
    console.log('Project:', project);
    console.log('Task:', task);

    if (!ValidateData_Empty(employeename, role, project, task)) {
        
        return;
    }

    let cols = [employeename, role, project, task];

    let row = document.createElement('tr');
    // add checkbox first
    const chk = document.createElement('input');
    chk.classList.add('checkboxes');
    chk.classList.add('hidden');
    chk.type = 'checkbox';
    const td = row.appendChild(document.createElement('td'));
    td.appendChild(chk);

    // number of columns
    const cols_len = cols.length;
    for (let i = 0; i < cols_len; i++) {
        const cell = row.appendChild(document.createElement('td'));
        cell.innerText = cols[i];
    }

    document.querySelector('#main_table .main_tbody').appendChild(row);

    SaveTable();
    // clear afterwards
    clear();
}

function ValidateData_Empty(...fields) {
    // Debugging: Log the fields array to the console
    console.log('Fields for validation:', fields);
    return fields.every(field => field !== "");
}

function clear() {
    document.getElementById('employeeN_col').value = '';
    document.getElementById('role_col').value = '';
    document.getElementById('project_col').value = '';
    document.getElementById('task_col').value = '';
}

// Define the SaveTable function if needed
function SaveTable() {
    // Save table logic here
}

document.getElementById('saveButton').addEventListener('click', saveRow);


