

function showsettingTile() {
    var navSettings = document.getElementById("settingTile");
    if (navSettings.style.transform == "translateX(-100%)") {
        navSettings.style.transform = "translateX(0)";
    } else {
        navSettings.style.transform = "translateX(-100%)";
    }

    var navAccount = document.getElementById("accountTile");
    navAccount.style.transform = "translateX(-100%)";
    // navAccount.style.display = "none";
}

function showaccountTile() {
    var navAccount = document.getElementById("accountTile");
    if (navAccount.style.transform == "translateX(-100%)") {
        // navAccount.style.display = "flex";
        navAccount.style.transform = "translateX(0)";
    } else {

        navAccount.style.transform = "translateX(-100%)";
    }
    var navSettings = document.getElementById("settingTile");
    navSettings.style.transform = "translateX(-100%)";
}


function home(){
    var navAccount = document.getElementById("accountTile");
    var navSettings = document.getElementById("settingTile");
    navSettings.style.transform = "translateX(-100%)";
    navAccount.style.transform = "translateX(-100%)";

}



function hideSidebar(){
    var sidebar =document.getElementById("sidebar");
    var content =document.getElementById("content");
    content.style.marginLeft="0px";
    sidebar.style.display="none";
}

document.getElementById("report").addEventListener("click", function() {
    window.location.href = "feedback.html";
});


