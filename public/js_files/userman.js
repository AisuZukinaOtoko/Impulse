document.querySelector('.searchbar').value = "";

const list = document.querySelector('.list');

const searchimg = document.getElementById("search-img-js"); 
searchimg.addEventListener('click', searchshow);
searchimg.addEventListener('keyup', enterkeyShow);

const searchbar = document.querySelector('.searchbar'); 
searchbar.addEventListener('keyup', search);

const closeimg = document.getElementById("close-img-js"); 
closeimg.addEventListener('click', closeimgfunction);
closeimg.addEventListener('keyup', enterkeyClose);

// Hide All function when you click anywhere on the background
function hideallfunction(){
    document.querySelectorAll('.globalsearchremove').forEach(el => el.classList.remove('show'))
    document.querySelectorAll('.globalsearchremove').forEach(el => el.classList.add('hide'))
    document.querySelector('.searchbar').value = "";
    document.querySelector('.searchbar').setAttribute("placeholder", "Search...");
    document.getElementById('close-img-js').setAttribute("tabindex", "-1");
    window.setTimeout(hideallfunction2, 500);
}

function hideallfunction2(){
    document.querySelectorAll('.globalsearchremove').forEach(el => el.classList.remove('add'))
    document.querySelectorAll('.globalsearchremove').forEach(el => el.classList.add('remove'))
}

//showing the list under circumstances (if it's not empty, you show the list with the result when you click on the search icon.
// if it isn't empty it focuses on the search bar so you'd type something.)
function searchshow(){
    let input = document.querySelector('.searchbar').value

if (input !== "") {
    document.querySelector('.list').classList.add('add');
    document.querySelector('.closeimg').classList.add('add');
    document.querySelector('.borderbetween').classList.add('add');
    document.querySelector('.searchbar').setAttribute("placeholder", "Search...");
    document.getElementById('close-img-js').setAttribute("tabindex", "4");
    window.setTimeout(searchshow2, 100);
} else {
    document.querySelector('.searchbar').focus();
    document.querySelector('.searchbar').setAttribute("placeholder", "Please search something...");
}
}

function searchshow2(){
    document.querySelector('.list').classList.add('show');
    document.querySelector('.closeimg').classList.add('show');
    document.querySelector('.borderbetween').classList.add('show');
}

//global search function
function search() {
	let input = document.querySelector('.searchbar').value
	input=input.toLowerCase();
	let x = document.getElementsByClassName('section');
    let noresult = document.querySelector('.noresult');
    let list= document.querySelector('.list').childElementCount;

	for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes(input)) {
			x[i].style.display="none";
            list -= 1;
		} else {
			x[i].style.display="list-item";
            list += 1;
		}

 if (list === 1) {
    noresult.style.display="list-item";
} else {
 noresult.style.display="none";
}

}
}


function addEmployee() {
    // Get input values
    var username = document.getElementById("addInput").value;
    var password = document.getElementById("addpass").value;
    var project = document.getElementById("addProj").value;

    if(username==""){
        alert("Name is required");
        return false;
    }
    if(password==""){
        alert("Password is required");
        return false;
    }
    // Create elements for employee card
    var employeeCard = document.createElement("article");
    employeeCard.classList.add("employee_card");
  
    // Set data-username attribute
    employeeCard.setAttribute("data-username", username);
  
    var employeeDetails = document.createElement("article");
    employeeDetails.classList.add("employee_details");
  
    var imgContainer = document.createElement("article");
    imgContainer.classList.add("img");
    imgContainer.innerHTML = "<i class='fab fa-google-drive'></i>";
  
    var textContainer = document.createElement("article");
    textContainer.classList.add("text");
  
    var usernameHeading = document.createElement("h2");
    usernameHeading.textContent = username;
  
    var projectSpan = document.createElement("span");
    projectSpan.textContent = project;
  
    // Create delete button
    var deleteButton = document.createElement("button");
    deleteButton.classList.add("delete_button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        deleteEmployee(this);
    };
  
    // Append elements
    textContainer.appendChild(usernameHeading);
    textContainer.appendChild(projectSpan);
    employeeDetails.appendChild(imgContainer);
    employeeDetails.appendChild(textContainer);
    employeeCard.appendChild(employeeDetails);
    employeeCard.appendChild(deleteButton); // Append delete button
  
    // Append to employee list
    var employeeList = document.querySelector(".employee_list");
    employeeList.appendChild(employeeCard);
  
    // Close popup
    closePopup();
}


//function for when you click ENTER or ESC on keyboard when interacting with the search bar.
searchbar.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      searchshow();
    } else if (event.keyCode === 27) {
        event.preventDefault();
        closeimgfunction();
        document.querySelector('.searchbar').setAttribute("placeholder", "Search...");
    }
  }); 

list.addEventListener("keyup", function(event) {
    if (event.keyCode === 27) {
        event.preventDefault();
        closeimgfunction();
    }
  }); 

//the function for the X button and closing the list
function closeimgfunction() {
    document.querySelectorAll('.globalsearchremove').forEach(el => el.classList.remove('show'))
    document.querySelectorAll('.globalsearchremove').forEach(el => el.classList.add('hide'))
    document.querySelector('.searchbar').value = "";
    document.getElementById('close-img-js').setAttribute("tabindex", "-1");
    window.setTimeout(closeimgfunction2, 500);
}

function closeimgfunction2() {
    document.querySelectorAll('.globalsearchremove').forEach(el => el.classList.remove('add'))
    document.querySelectorAll('.globalsearchremove').forEach(el => el.classList.add('remove'))
}

//keyboard functions
function enterkeyShow(event) {
    if (event.keyCode === 13) {
        searchshow();
    }
}

function enterkeyClose(event) {
    if (event.keyCode === 13) {
        closeimgfunction();
        document.querySelector('.searchbar').setAttribute("placeholder", "Search...");
    }
}

function esckey(event) {
    if (event.keyCode === 27) {
        closeimgfunction();
        document.querySelector('.searchbar').setAttribute("placeholder", "Search...");
}

}
let popup=document.getElementById("popup");

function openPopup(){
    popup.classList.add("open-popup");
}

const addInput=document.querySelector('#addInput');
const addBtn= document.querySelector('#addBtn');

function closePopup(){
    popup.classList.remove("open-popup");
}

  function show(){
    document.querySelector('.hamburger').classList.toggle('open')
    document.querySelector('.navigation').classList.toggle('active')
}
 
function hide() {
    document.querySelector('.hamburger').classList.remove('open');
    document.querySelector('.navigation').classList.remove('active');
}

document.getElementById('show-select-all').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById('select-all-container').style.display = 'block';
    hide();
  });

  function deleteEmployee(button) {
    // Get the parent element (employee_card) of the button
    var employeeCard = button.parentElement;
  
    // Remove the employee card from the employee list
    employeeCard.remove();
  }

  function searchEmployees() {
    // Get the search input value
    const searchInput = document.getElementById("search-bar-js").value.toLowerCase();
  
    // Get all employee cards
    const employeeCards = document.querySelectorAll(".employee_card");
  
    // Loop through each employee card
    employeeCards.forEach((card) => {
      // Get the username of the employee from data attribute
      const username = card.dataset.username.toLowerCase();
  
      // Check if the search input matches the username
      if (username.includes(searchInput)) {
        // Show the card if the username matches
        card.style.display = "block";
      } else {
        // Hide the card if the username doesn't match
        card.style.display = "none";
      }
    });
  }
  // Add event listener to the search input
  document.getElementById("search-bar-js").addEventListener("input", searchEmployees);
  

  document.addEventListener('DOMContentLoaded', function() {
    // Function to add checkboxes to employee cards
    function addCheckboxes() {
      var employeeCards = document.querySelectorAll('.employee_card');
      employeeCards.forEach(function(card) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'employee-checkbox';
        card.insertBefore(checkbox, card.firstChild);
      });
      document.getElementById('select-all').style.display = 'inline'; // Show the Select All checkbox
      document.getElementById('cancel-checkboxes').style.display = 'inline'; // Show the Cancel button
    }

    // Function to remove checkboxes
    function removeCheckboxes() {
      var checkboxes = document.querySelectorAll('.employee-checkbox');
      checkboxes.forEach(function(checkbox) {
        checkbox.remove();
      });
      document.getElementById('select-all').checked = false;
      document.getElementById('select-all').style.display = 'none';
      document.getElementById('cancel-checkboxes').style.display = 'none'; // Hide the Cancel button
    }

    // Function to toggle checkboxes when the link is clicked
    document.getElementById('toggle-checkboxes').addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default link behavior
      var selectAllCheckbox = document.getElementById('select-all');
      if (selectAllCheckbox.style.display === 'none') {
        addCheckboxes(); // Add checkboxes when the link is clicked
      } else {
        removeCheckboxes(); // Remove checkboxes if already added
      }
    });

    // Function to handle "Select All" functionality
    document.getElementById('select-all').addEventListener('change', function() {
      var checkboxes = document.querySelectorAll('.employee-checkbox');
      checkboxes.forEach(function(checkbox) {
        checkbox.checked = this.checked;
      });
    });

    // Function to handle canceling
    document.getElementById('cancel-checkboxes').addEventListener('click', function() {
      removeCheckboxes(); // Remove checkboxes when the Cancel button is clicked
    });
  });