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


//button functionalities
function addRow(){  
        const mytable =  document.getElementById("main_table");  
        const rows = mytable.rows.length;  
        const r = mytable.insertRow(rows);  
        const c1 = r.insertCell(0);  
        const c2 = r.insertCell(1);  
        const c3 = r.insertCell(2);
        const c4 = r.insertCell(3);
        const c5 = r.insertCell(4);
        const c6 = r.insertCell(5);
        const c7 = r.insertCell(6);
        /*there are seven columns*/  
        // for(let i=0;i<7;i++ ){
        //     const addition = r.insertCell(i);
        // }
        const checkbox = document.createElement("input");  
        const Date_ = document.createElement("input");  
        const task =document.createElement("input");
        const start = document.createElement("input");
        const end = document.createElement("input");
        const duration = document.createElement("input");
        const Manager = document.createElement("input");
        Manager.classList.add("manager_col");  
        //Manager.setAttribute("id", "manager_col");
        Manager.addEventListener("keyup", addRowOnEnter);
        checkbox.classList.add("checkboxes");
        
        checkbox.type = "checkbox";  
        Date_.type = "date";
        task.type="text";
        start.type="datetime-local";
        end.type="datetime-local";
        duration.type="datetime-local";
        // start.type="text";
        // end.type="text";
        // duration.type="text";
        Manager.type = "text";  
        c1.appendChild(checkbox);  
        c2.appendChild(Date_);
        c3.appendChild(task);
        c4.appendChild(start);
        c5.appendChild(end);
        c6.appendChild(duration);
        c7.appendChild(Manager); 
        //if sel all buttons are visible, make checkboxes visible too
        //!!! 
        const deselButton = document.querySelector('#deselButton');
        if(!deselButton.classList.contains('hidden')){
            checkbox.style.visibility = "visible";
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
    //start loop at one so that table cant be empty 
                for(var i=1; i<ele.length; i++){ 
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
// function addRowOnEnter(){
//     //const input = document.getElementById("manager_col");
//     const inputs = document.querySelectorAll(".manager_col");
//     //console.log(inputs);
//     inputs.forEach(function(input){
//         input.addEventListener("keyup", function(event) {
//             if (event.code === "Enter") {
//                 event.preventDefault();
//                 addRow();
//             }
//         });
//     });
    
// }

function addRowOnEnter() {
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
            addRow();
        }
    }
}
document.addEventListener('DOMContentLoaded', addRowOnEnter);

// Create a MutationObserver instance
const observer = new MutationObserver(function(){
    const inputs = document.querySelectorAll(".manager_col");
    //console.log(inputs);
});

// Configure the observer to observe changes in the DOM
const observerConfig = { subtree: true, childList: true, attributes: true, characterData: true };

// Start observing the document for changes
observer.observe(document.documentElement, observerConfig);