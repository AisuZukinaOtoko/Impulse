const axios = require('axios');

var TimesheetData = {};
var timesheetIDS = [];

// Update the date
function updateDate() {
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
    if (docDate) {
        docDate.innerText = currDate;
    }
}
updateDate();
// Update the date every 2 minutes
setInterval(updateDate, 1000);

// Get name from homepage

//get name and role from homepage
const userName = localStorage.getItem('storedName');
document.getElementById('empName').innerText=userName;



//get and display existing table
fetchData();





// for exporting as PDF
function Export() {
    const mytable = document.getElementById("main_table"); 
    const { jsPDF } = window.jspdf;

    // Set PDF dimensions
    const pdfWidth = 300; // in mm
    const pdfHeight = 297; // in mm

    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);

    // Define table properties
    const startX = 5; // X-coordinate for the starting position of the table
    const startY = 10; // Y-coordinate for the starting position of the table
    const cellPadding = 5; // Padding between cells
    const lineHeight = 10; // Height of each line (adjust based on font size)
    
    //get HTML table
    const table = document.getElementById('main_table');
  
    // Define column widths
    const numColumns = table.rows[0].cells.length;
    const tableWidth = table.offsetWidth;
    const columnWidth = (pdfWidth - startX * 2) / numColumns;

    //set headerRow font to bold
    pdf.setFont('helvetica', 'bold');
    const headerRow = table.rows[0];
    //iterate through each cell of header row
    for(let k =0;k<headerRow.cells.length;k++){
        const cell = headerRow.cells[k];
        const cellContent = cell.textContent.trim(); // Get the content of the cell

        // Calculate the position of the cell
        const x = startX + k * columnWidth +cellPadding;
        const y = startY + 10+(lineHeight * (1)); // Start from the second row

        // Draw the cell content in the PDF
        pdf.text(x , y, cellContent, null, null, 'center');
    }

    // Set font style to normal
    pdf.setFont('helvetica', 'normal');
    
    // Iterate through each row of the HTML table
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        
        // Iterate through each cell of the row
        for (let j = 0; j < row.cells.length; j++) {
            const cell = row.cells[j];
            const cellContent = cell.textContent.trim(); // Get the content of the cell

            // Calculate the position of the cell
            const x = startX + j * columnWidth +cellPadding;
            const y = startY + 10+(lineHeight * (i + 1)); // Start from the second row

            // Draw the cell content in the PDF
            pdf.text(x , y, cellContent, null, null, 'center');
        }
    }

    // Save the PDF
    pdf.save('Timesheet.pdf');
}

// Add event listener only if the element exists
const exportBtn = document.getElementById('export-btn');
if (exportBtn) {
    exportBtn.addEventListener('click', Export);
}

function saveRow() {
    const date = document.getElementById('date_col').value;
    const task = document.getElementById('task_col').value;
    const startTime = document.getElementById('start_col').value;
    const endTime = document.getElementById('end_col').value;
    const manager = document.getElementById('manager_col').value;

    if (!ValidateData_Empty(date, task, startTime, endTime, manager)) {
        alert("One or more required fields are empty");
        return;
    }
    if (!ValidateData_Date(date)) {
        alert("Invalid Date entered");
        return;
    }
    if (!ValidateData_Time(startTime, endTime)) {
        alert("Invalid times entered");
        return;
    }

    let cols = [date, task, startTime, endTime, manager];

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

// Add event listener only if the element exists
const saveButton = document.getElementById('saveButton');
if (saveButton) {
    saveButton.addEventListener('click', saveRow);
}

function clear() {
    const dateCol = document.getElementById('date_col');
    const taskCol = document.getElementById('task_col');
    const startCol = document.getElementById('start_col');
    const endCol = document.getElementById('end_col');
    const managerCol = document.getElementById('manager_col');

    if (dateCol) dateCol.value = '';
    if (taskCol) taskCol.value = '';
    if (startCol) startCol.value = '';
    if (endCol) endCol.value = '';
    if (managerCol) managerCol.value = '';
}

function CalcDuration() {
    const startTime = document.getElementById('start_col').value;
    const endTime = document.getElementById('end_col').value;

    // Parse the time values into Date objects
    var startDate = new Date('1970-01-01T' + startTime + 'Z');
    var endDate = new Date('1970-01-01T' + endTime + 'Z');
    let empty = false;
    let durationSpan = document.getElementById('duration_col');

    // Calculate the difference in milliseconds
    const durationMs = endDate - startDate;
    
    // Convert milliseconds to hours and minutes
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    // Display the duration
    let duration = hours + "hr(s) " + minutes + "mins";
    
    return duration;
}

function isEmpty(value) {
    return value.trim() === '';
}

//ShowSelButtons()
//show select all and deselect all
function ShowSelButtons() {
    const checkboxes = document.querySelectorAll(".checkboxes");
    const selButton = document.querySelector('#selButton');
    const deselButton = document.querySelector('#deselButton');
    const selRowsButton = document.querySelector('#selRows');
    const delSelRowsBtn = document.querySelector('#delSelRowsBtn');
    for (const chkbox of checkboxes) {
        chkbox.style.visibility = "visible";
        chkbox.classList.remove('hidden');
    }
    selRowsButton.style.visibility = "hidden";
    selRowsButton.classList.add('hidden');
    selButton.classList.remove('hidden');
    selButton.style.visibility = "visible";
    deselButton.classList.remove('hidden');
    deselButton.style.visibility = "visible";
    delSelRowsBtn.style.visibility = "visible";
    delSelRowsBtn.classList.remove('hidden');
}

// Add event listener only if the element exists
const selRows = document.getElementById('selRows');
if (selRows) {
    selRows.addEventListener('click', ShowSelButtons);
}

function selAll() {
    const mytable = document.getElementById("main_table"); 
    const ele = mytable.getElementsByTagName('input'); 
   
    for (var i = 0; i < ele.length; i++) { 
        if (ele[i].type == 'checkbox') { 
            ele[i].checked = true;  
        }
    }
}

// Add event listener only if the element exists
const selButton = document.getElementById('selButton');
if (selButton) {
    selButton.addEventListener('click', selAll);
}

function deselAll() {
    const mytable = document.getElementById("main_table"); 
    const ele = mytable.getElementsByTagName('input');  
    for (var i = 0; i < ele.length; i++) { 
        if (ele[i].type == 'checkbox') { 
            ele[i].checked = false;  
        }
    }
}

// Add event listener only if the element exists
const deselButton = document.getElementById('deselButton');
if (deselButton) {
    deselButton.addEventListener('click', deselAll);
}

function delRow() {
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
            DeleteRowDB(timesheetIDS[i-1]);
            //remove that id from timesheetIDS
            if(i-1>-1){ //i-1 is the index
                timesheetIDS.splice(i-1,1);
            }
            mytable.deleteRow(i);  
        }  
    } 
}

// Add event listener only if the element exists
const delSelRowsBtn = document.getElementById('delSelRowsBtn');
if (delSelRowsBtn) {
    delSelRowsBtn.addEventListener('click', delRow);
}

function ValidateData_Empty(date, task, startTime, endTime, manager) {
    let fieldsValid = true;
    let cols = [date, task, startTime, endTime, manager];

    for (let i = 0; i < cols.length; i++) {
        if (isEmpty(cols[i])) {
            fieldsValid = false;
        }
    }
    return fieldsValid;
}

function ValidateData_Date(date) {
    let validDate = true;
    const currDate = new Date();
    const year = currDate.getFullYear();
    const month = currDate.getMonth() + 1; // Adding 1 because January is 0-indexed
    const day = currDate.getDate();

    // Format the date as desired (e.g., YYYY-MM-DD)
    const formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    // Output: YYYY-MM-DD
    if (date > formattedDate) {
        validDate = false;
    }

    return validDate;
}

function ValidateData_Time(startTime, endTime) {
    let validTime = true;
    var startDate = new Date('1970-01-01T' + startTime + 'Z');
    var endDate = new Date('1970-01-01T' + endTime + 'Z');
    const durationMs = endDate - startDate;

    if (durationMs <= 0) {
        validTime = false;
    }

    return validTime;
}

function createRow(object) {
    const date = object.date;
    const task = object.task;
    const startTime = object.startTime;
    const endTime = object.endTime;
    const manager = object.manager;
    const duration = object.duration;

    let cols = [date, task, startTime, endTime, manager, duration];

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

//getting data from database
function fetchData() {
    const url = "https://impulsewebapp.azurewebsites.net/api/timesheet";
    axios.get(url)
        .then((response) => {
            TimesheetData = response.data.recordset;
            let index = 0;
            for (const object of TimesheetData) {
                if (object.email === localStorage.getItem('storedData')) {
                    timesheetIDS.push(object.id);
                    createRow(object);
                }
                index += 1;
            }
        })
        .catch((error) => {
            console.error('Error:', error.message); // Handle errors
        });
}

//saving table to the database
function SaveTable() {
    const date = document.getElementById('date_col').value;
    const task = document.getElementById('task_col').value;
    const startTime = document.getElementById('start_col').value;
    const endTime = document.getElementById('end_col').value;
    const manager = document.getElementById('manager_col').value;  
    const duration = CalcDuration();
    
    let cols = [date, task, startTime, endTime, manager, duration];
    //put contents of their cells into the cols array and make a json object from that
    //then add the json object to the records array   
    //use cols to make Json object
    let record = {
        "email": localStorage.getItem('storedData'),
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

//deleting a row in the database
function DeleteRowDB(id) {
    //send request to delete id
    const url = "https://impulsewebapp.azurewebsites.net/api/timesheet/delete/" + id;
    axios.delete(url)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error('Error:', error.message); // Handle errors
    });
}

module.exports = {
    updateDate,
    Export,
    saveRow,
    clear,
    CalcDuration,
    ShowSelButtons,
    selAll,
    deselAll,
    delRow,
    ValidateData_Empty,
    ValidateData_Date,
    ValidateData_Time,
    fetchData,
    SaveTable,
    DeleteRowDB
};