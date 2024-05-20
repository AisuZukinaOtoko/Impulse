document.addEventListener("DOMContentLoaded", function(){
    const toggleBar = document.getElementById("open-Requests");
    const reqsection = document.getElementById("reqSection");

    //url
    fetch('https://example.com/api/feedback')
    .then(response => response.json())
    .then(data => {
        // `data` is the JSON object retrieved from the database
        console.log(data);
        //innerhtml
        populateStafflist(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });



    // collapse and expand
    toggleBar.addEventListener('click', function() {
        reqsection.classList.toggle('expanded');
        reqsection.classList.toggle('collapsed');
    })

    //Log a feedback request
    const Reqbutton = document.getElementById("reqFeedback");
    const stafflist = document.getElementById("stafflist");
    const overlay = document.getElementById("overlay");

    //cancel request

    const closelist = document.getElementById("closelist");


    closelist.addEventListener('click', function() {
        overlay.style.display = "none";
        stafflist.style.visibility = "hidden";
        stafflist.style.top = "0";
        stafflist.style.transform = "translate(-50%, -50%) scale(0.1)";
        
    })



    //search staff member
    Reqbutton.addEventListener('click', function(){

        overlay.style.display = "block";
            stafflist.style.visibility = "visible";
            stafflist.style.top = "50%";
            stafflist.style.transform = "translate(-50%, -50%) scale(1)";
    })
})

function populateTable(staffData) {
    const tableBody = document.getElementById('table-staff');
    // tableBody.innerHTML = ''; 

    staffData.forEach(staff => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = staff.email; //  JSON structure
        const surnameCell = document.createElement('td');
        surnameCell.textContent = staff.StaffName; //  JSON structure
        const actionCell = document.createElement('td');
        const actionButton = document.createElement('button');
        actionButton.textContent = 'Send a Request';
        actionButton.addEventListener('click', () => {
            sendRequest(staff);
        });

        actionCell.appendChild(actionButton);
        
        // Append cells to the row
        row.appendChild(nameCell);
        row.appendChild(surnameCell);
        row.appendChild(actionCell);
        
        // Append row to the table body
        tableBody.appendChild(row);
    });
}

function sendRequest(staff) {
    
    console.log('Request sent for:', staff);
    //send data to database: email, Name, Project
    
}