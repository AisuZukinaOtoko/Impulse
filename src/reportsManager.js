const staff = [
    {name: "Jim", surname:"Smith", Project: "ABC", feed: "well Done, team"},
    {name: "Holly", surname:"Clint", Project: "ABC"},
    {name: "Miles", surname:"Mora", Project: "OPP", feed: "Team is good"},
    {name: "Wendy", surname:"Wu", Project: "XYZ"},
    {name: "Tino", surname:"Cruz",Project: "XYZ", feed: "helooooooooo"},
    {name: "Peter", surname:"Parker", Project: "XYZ"},
    {name: "John", surname:"Doe", Project: "ABC"},
    {name: "Nndwa", surname:"Nndwa", Project: "OPP"},
    {name: "Harvey", surname:"Spectre", Project: "OPP"},
    {name: "Keri", surname:"Washington",Project: "OPP", feed: "teamwork makes the dream work" }]

const team = document.getElementById("team");

for(let i=0; i< staff.length; ++i){
 const staffmember = staff[i];
    if(staffmember.Project == "ABC"){

    const members = document.createElement("section");
    members.classList.add("members");

    const iconEl  = document.createElement("i");
    iconEl.classList.add("icons");
    iconEl.setAttribute("data-feather", "user");

    const name = document.createElement("a");
    name.classList.add("names");
    name.textContent = staffmember.name +" "+ staffmember.surname;

        members.appendChild(iconEl);
        members.appendChild(names);

        team.appendChild(members);

        feather.replace();
}
}
