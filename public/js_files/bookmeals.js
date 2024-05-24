import axios from 'https://cdn.skypack.dev/axios';

// Define a variable to track the number of entries
let entryCount = 0;

document.getElementById('mealForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    
    // Get form values
    const mealName = document.getElementById('mealName').value;
    const additionalInfo = document.getElementById('additionalInfo').value;
    const mealDate = document.getElementById('mealDate').value;

    // Check if maximum entries limit is reached
    if (entryCount < 5) {
        // Create a new table row
        const tableRow = document.createElement('tr');

        // Create cells for each input value
        const mealNameCell = document.createElement('td');
        mealNameCell.textContent = mealName;
        const mealDateCell = document.createElement('td');
        mealDateCell.textContent = mealDate;
        const additionalInfoCell = document.createElement('td');
        additionalInfoCell.textContent = additionalInfo;

        // Append cells to the row
        tableRow.appendChild(mealNameCell);
        tableRow.appendChild(mealDateCell);
        tableRow.appendChild(additionalInfoCell);

        // Append the row to the table body
        document.querySelector('#mealTable tbody').appendChild(tableRow);

        // Increment the entry count
        entryCount++;
    } else {
        // Alert the user that maximum entries limit is reached
        alert("Maximum entries limit (5) reached.");
    }

    // Clear the form fields
    document.getElementById('mealForm').reset();
});

//saving reminders to the database
function mealbookings(){
	const MealName=document.getElementById('mealName').value;
	const mealDate=document.getElementById('mealDate').value;
	const addinfo=document.getElementById('additionalInfo').value;

	let cols=[MealName,mealDate,addinfo];

	let record = {
        "email": "susan@gmail.com",
        "date": cols[0],
        "task": cols[1],
        "startTime":cols[2],
    };

    // make request to the api
    const url = "https://impulsewebapp.azurewebsites.net/api/bookmeals";
    axios.post(url, record)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error('Error:', error.message); // Handle errors
      });
}

function fetchData(){
    const url = "https://impulsewebapp.azurewebsites.net/api/bookmeals";
    axios.get(url)
    .then((response) => {
        bookmealsData = response.data.recordset;
        
        let index = 0;
        for (const object of bookmealsData){
            //check the email
            bookmealsIDS.push(object.id);
            createRow(object);
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