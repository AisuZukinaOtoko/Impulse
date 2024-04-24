
function showsettingTile() {
    var navSettings = document.getElementById("settingTile");
    if (navSettings.style.display == "none") {
        navSettings.style.display = "flex";
    } else {
        navSettings.style.display = "none";
    }

    var navAccount = document.getElementById("accountTile");
    navAccount.style.display = "none";
}

function showaccountTile() {
    var navAccount = document.getElementById("accountTile");
    if (navAccount.style.display == "none") {
        navAccount.style.display = "flex";
    } else {
        navAccount.style.display = "none";
    }
    var navSettings = document.getElementById("settingTile");
    navSettings.style.display = "none";
}



function hideSidebar(){
    var sidebar =document.getElementById("sidebar");
    var content =document.getElementById("content");
    content.style.marginLeft="0px";
    sidebar.style.display="none";
}