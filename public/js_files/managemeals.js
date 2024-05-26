import axios from 'https://cdn.skypack.dev/axios';

var bookmealsData={};
var bookmealsIDS=[];

// Define a variable to track the number of entries

function addRow(row){
    // Create a new table row
    const tableRow = document.createElement('tr');

    // Create cells for each input value
    const mealNameCell = document.createElement('td');
    mealNameCell.textContent = row.type;
    const mealDateCell = document.createElement('td');
    mealDateCell.textContent = row.date;
    const additionalInfoCell = document.createElement('td');
    additionalInfoCell.textContent = row.description;
    //const priceCell=document.createElement('td');
    //priceCell.textContent=row.

    // Append cells to the row
    tableRow.appendChild(mealNameCell);
    tableRow.appendChild(mealDateCell);
    tableRow.appendChild(additionalInfoCell);

    // Append the row to the table body
    document.querySelector('#mealTable tbody').appendChild(tableRow);
}


document.getElementById('mealForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    
    // Get form values
    const mealName = document.getElementById('mealName').value;
    const additionalInfo = document.getElementById('additionalInfo').value;
    const mealDate = document.getElementById('mealDate').value;

    let mealBooking = {
        "type": mealName,
        "description": additionalInfo,
        "date": mealDate
    }

    addRow(mealBooking);

    // Clear the form fields
    document.getElementById('mealForm').reset();
});

//saving to the database
function mealbookings(){
	const MealName=document.getElementById('mealName').value;
	const mealDate=document.getElementById('mealDate').value;
	const addinfo=document.getElementById('additionalInfo').value;

	let cols=[MealName,mealDate,addinfo];

	let record = {
        "email": "susan@gmail.com",
        "date": cols[0],
        "description": cols[1], // additional info
        "type":cols[2], // meal name
    };

    // make request to the api
    const url = "https://impulsewebapp.azurewebsites.net/api/meal";
    axios.post(url, record)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error('Error:', error.message); // Handle errors
      });
}



function fetchData(){
    const url = "https://impulsewebapp.azurewebsites.net/api/meal";
    axios.get(url)
    .then((response) => {
        bookmealsData = response.data.recordset;
        
        let index = 0;
        for (const object of bookmealsData){
            //check the email
            bookmealsIDS.push(object.id);
            addRow(object);
            console.log(object);
            index += 1;
        }

        console.log(bookmealsData);
    })
    .catch((error) => {
        console.error('Error:', error.message); // Handle errors
      });
}

fetchData();