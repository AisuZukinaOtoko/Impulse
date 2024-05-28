import axios from 'https://cdn.skypack.dev/axios';

document.addEventListener("DOMContentLoaded", function(){

    //elements
    const email = localStorage.getItem('storedData');
    const Reqbutton = document.getElementById("reqFeedback");
    const stafflist = document.getElementById("stafflist");
    const overlay = document.getElementById("overlay");

    const tableBody = document.getElementById("table-staff");

    const closelist = document.getElementById("closelist");


    //list staff members (not HR )
    const url = 'https://impulsewebapp.azurewebsites.net/api/users';
    axios.get(url)
    .then((response) => {
        console.log(response.data.recordset);
        const users = response.data.recordset;
        users.forEach(users => {
            addUsers(users.Name, users.LastName, users.email);
        });
    })
    .catch((error) => {
        console.error('Error:', error.message);
    })

    //comments
    const url1 = 'https://impulsewebapp.azurewebsites.net/api/feedback';
    axios.get(url1)
    .then((response) => {
        console.log(response.data.recordset);
        FeedbackComments(response.data.recordset);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    })


    //listeners
    closelist.addEventListener('click', function() {
        overlay.style.display = "none";
        stafflist.style.visibility = "hidden";
        stafflist.style.top = "0";
        stafflist.style.transform = "translate(-50%, -50%) scale(0.1)";
        
    })

    Reqbutton.addEventListener('click', function(){

        overlay.style.display = "block";
            stafflist.style.visibility = "visible";
            stafflist.style.top = "50%";
            stafflist.style.transform = "translate(-50%, -50%) scale(1)";
    })

    function addUsers(name, LastName, email) {
        const row = document.createElement("tr");

        const cellId = document.createElement("td");
        cellId.textContent = name;
        row.appendChild(cellId);

        const cellName = document.createElement("td");
        cellName.textContent = LastName;
        row.appendChild(cellName);

        const cellEmail = document.createElement("td");
        cellEmail.textContent = email;
        row.appendChild(cellEmail);

        tableBody.appendChild(row);
    }

    function FeedbackComments(comments) {
        const commentContainer = document.getElementById('insert-comments');
        commentContainer.innerHTML = '';

        comments.forEach(comment => {
            const commentElement = document.createElement('section');
            commentElement.classList.add('comment');

            commentElement.innerHTML = `
                <p><strong>Email:</strong> ${comment.email}</p>
                <p><strong>Project:</strong> ${comment.project_reference}</p>
                <p><strong>Message:</strong> ${comment.description}</p>
                <p><strong>Date:</strong> ${new Date(comment.date).toLocaleString()}</p>
                <hr>
            `;

            commentContainer.appendChild(commentElement);
        });
    }
    

})

   
