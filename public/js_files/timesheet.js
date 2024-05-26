import axios from 'https://cdn.skypack.dev/axios';

var TimesheetData = {};
var timesheetIDS = [];

//update the date
function updateDate(){
    const date = new Date();
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false // Use 24-hour format
    };
    const currDate = date.toLocaleString(undefined, options);
    const docDate = document.querySelector("#date");
    docDate.innerText = currDate;
}
updateDate();
//update the date every 2 minutes
setInterval(updateDate, 1000);

// //get email from homepage
// window.onload = function() {
//     const email = localStorage.getItem('email');
//     document.getElementById('empName').innerText = email;
// };



fetchData();


function saveRow(){

    const date = document.getElementById('date_col').value;
    const task = document.getElementById('task_col').value;
    const startTime = document.getElementById('start_col').value;
    const endTime = document.getElementById('end_col').value;
    const manager = document.getElementById('manager_col').value;

    if(!ValidateData_Empty(date,task,startTime,endTime,manager)){
        alert("One or more required fields are empty");
        return;
    }
    if(!ValidateData_Date(date)){
        alert("Invalid Date entered");
        return;
    }
    if(!ValidateData_Time(startTime, endTime)){
        alert("Invalid times entered");
        return;
    }

    let cols=[date,task,startTime,endTime,manager];

 

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
    const duration = document.createElement('td');
    duration.innerText = CalcDuration();
    const td2 = row.appendChild(document.createElement('td'));
    td2.appendChild(duration);
    
    document.getElementById('main_table').appendChild(row);
    SaveTable();
    //clear afterwards
    clear();
}

document.getElementById('saveButton').addEventListener('click', saveRow);

function clear(){
    document.getElementById('date_col').value ='';
    document.getElementById('task_col').value ='';
    document.getElementById('start_col').value ='';
    document.getElementById('end_col').value ='';
    document.getElementById('manager_col').value ='';
}

function CalcDuration(){
    const startTime = document.getElementById('start_col').value;
    const endTime = document.getElementById('end_col').value;

    // Parse the time values into Date objects
    var startDate = new Date('1970-01-01T' + startTime + 'Z');
    var endDate = new Date('1970-01-01T' + endTime + 'Z');
    let empty = false;
    let durationSpan = document.getElementById('duration_col');

         
    // Calculate the difference in milliseconds
    // const durationMs = Math.abs(endDate- startDate);
    const durationMs = endDate- startDate;
    
    // Convert milliseconds to hours and minutes
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    // Display the duration
    let duration= hours +"hr(s) "+minutes+"mins";
    
    return duration;
       
   
}

function isEmpty(value) {
    return value.trim() === '';
}

//ShowSelButtons()
//show select all and deselect all
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
function selAll(){
    const mytable = document.getElementById("main_table"); 
    const ele=mytable.getElementsByTagName('input'); 
   
                for(var i=0; i<ele.length; i++){ 
                    if(ele[i].type=='checkbox'){ 
                        ele[i].checked=true;  
                    }
                    
                } 
      
}
function deselAll(){
    const mytable = document.getElementById("main_table"); 
    const ele=mytable.getElementsByTagName('input');  
                for(var i=0; i<ele.length; i++){  
                    if(ele[i].type=='checkbox'){ 
                       
                        ele[i].checked=false;  
                    }
                } 
  
}
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
            mytable.deleteRow(i);  
        }  
    } 
    
} 

function SaveOnEnter() {
    const inputs = document.querySelectorAll(".manager_col");
    inputs.forEach(function(input) {
               // Remove existing event listener for "keyup" event
               input.removeEventListener("keyup", handleKeyPress);

               // Add event listener for "keyup" event
               input.addEventListener("keyup", handleKeyPress);
       
    });
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        // Get the current input element
        const currentInput = event.target;

        // Check if the current input is the last input in its parent row
        const currentRow = currentInput.closest("tr");
        const inputsInRow = currentRow.querySelectorAll("input");
        const lastInputInRow = inputsInRow[inputsInRow.length - 1];

        if (currentInput === lastInputInRow) {
            event.preventDefault();
            saveRow();
        }
    }
}
document.addEventListener('DOMContentLoaded', SaveOnEnter);


//DATA VALIDATION FUNCTIONS
function ValidateData_Empty(date, task,startTime,endTime,manager){
    //make sure fields are not empty
    let fieldsValid = true;
    let cols=[date,task,startTime,endTime,manager];

    for(let i=0;i<cols.length;i++){
        if(isEmpty(cols[i])){
            fieldsValid = false;
        }

    }
    return fieldsValid;
}

function ValidateData_Date(date){
    //check that entered date is before or on current date
    let validDate = true;
    const currDate = new Date();
    const year = currDate.getFullYear();
    const month = currDate.getMonth() + 1; // Adding 1 because January is 0-indexed
    const day = currDate.getDate();

    // Format the date as desired (e.g., YYYY-MM-DD)
    const formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    // Output: YYYY-MM-DD
    if(date>formattedDate){
        validDate = false;
    }

    return validDate;
}

function ValidateData_Time(startTime, endTime){
    let validTime = true;
    var startDate = new Date('1970-01-01T' + startTime + 'Z');
    var endDate = new Date('1970-01-01T' + endTime + 'Z');
    const durationMs = endDate-startDate;

    if(durationMs<=0){
        validTime = false;
    }

    return validTime;
}

//Database things
//get the table and display it
function createRow(object){
    const date = object.date;
    const task = object.task;
    const startTime = object.startTime;
    const endTime = object.endTime;
    const manager = object.manager;

    
    const duration = object.duration;

    let cols=[date,task,startTime,endTime,manager,duration];

 

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
    const url = "https://impulsewebapp.azurewebsites.net/api/timesheet";
    axios.get(url)
    .then((response) => {
        TimesheetData = response.data.recordset;
        
        let index = 0;
        for (const object of TimesheetData){
            //check the email
            
            timesheetIDS.push(object.id);
            createRow(object);
            //console.log(object);
            index += 1;
        }

        console.log(timesheetIDS);
    })
    .catch((error) => {
        console.error('Error:', error.message); // Handle errors
      });
}

//saving table to the database
function SaveTable(){
    const date = document.getElementById('date_col').value;
    const task = document.getElementById('task_col').value;
    const startTime = document.getElementById('start_col').value;
    const endTime = document.getElementById('end_col').value;
    const manager = document.getElementById('manager_col').value;  
    const duration = CalcDuration();
    
    let cols=[date,task,startTime,endTime,manager,duration];
    //put contents of their cells into the cols array and make a json object from that
    //then add the json object to the records array   
    //use cols to make Json object
    let record = {
        "email": "susan@gmail.com",
        "date": cols[0],
        "task": cols[1],
        "startTime":cols[2],
        "endTime": cols[3],
        "manager": cols[4],
        "duration": cols[5]
    };

    // make request to the api
    const url = "https://impulsewebapp.azurewebsites.net/api/timesheet";
    axios.post(url, record)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error('Error:', error.message); // Handle errors
      });
    
}