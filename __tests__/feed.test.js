const { 
    enableSubmitButton, 
    submitFeedback, 
    resetForm, 
    addFeedback 
} = require('../public/js_files/feedback');

document.body.innerHTML = `
  <input type="text" id="comment" />
  <button id="submit" disabled>Submit</button>
  <article class="comments__container"></article>
`;
let feedbackArr1 = [];
let feedbackArr2 = [];

// Test enableSubmitButton function
test('Enables submit button when a project card is clicked', () => {
  // Mock project cards
  document.body.innerHTML += `
    <article class="employee_card" data-username="JaneSmith">Project Card 1</article>
    <article class="employee_card" data-username="MarkJohnson">Project Card 2</article>
  `;


  const submitBtn = document.querySelector('#submit');
  const projectCards = document.querySelectorAll('.employee_card');

  // Simulate clicking 
  projectCards.forEach(card => {
    card.click(); // Simulate clicking a project card
    expect(submitBtn.disabled).toBe(false); 
  });
});



// Test submitFeedback function
test('Submits feedback and adds it to the appropriate array', () => {
  document.querySelector('#comment').value = 'Test comment';
  document.querySelector('#comment').setAttribute('data-username', 'JaneSmith');
  
  // Call the function to submit feedback
  submitFeedback(new Event('click'));

  // Check if feedback is added 
  expect(feedbackArr1.length).toBe(1); 
  
  // Check if comment input is cleared
  expect(document.querySelector('#comment').value).toBe('');

  // Check if submit button is disabled
  expect(document.querySelector('#submit').disabled).toBe(true);
});



// Test resetForm function
test('Resets the comment form', () => {
  document.querySelector('#comment').value = 'Test comment';
  resetForm();

  // Check if comment input is cleared
  expect(document.querySelector('#comment').value).toBe('');
  expect(document.querySelector('#submit').disabled).toBe(true);
});


// Test addFeedback function
test('Adds feedback to the comments container', () => {
  // Mock feedback item
  const feedback = {
    id: 1,
    userName: 'JaneSmith',
    userComment: 'Test comment'
  };

  // Call the function to add feedback
  addFeedback(feedback);
  expect(document.querySelector('.comments__container').innerHTML).toContain(feedback.userName);
  expect(document.querySelector('.comments__container').innerHTML).toContain(feedback.userComment);
});
