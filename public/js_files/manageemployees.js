import axios from 'https://cdn.skypack.dev/axios';

var manageData = {};
var manageIDS = [];

function createRow(object){
    const Name = object.Name;
    const LastName = object.LastName;
    const permissions = object.permissions;
    const phoneNo = object.phoneNo;

    let cols = [Name, LastName, permissions, phoneNo];


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
    const url = "https://impulsewebapp.azurewebsites.net/api/users";
    axios.get(url)
    .then((response) => {
        manageData = response.data.recordset;
        
        let index = 0;
        for (const object of manageData){
            //check the email
            
            manageIDS.push(object.id);
            createRow(object);
            console.log(object);
            index += 1;
        }

        console.log(manageData);
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
        alert('All fields must be filled out.');
        return;
    }

    if (!validatePhoneNumber(task)) {
        alert('Incorrect number format.');
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

function validatePhoneNumber(task) {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(task);
}


function clear() {
    document.getElementById('employeeN_col').value = '';
    document.getElementById('role_col').value = '';
    document.getElementById('project_col').value = '';
    document.getElementById('task_col').value = '';
}
function ShowSelButtons(){
    const checkboxes = document.querySelectorAll(".checkboxes");
    const selButton = document.querySelector('#selButton');
    const deselButton = document.querySelector('#deselButton');
    const selRowsButton = document.querySelector('#selRows');
    const delSelRowsBtn = document.querySelector('#delSelRowsBtn');
    for(const chkbox of checkboxes){
        chkbox.style.visibility = "visible";
        chkbox.classList.remove('hidden');
    }
    selRowsButton.style.visibility = "hidden";
    selRowsButton.classList.add('hidden');
    selButton.classList.remove('hidden');
    selButton.style.visibility = "visible";
    deselButton.classList.remove('hidden');
    deselButton.style.visibility = "visible";
    delSelRowsBtn.style.visibility="visible";
    delSelRowsBtn.classList.remove('hidden');

    // if(delSelRowsBtn.style.visibility == "visible"){
    //     delSelRowsBtn.style.visibility="hidden";
    //     delSelRowsBtn.classList.add('hidden');
    // }
}

document.getElementById('selRows').addEventListener('click', ShowSelButtons);

function selAll(){
    const mytable = document.getElementById("main_table"); 
    const ele=mytable.getElementsByTagName('input'); 
   
                for(var i=0; i<ele.length; i++){ 
                    if(ele[i].type=='checkbox'){ 
                        ele[i].checked=true;  
                    }
                    
                } 
      
}
document.getElementById('selButton').addEventListener('click', selAll);

function deselAll(){
    const mytable = document.getElementById("main_table"); 
    const ele=mytable.getElementsByTagName('input');  
                for(var i=0; i<ele.length; i++){  
                    if(ele[i].type=='checkbox'){ 
                       
                        ele[i].checked=false;  
                    }
                } 
  
}
document.getElementById('deselButton').addEventListener('click', deselAll);

function delRow(){  
    const mytable = document.getElementById("main_table");  
    const selRowsButton = document.querySelector('#selRows');
    const deselButton = document.querySelector('#deselButton');
    selRowsButton.style.visibility = "visible";
    //show select rows button and remove select all, deselect all and delSelRows
    if(selRowsButton.classList.contains('hidden')){
        selRowsButton.classList.remove('hidden');
        selButton.classList.add('hidden');
        deselButton.classList.add('hidden');
        delSelRowsBtn.classList.add('hidden');
        const checkboxes = document.querySelectorAll(".checkboxes");
        for(const chkbox of checkboxes){
            //chkbox.style.visibility = "visible";
            chkbox.classList.add('hidden');
        }
    }
    const rows = mytable.rows.length;  
    for(let i = rows - 1; i > 0; i--)  
    {  
        if(mytable.rows[i].cells[0].children[0].checked)  
        {  

            //delete from database
            DeleteRowDB(manageIDS[i-1]);
            //remove that id from manageIDS
            if(i-1>-1){ //i-1 is the index
                manageIDS.splice(i-1,1);
            }
            mytable.deleteRow(i);  
        }  
    } 
    
} 

document.getElementById('delSelRowsBtn').addEventListener('click', delRow);



// Define the SaveTable function if needed
function SaveTable(){
    const employeename = document.getElementById('employeeN_col').value;
    const role = document.getElementById('role_col').value;
    const project = document.getElementById('project_col').value;
    const task = document.getElementById('task_col').value;
    
    let cols=[employeename,role,project,task];
    //put contents of their cells into the cols array and make a json object from that
    //then add the json object to the records array   
    //use cols to make Json object
    let record = {
        "email": localStorage.getItem('storedData'),
        "Name": cols[0],
        "LastName": cols[1],
        "permissions":cols[2],
        "phoneNo": cols[3]
    };

    
    // make request to the api
    const url = "https://impulsewebapp.azurewebsites.net/api/users";
    axios.post(url, record)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error('Error:', error.message); // Handle errors
    });
    
}

document.getElementById('saveButton').addEventListener('click', saveRow);

function DeleteRowDB(id){
    //send request to delete id
    const url = "https://impulsewebapp.azurewebsites.net/api/USERS/delete/"+id;
    axios.delete(url)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error('Error:', error.message); // Handle errors
    });
}
