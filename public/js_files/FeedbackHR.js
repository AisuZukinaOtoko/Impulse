document.addEventListener("DOMContentLoaded", function(){
    const toggleBar = document.getElementById("open-Requests");
    const reqsection = document.getElementById("reqSection");


    // collapse and expand
    toggleBar.addEventListener('click', function() {
        reqsection.classList.toggle('expanded');
        reqsection.classList.toggle('collapsed');
    })

    //Log a feedback request
    const Reqbutton = document.getElementById("reqFeedback");
    const stafflist = document.getElementById("stafflist");
    const overlay = document.getElementById("overlay");

    //cancel request

    const closelist = document.getElementById("closelist");


    closelist.addEventListener('click', function() {
        overlay.style.display = "none";
        stafflist.style.visibility = "hidden";
        stafflist.style.top = "0";
        stafflist.style.transform = "translate(-50%, -50%) scale(0.1)";
        
    })

    //search staff member



    Reqbutton.addEventListener('click', function(){
        overlay.style.display = "block";
            stafflist.style.visibility = "visible";
            stafflist.style.top = "50%";
            stafflist.style.transform = "translate(-50%, -50%) scale(1)";
    })
})