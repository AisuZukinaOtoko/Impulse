window.onload = function() {
  let paragraphElement = document.getElementById('Email');
  let paragraphText = paragraphElement.textContent;
  console.log(paragraphText);
}

function MoveToSite() {
    window.location.href = 'https://manage.auth0.com/dashboard/us/dev-kpk2hlg2oudfcpev/users';
  }

  function MoveToFeedback() {
    window.location.href = 'http://localhost:3000/homepage/FeedbackHR.html';
  }

  function MoveToReports() {
    window.location.href = 'http://localhost:3000/homepage/reportsHr.html';
  }

  function MoveToCarwash() {
    window.location.href = 'http://localhost:3000/homepage/managecarwash.html';
  }

  function MoveToMeals() {
    window.location.href = 'http://localhost:3000/homepage/managemeals.html';
  }

