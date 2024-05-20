//import fetch from 'node-fetch';

let record = {
    "email": "susan5@gmail.com",
    "date": "23 June 2024",
    "task": "SOmething",
    "startTime":"09:00",
    "endTime": "12:00",
    "manager": "Precious",
    "duration": "3 hrs"
};


const url = "https://impulsewebapp.azurewebsites.net/api/timesheet";
    fetch(url, { 
        method: 'POST',
        headers: {
        },
        'Content-Type': 'application/json',
        //mode: 'no-cors',
        body: JSON.stringify(record),
      })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error.message); // Handle errors
      });