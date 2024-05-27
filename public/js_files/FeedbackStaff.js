import axios from 'https://cdn.skypack.dev/axios';

document.addEventListener("DOMContentLoaded", function(){

    const email = localStorage.getItem('storedData');

    //loading feedback comments
    const url = 'https://impulsewebapp.azurewebsites.net/api/feedback';
    axios.get(url)
    .then((response) => {
        console.log(response.data.recordset);
        FeedbackComments(response.data.recordset);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    })

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

        //adding a comment
        const AddComment = document.getElementById("add");
        const Comment = document.getElementById("Comment");
        const overlay = document.getElementById("overlay");

        const postComment = document.getElementById("post");
        const cancelComment = document.getElementById("cancel");

        const dropdown = document.getElementById("dropdown");

        //dropdown menu
        const url1 = 'https://impulsewebapp.azurewebsites.net/api/project';
        axios.get(url1)
        .then((response) => {
        console.log(response.data.recordset);
        populateDropdown(response.data.recordset);
    })
        .catch((error) => {
        console.error('Error:', error.message);
    })

        function populateDropdown(projects) {
            projects.forEach(project => {
                const option = document.createElement('option');
                option.value = project.name; // Assuming 'id' is the field for project ID
                option.textContent = project.name; // Assuming 'name' is the field for project name
                dropdown.appendChild(option);
            });
        }

        const emailInput = document.getElementById('commentfrom');
        const projectInput = document.getElementById('dropdown');
        const messageInput = document.getElementById('message');
        

        postComment.addEventListener('click',async function() {

            emailInput.textContent = email;
            const project = projectInput.value;
            const message = messageInput.value;
            // add to Comment Section
            // add to database
            //code goes here
            const isValid = true;
            console.log(email);
            console.log(project);


            if (!message) {
                showError(messageInput, "Message is required");
                isValid = false;
            }

            if (!isValid) return;

            const time = new Date();
            const dateTimeString = time.toLocaleString();
        
            const commentData = {
                "email": email,
                "project_reference": project,
                "description": message, 
                "date": dateTimeString
            };

            console.log(commentData);

            const url = 'https://impulsewebapp.azurewebsites.net/api/feedback';
            axios.post(url, commentData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
            })

            overlay.style.display = "none";
            Comment.style.visibility = "hidden";
            Comment.style.top = "0";
            Comment.style.transform = "translate(-50%, -50%) scale(0.1)";
            
        })

        function resetValidation(input) {
            input.style.border = "";
            const errorMessages = input.parentElement.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.remove());
        }

        function showError(input, message) {
            input.style.border = "2px solid #dc082a";
            const error = document.createElement('section');
            error.className = 'error-message';
            error.style.color = '#dc082a';
            error.textContent = message;
            input.parentElement.appendChild(error);
        }

        cancelComment.addEventListener('click', function() {
            overlay.style.display = "none";
            Comment.style.visibility = "hidden";
            Comment.style.top = "0";
            Comment.style.transform = "translate(-50%, -50%) scale(0.1)";
            
        })
        

        AddComment.addEventListener('click', function(){
            resetValidation(projectInput);
            resetValidation(messageInput);

            projectInput.value = "";
            messageInput.value = "";

            dropdown.disabled = false;
            overlay.style.display = "block";
            Comment.style.visibility = "visible";
            Comment.style.top = "50%";
            Comment.style.transform = "translate(-50%, -50%) scale(1)";
        })

        //clicking the overlay
        overlay.addEventListener('click', function() {
            
        });
});