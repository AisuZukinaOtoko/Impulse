function showSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.style.display='flex';
    content.style.marginLeft="150px";
}
function hideSidebar(){
    var sidebar =document.getElementById("sidebar");
    var content =document.getElementById("content");
    content.style.marginLeft="0px";
    sidebar.style.display="none";
}