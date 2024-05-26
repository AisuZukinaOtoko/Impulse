//for requests to the api
var carwashData = {};
var carwashIDS = [];
let tuesday = document.querySelector('.tuesday');
let thursday = document.querySelector('.thursday');
//logic for check availability
let popup = document.getElementById("popup");
let popup1 = document.getElementById("popup1");
let inputElement = document.getElementById('myInput');
let buttonId;
let buttonClass;
let date;
let paragraphText;


fetchData();

async function checkAvail(event) {
    
    buttonId = event.target.id;
    buttonClass = event.target.className;

    let response = await fetch('http://localhost:3000/run-python');
    let data = await response.json();
    let carCount = data.carCount;
    console.log(carCount);
    if((6 - carCount)>0){   
        popup.classList.add("open-popup");
    }
    else{
        popup1.classList.add("open-popup");
    }
    
}

//tuesday date
function getNextTuesdayDate() {
    let currentDate = new Date();
    let currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Calculate days until next Tuesday
    let daysUntilNextTuesday = 2 - currentDay;
    if (daysUntilNextTuesday <= 0) {
        daysUntilNextTuesday += 7;
    }

    // Calculate next Tuesday's date
    let nextTuesdayDate = new Date(currentDate.getTime() + daysUntilNextTuesday * 24 * 60 * 60 * 1000);
    
    // Format date
    let formattedDate = nextTuesdayDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

    return formattedDate;
}

// Example usage:
tuesday.innerHTML = "Tuesday " + getNextTuesdayDate();

function getNextThursdayDate() {
    let currentDate = new Date();
    let currentDay = currentDate.getDay();
    let daysUntilNextThursday = 4 - currentDay;
    if (daysUntilNextThursday <= 0) {
        daysUntilNextThursday += 7;
    }
    let nextThursdayDate = new Date(currentDate.getTime() + daysUntilNextThursday * 24 * 60 * 60 * 1000);
    let formattedDate = nextThursdayDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    return formattedDate;
}

// Example usage:
thursday.innerHTML = "Thursday " + getNextThursdayDate();
// console.log(localStorage.getItem('storedData'));
//console.log(buttonClass);
if(buttonClass == "slotButton1"){
    date = getNextTuesdayDate();
}else{
    date = getNextThursdayDate();
}

function confirmBooking(){
    let inputValue = inputElement.value;
    
    const slot = buttonId;
    const email = localStorage.getItem('storedData');
    const model = inputValue;

    const booking=[email, date,slot,model];

    //making it show on the table
    let row = document.createElement('tr');
    row.classList.add('main_tbody');

    const cols_len = booking.length;
    for(let i =0;i<cols_len;i++){
        const cell = row.appendChild(document.createElement('td'));
        cell.innerText = booking[i];
    }
    document.getElementById('main_table').appendChild(row);

    let obj ={
        "slot" : buttonId,
        "date" : date,
        "email": localStorage.getItem('storedData'),
        "carModel" :inputValue
    };

    // make request to the api
    const url = "https://impulsewebapp.azurewebsites.net/api/carwash";
    axios.post(url, obj)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error('Error:', error.message); // Handle errors
    });


popup.classList.remove("open-popup");
}

function createRow(object){
    const slot = object.slot;
    const date = object.date;
    const email = object.email;
    const model = object.carModel;

    const booking=[email, date,slot,model];

    //making it show on the table
    let row = document.createElement('tr');
    row.classList.add('main_tbody');

    const cols_len = booking.length;
    for(let i =0;i<cols_len;i++){
        const cell = row.appendChild(document.createElement('td'));
        cell.innerText = booking[i];
    }
    document.getElementById('main_table').appendChild(row);
}

function fetchData(){
    const url = "https://impulsewebapp.azurewebsites.net/api/carwash";
    axios.get(url)
    .then((response) => {
        carwashData = response.data.recordset;
        
        let index = 0;
        for (const object of carwashData){
            //check the email
            carwashIDS.push(object.id);
            createRow(object);
            index += 1;
        }
    })
    .catch((error) => {
        console.error('Error:', error.message); // Handle errors
      });
}


function closePopup(){
    popup.classList.remove("open-popup");
}
function closePopup1(){
    popup1.classList.remove("open-popup");
}
module.exports = {
  checkAvail,
  getNextTuesdayDate,
  getNextThursdayDate,
  confirmBooking,
  createRow,
  fetchData,
  closePopup,
  closePopup1
};