
document.addEventListener("DOMContentLoaded", function(){

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

        postComment.addEventListener('click', function() {
            // add to Comment Section
            // add to database
            //code goes here

            //close Add Comments
            overlay.style.display = "none";
            Comment.style.visibility = "hidden";
            Comment.style.top = "0";
            Comment.style.transform = "translate(-50%, -50%) scale(0.1)";
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