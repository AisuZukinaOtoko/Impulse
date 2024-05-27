import axios from 'https://cdn.skypack.dev/axios';

document.addEventListener("DOMContentLoaded", function(){

    //loading feedback comments

    // fetchComments()
    // .then(function(comments) {
    //     FeedbackComments(comments);
    // })
    // .catch(function(error) {
    //     // console.error('Error fetching comments:', error);
    // });

    // function fetchComments() {
    //     return fetch('http://impulsewebapp.azurewebsites.net/api/feedback')
    //         .then(function(response) {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         });
    // }

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

    // collapsing & expanding Feedback requests
        const toggleBar = document.getElementById("open-Requests");
        const reqsection = document.getElementById("reqSection");
        

        toggleBar.addEventListener('click', function() {
            reqsection.classList.toggle('expanded');
            reqsection.classList.toggle('collapsed');
        })

        //adding a comment
        const AddComment = document.getElementById("add");
        const Comment = document.getElementById("Comment");
        const overlay = document.getElementById("overlay");

        const postComment = document.getElementById("post");
        const cancelComment = document.getElementById("cancel");

        const addC = document.querySelectorAll(".addC");
        const dropdown = document.getElementById("dropdown");

        addC.forEach(link =>{
            link.addEventListener('click', function(event){
                event.preventDefault();
                // alert('Add your comment for' + this.closest('tr').querySelector('td:first-child').textContent);
                dropdown.value =  this.closest('tr').querySelector('td:first-child').textContent.trim();
                dropdown.disabled = true;
                overlay.style.display = "block";
                Comment.style.visibility = "visible";
                Comment.style.top = "50%";
                Comment.style.transform = "translate(-50%, -50%) scale(1)";
            });
        });

        postComment.addEventListener('click',async function() {
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
                "email": "JohnDoe1@gmail.com",
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

        //     fetch('http://impulsewebapp.azurewebsites.net/api/feedback', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(commentData)
        // })
        // .then(function(response) {
        //     if (response.ok) {
        //         return response.json();
        //     } else {
        //         throw new Error('Network response was not ok');
        //     }
        // })
        // .then(function() {
        //     fetchComments();
        //     document.getElementById('dropdown').value = '';
        //     document.getElementById('message').value = '';

        //     // Close the comment popup
        //     overlay.style.display = "none";
        //     Comment.style.visibility = "hidden";
        //     Comment.style.top = "0";
        //     Comment.style.transform = "translate(-50%, -50%) scale(0.1)";
        // })
        // .catch(function(error) {
        //     // console.error('Error adding comment:', error.message);
        // });
            
        })


        cancelComment.addEventListener('click', function() {
            overlay.style.display = "none";
            Comment.style.visibility = "hidden";
            Comment.style.top = "0";
            Comment.style.transform = "translate(-50%, -50%) scale(0.1)";
            
        })
        

        AddComment.addEventListener('click', function(){
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