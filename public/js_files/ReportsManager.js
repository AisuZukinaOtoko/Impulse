document.addEventListener("DOMContentLoaded", function(){

    //collapse & expand
        // Select all report links
        const reportLinks = document.querySelectorAll('.reports');

        reportLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const article = this.closest('.lists');
                article.classList.toggle('expanded');
            });
        });
    //popup
    const popup = document.getElementById("popup-page");
    const overlay = document.getElementById("overlay");
    const viewReport = document.querySelectorAll('.view');

    viewReport.forEach(button =>{
        button.addEventListener('click', function(event){
            event.preventDefault();

            //code for contents in the report according to report type
            overlay.style.display = "block";
            popup.style.visibility = "visible";
            popup.style.top = "50%";
            popup.style.transform = "translate(-50%, -50%) scale(1)";
        })
    })
        //within the popup
        const closeReport = document.getElementById("closereport");
        const csv = document.getElementById("csv");
        const pdf= document.getElementById("pdf");

        //close
        closeReport.addEventListener('click', function(event) {
            event.preventDefault();
            overlay.style.display = "none";
            popup.style.visibility = "hidden";
            popup.style.top = "0";
           popup.style.transform = "translate(-50%, -50%) scale(0.1)";
            
        })

    feather.replace();
})


// the reports - overall - totals(teamSize, TeamStatus) - TotalHours - tasks