var profile = document.getElementById("profile");
var settings = document.getElementById("settings");
var notifications = document.getElementById("notifications");
var logout = document.getElementById("logout");

var overlay = document.getElementById("overlay");

var checkbox = document.getElementById("togglecheckbox");
var navigation = document.getElementById("nav");

var exit = document.getElementsByClassName("exit");

var profileSection = document.getElementById("profile-section");
var settingsSection = document.getElementById("settings-section");
var notificationsSection = document.getElementById("notifications-section");
var logoutSection = document.getElementById("logout-section");

// profileSection.style.display = "block";
// settingsSection.style.display = "none";
// notificationsSection.style.display = "none";

for (var i=0; i< exit.length; ++i){
    exit[i].addEventListener('click', function(){
        normalScreen();
    });
}


checkbox.addEventListener("change", function(){
    if(checkbox.checked){
        navigation.style.transform = "translateX(0)";


    }else{
        navigation.style.transform = "translateX(-100%)";
        normalScreen();
    }
});


function toggleActive(element){
    
        element.classList.add('active');
}

function toggleDeActive(element){

        element.classList.remove('active');

}

function normalScreen(){
    toggleDeActive(profile);
    toggleDeActive(settings);
    toggleDeActive(notifications);
    toggleDeActive(logout);

    overlay.style.display ="none";
   profileSection.style.display = "none";
   settingsSection.style.display = "none";
    notificationsSection.style.display = "none";
    logoutSection.style.display = "none";
}

overlay.onclick = function(){
   normalScreen();

}

profile.onclick = function(){
   
   overlay.style.display ="block";
   profileSection.style.display = "block";
   settingsSection.style.display = "none";
    notificationsSection.style.display = "none";
    logoutSection.style.display = "none";

    toggleActive(profile);
    toggleDeActive(settings);
    toggleDeActive(notifications);
    toggleDeActive(logout);

};

settings.onclick = function(){

    overlay.style.display ="block";
    settingsSection.style.display = "block";
    profileSection.style.display = "none";
    notificationsSection.style.display = "none";
    logoutSection.style.display = "none";

    toggleActive(settings);
    toggleDeActive(profile);
    toggleDeActive(notifications);
    toggleDeActive(logout);

};

notifications.onclick = function(){

    overlay.style.display ="block";
   notificationsSection.style.display = "block";
   settingsSection.style.display = "none";
   profileSection.style.display = "none";
   logoutSection.style.display = "none";

   toggleActive(notifications);
   toggleDeActive(settings);
    toggleDeActive(profile);
    toggleDeActive(logout);

};

logout.onclick = function(){

    overlay.style.display ="block";
   logoutSection.style.display = "block";
   settingsSection.style.display = "none";
   profileSection.style.display = "none";
   notificationsSection.style.display = "none";

   toggleActive(logout);
   toggleDeActive(settings);
    toggleDeActive(profile);
    toggleDeActive(notifications);

};


// Refresh page
window.addEventListener("load", function(){
    checkbox.checked = false;
});


