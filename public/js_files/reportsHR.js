import axios from 'https://cdn.skypack.dev/axios';

//store array of objects
// const Timesheets = [];
// const Staffmembers =[];
// const ProjectList = [];
// const feedback = [];



//tried to put this into a logical for better understanding... hope thats the case
document.addEventListener("DOMContentLoaded", function() {

    fetchData();
    initializeReportLinks();
    initializePopup();
    feather.replace();


//fetch all necessary data
function fetchData() {
    //theses can be uncommented, Im just working with one view/fetch at a time
    // fetchTimesheetData(); (i got this from P's code, I think this is where you come in)
    // fetchFeedbackData();
    fetchProjectData();
    fetchUserData();
}

// Fetch timesheet data and populate table, P's code
function fetchTimesheetData() {
    const url = "https://impulsewebapp.azurewebsites.net/api/timesheet";
    axios.get(url)
        .then((response) => {
            const timesheetData = response.data.recordset;
            timesheetData.forEach(object => {
                if (object.email === localStorage.getItem('storedData')) {
                    timesheetIDS.push(object.id);
                    createTimesheetRow(object);
                }
            });
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });
}

// Fetch feedback data
function fetchFeedbackData() {
    const url = 'https://impulsewebapp.azurewebsites.net/api/feedback';
    axios.get(url)
        .then((response) => {
            console.log(response.data.recordset);
            // Do something with the comments
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });
}

// Fetch project data and populate project table
function fetchProjectData() {
    const url = 'https://impulsewebapp.azurewebsites.net/api/project';
    axios.get(url)
        .then((response) => {
            
            const projectData = response.data.recordset;
            console.log('Project Data:', projectData);
            const projectBody = document.getElementById('project-body');
            projectBody.innerHTML = '';

            projectData.forEach(project => {
                const row = createProjectRow(project);
                projectBody.appendChild(row);
            });

            // viewProjects();
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });
}

// Fetch user data
function fetchUserData() {
    const url = 'https://impulsewebapp.azurewebsites.net/api/users';
    axios.get(url)
        .then((response) => {
            // Do something with the users

            const staffData = response.data.recordset;
            console.log('Staff Data:', staffData);
            const staffBody = document.getElementById('staff-body');
            staffBody.innerHTML = '';

            staffData.forEach(staff => {
                const row = createStaffRow(staff);
                staffBody.appendChild(row);
            });

        })
        .catch((error) => {
            console.error('Error:', error.message);
        });
}


function viewProjects(projectData){
    console.log('Data:', projectData);
    
    const popup = document.getElementById("popup-page");
    const overlay = document.getElementById("overlay");
    // const viewReport = document.querySelectorAll('.view-project');

    //okay, fetch the elements, innit
    const infoHeader = document.getElementById("info-header");
    infoHeader.innerHTML = '';
    
    
    let groupNameElement = document.createElement('h1');
    groupNameElement.id = 'groupname';
    groupNameElement.textContent = projectData.name ; // You can set this to any desired text
    
    // Create the h1 element for project status
    let projStatusElement = document.createElement('h1');
    projStatusElement.id = 'projStatus';
    projStatusElement.textContent = projectData.status;
        
        infoHeader.appendChild(groupNameElement);
        infoHeader.appendChild(projStatusElement);
     

    //show team members
    const theMiddle = document.getElementById("the-middle");
    theMiddle.innerHTML = '';

     // Create label and h1 for "Manager By"
     let managerByLabel = document.createElement('label');
     managerByLabel.setAttribute('for', 'managedby');
     managerByLabel.textContent = 'Manager By: ';
 
     let managedByElement = document.createElement('a');
     managedByElement.id = 'managedby';
 
     // Append label and h1 for "Manager By"
     theMiddle.appendChild(managerByLabel);
    theMiddle.appendChild(managedByElement);
 
     // Create label and article for "Group Members"
     let groupMembersLabel = document.createElement('label');
     groupMembersLabel.setAttribute('for', 'groupmembers');
     groupMembersLabel.textContent = 'Group Members: ';
 
     let groupMembersArticle = document.createElement('article');
     groupMembersArticle.id = 'groupmembers';
 
     // Append label and article for "Group Members"
     theMiddle.appendChild(groupMembersLabel);
     theMiddle.appendChild(groupMembersArticle);
 
     // Create label and article for "Project Description"
     let projectDescLabel = document.createElement('label');
     projectDescLabel.setAttribute('for', 'projectdesc');
     projectDescLabel.textContent = 'Project Description: ';
 
     let projectDescArticle = document.createElement('article');
     projectDescArticle.id = 'projectdesc';
 
     // Append label and article for "Project Description"
     theMiddle.appendChild(projectDescLabel);
     theMiddle.appendChild(projectDescArticle);


    const theGraphs = document.getElementById("the-graphs");
    theGraphs.innerHTML = '';



            //code for contents in the report according to report type
            overlay.style.display = "block";
            popup.style.visibility = "visible";
            popup.style.top = "50%";
            popup.style.transform = "translate(-50%, -50%) scale(1)";
        
}

//popup- with corresponding timesheets
function viewStaff(ThisStaff){
    console.log('Data:', ThisStaff);
    const popup = document.getElementById("popup-page");
    const overlay = document.getElementById("overlay");
   
    // const viewReport = document.querySelectorAll('.view-project'); 

    //okay, fetch the elements, innit
    const infoHeader = document.getElementById("info-header");
    infoHeader.innerHTML = '';

    let NameElement = document.createElement('h1');
    NameElement.id = 'Name';
    NameElement.textContent = ThisStaff.name ; // You can set this to any desired text
    
    
    let EmailElement = document.createElement('h1');
    EmailElement.id = 'role';
    EmailElement.textContent = ThisStaff.email;

    let RoleElement = document.createElement('h1');
    RoleElement.id = 'role';
    RoleElement.textContent = ThisStaff.role;

    infoHeader.appendChild(NameElement);
    infoHeader.appendChild(RoleElement);
    infoHeader.appendChild(EmailElement);

    //timesheet come in here, well.. it should
    const theMiddle = document.getElementById("the-middle");
    theMiddle.innerHTML = '';
    const theGraphs = document.getElementById("the-graphs");
    theGraphs.innerHTML = '';



    //this is where we fetch all the timesheets and stuff, the popup is meant to display the performance report of the clicked staff member yeah
    // do your thing before displaying the popup, which is the 

            //displaying the popup after loading the correct information
            overlay.style.display = "block";
            popup.style.visibility = "visible";
            popup.style.top = "50%";
            popup.style.transform = "translate(-50%, -50%) scale(1)";
        
}

// Initialize report links for collapse and expand
function initializeReportLinks() {
    const reportLinks = document.querySelectorAll('.reports');
    reportLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const article = this.closest('.lists');
            article.classList.toggle('expanded');
        });
    });
}

// Initialize popup functionality
function initializePopup() {
    const popup = document.getElementById("popup-page");
    const overlay = document.getElementById("overlay");
    const viewReportButtons = document.querySelectorAll('.view');

    viewReportButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            showPopup(popup, overlay);
        });
    });

    const closeReport = document.getElementById("closereport");
    closeReport.addEventListener('click', function(event) {
        event.preventDefault();
        hidePopup(popup, overlay);
    });
}

function showPopup(popup, overlay) {
    overlay.style.display = "block";
    popup.style.visibility = "visible";
    popup.style.top = "50%";
    popup.style.transform = "translate(-50%, -50%) scale(1)";
}

function hidePopup(popup, overlay) {
    overlay.style.display = "none";
    popup.style.visibility = "hidden";
    popup.style.top = "0";
    popup.style.transform = "translate(-50%, -50%) scale(0.1)";
}

// Create a project row
function createProjectRow(projectData) {
    const projectName = projectData.name;
    const anchor = document.createElement('a');
    anchor.href = '#';
    anchor.textContent = 'View Report';
    anchor.classList.add('view-project');

    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        viewProjects(projectData); // Pass the project name to the viewProjects function
    });

    const projectCell = document.createElement('td');
    projectCell.textContent = projectName;

    const actionCell = document.createElement('td');
    actionCell.appendChild(anchor);

    const row = document.createElement('tr');
    row.classList.add('project-table');

    row.appendChild(projectCell);
    row.appendChild(actionCell);

    return row;
}

function createStaffRow(staffData) {
    const staffName = staffData.name ;
    const anchor = document.createElement('a');
    anchor.href = '#';
    anchor.textContent = 'View Report';
    anchor.classList.add('view-staff');

    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        viewStaff(staffData); // Pass the project name to the viewProjects function
    });

    const staffCell = document.createElement('td');
    staffCell.textContent = staffName;

    const actionCell = document.createElement('td');
    actionCell.appendChild(anchor);

    const row = document.createElement('tr');
    row.classList.add('staff-table');

    row.appendChild(staffCell);
    row.appendChild(actionCell);

    return row;
}

// Create a timesheet row
function createTimesheetRow(object) {
    const date = object.date;
    const task = object.task;
    const startTime = object.startTime;
    const endTime = object.endTime;
    const manager = object.manager;
    const duration = object.duration;

    const cols = [date, task, startTime, endTime, manager, duration];

    const row = document.createElement('tr');
    row.classList.add('main_tbody');

    const chk = document.createElement('input');
    chk.classList.add('checkboxes', 'hidden');
    chk.type = 'checkbox';
    const td = row.appendChild(document.createElement('td'));
    td.appendChild(chk);

    cols.forEach(col => {
        const cell = document.createElement('td');
        cell.innerText = col;
        row.appendChild(cell);
    });

    document.getElementById('main_table').appendChild(row);
}
});