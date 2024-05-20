var profile = document.getElementById("profile");
var settings = document.getElementById("settings");
var notifications = document.getElementById("notifications");
var logout = document.getElementById("logout");

var exit = document.getElementsByClassName("exit");

var profileSection = document.getElementById("profile-section");
var settingsSection = document.getElementById("settings-section");
var notificationsSection = document.getElementById("notifications-section");
var logoutSection = document.getElementById("logout-section");

function toggleActive(element){
    
    element.classList.add('active');
}

function toggleDeActive(element){

    element.classList.remove('active');

}

function ExitNav(){

    toggleDeActive(profile);
    toggleDeActive(settings);
    toggleDeActive(notifications);
    toggleDeActive(logout);

   profileSection.style.display = "none";
   settingsSection.style.display = "none";
    notificationsSection.style.display = "none";
    logoutSection.style.display = "none";
}

for (var i=0; i< exit.length; ++i){
    exit[i].addEventListener('click', function(){
        ExitNav();
    });
}

profile.onclick = function(){
   
   profileSection.style.display = "block";
   settingsSection.style.display = "none";
    notificationsSection.style.display = "none";
    logoutSection.style.display = "none";

};

settings.onclick = function(){

    settingsSection.style.display = "block";
    profileSection.style.display = "none";
    notificationsSection.style.display = "none";
    logoutSection.style.display = "none";

};

notifications.onclick = function(){

   notificationsSection.style.display = "block";
   settingsSection.style.display = "none";
   profileSection.style.display = "none";
   logoutSection.style.display = "none";

};

logout.onclick = function(){

   logoutSection.style.display = "block";
   settingsSection.style.display = "none";
   profileSection.style.display = "none";
   notificationsSection.style.display = "none";
   
};


