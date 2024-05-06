const submitBtn = document.querySelector('#submit');
const commentsCont = document.querySelector('.comments__container');
const comment = document.querySelector('#comment');
const projectCards = document.querySelectorAll('.employee_card');

let feedbackArr1 = [];
let feedbackArr2 = [];


submitBtn.disabled = true;

// Add event listeners to project cards
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const username = card.dataset.username;
        comment.setAttribute('data-username', username);
        // Enable submit button when a project card is clicked
        submitBtn.disabled = false;
    });
});

submitBtn.addEventListener('click', submitFeedback);

function submitFeedback(e) {
    // Get comment and associated username
    const commentForm = comment.value;
    const username = comment.dataset.username;
    
    // If input is not empty
    if (commentForm !== '') {
        // Determine which feedback array to use based on the username
        let feedbackArr;
        if (username === 'JaneSmith') {
            feedbackArr = feedbackArr1;
        } else if (username === 'MarkJohnson') {
            feedbackArr = feedbackArr2;
        } else {
            // Default to feedbackArr1 if username is not recognized
            feedbackArr = feedbackArr1;
        }
        
        // Create new feedback
        const newFeedback = {
            "id": Math.floor((Math.random() * 1000) + 1),
            "userName": username,
            "userComment": commentForm,
        };
        // Add new feedback to the appropriate array
        feedbackArr.push(newFeedback);
        // Clear inputs
        resetForm();
        // Add feedback to list
        addFeedback(newFeedback);
    }

    e.preventDefault();
}

function resetForm() {
    comment.value = '';
    // Disable submit button after submission
    submitBtn.disabled = true;
}

function addFeedback(item) {
    // Create new article
    const article = document.createElement('article');
    // Add class
    article.classList = 'comment__card';
    // Add id
    article.id = item.id;
    // Insert feedback into the list
    article.innerHTML =  `
        <div class="comment__info">
            <p class="username">
                <strong>${item.userName}</strong>
            </p>
            <p class="comment">
                ${item.userComment}
            </p>
        </div>
    `;
    commentsCont.insertAdjacentElement('beforeend', article);
}