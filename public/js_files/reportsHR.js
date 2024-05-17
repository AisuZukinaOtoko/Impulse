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
  
  var csv = document.getElementsByClassName("csv");
  var pdf = document.getElementsByClassName("pdf");
  
  var report1_btn = document.getElementById("report1_btn");
  var report2_btn = document.getElementById("report2_btn");
  var report3_btn = document.getElementById("report3_btn");
  var report4_btn = document.getElementById("report4_btn");
  
  var report1Seg = document.getElementById("report1");
  var report2Seg = document.getElementById("report2");
  var report3Seg  = document.getElementById("report3");
  var report4Seg = document.getElementById("report4");
  
  report1_btn.onclick = function(){
     
    report1Seg.style.display = "block";
    report2Seg.style.display = "none";
    report3Seg.style.display = "none";
    report4Seg.style.display = "none";
   };
  
   report2_btn.onclick = function(){
    report1Seg.style.display = "none";
    report2Seg.style.display = "block";
    report3Seg.style.display = "none";
    report4Seg.style.display = "none";
   };
  
   report3_btn.onclick = function(){
    report1Seg.style.display = "none";
    report2Seg.style.display = "none";
    report3Seg.style.display = "block";
    report4Seg.style.display = "none";
  
    
   };
  
  
   report4_btn.onclick = function(){
     
    report1Seg.style.display = "none";
    report2Seg.style.display = "none";
    report3Seg.style.display = "none";
    report4Seg.style.display = "block";
  
    for(let i=0; i<staff.length; i++){
      const staffmember = staff[i];
  
      const sectionsEl = document.createElement("sections");
      sectionsEl.classList.add("staff");
  
      const iconEl  = document.createElement("i");
      iconEl.classList.add("icons");
      iconEl.setAttribute("data-feather", "user");
  
      const name = document.createElement("a");
      name.classList.add("names");
      name.textContent = staffmember.name +" "+ staffmember.surname;
  
      sectionsEl.appendChild(iconEl);
      sectionsEl.appendChild(name);
  
      stafflist.appendChild(sectionsEl);
  
      feather.replace();
  
    }
    
   };
  
  
  
  //  barchart
   var options = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'hours',
        data: [8, 4, 12, 11, 10, 5, 14, 16, 15, 12]
      }],
      xaxis: {
        categories: ['Jim smith',' Miles Morales','Wendy Wu','Tino Cruz','Peter Parker','Harvey Spectre','Keri Washington', 'Ndwa Ndwa','John Doe', 'Copper']
      }
    }
  
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    
    chart.render();
  
    var opt = {
      series: [44, 55, 13, 43, 22],
      chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
    };
  
    var pie = new ApexCharts(document.querySelector("#pie"), opt);
    pie.render();
  
  
    var option3 = {
      series: [
      {
        name: 'Wendy Wu',
        data: [
          {
            x: 'Design',
            y: [
              new Date('2019-03-05').getTime(),
              new Date('2019-03-08').getTime()
            ]
          },
          {
            x: 'Code',
            y: [
              new Date('2019-03-02').getTime(),
              new Date('2019-03-05').getTime()
            ]
          },
          {
            x: 'Code',
            y: [
              new Date('2019-03-05').getTime(),
              new Date('2019-03-07').getTime()
            ]
          },
          {
            x: 'Test',
            y: [
              new Date('2019-03-03').getTime(),
              new Date('2019-03-09').getTime()
            ]
          },
          {
            x: 'Test',
            y: [
              new Date('2019-03-08').getTime(),
              new Date('2019-03-11').getTime()
            ]
          },
          {
            x: 'Validation',
            y: [
              new Date('2019-03-11').getTime(),
              new Date('2019-03-16').getTime()
            ]
          },
          {
            x: 'Design',
            y: [
              new Date('2019-03-01').getTime(),
              new Date('2019-03-03').getTime()
            ],
          }
        ]
      },
      {
        name: 'John Doe',
        data: [
          {
            x: 'Design',
            y: [
              new Date('2019-03-02').getTime(),
              new Date('2019-03-05').getTime()
            ]
          },
          {
            x: 'Test',
            y: [
              new Date('2019-03-06').getTime(),
              new Date('2019-03-16').getTime()
            ],
            goals: [
              {
                name: 'Break',
                value: new Date('2019-03-10').getTime(),
                strokeColor: '#CD2F2A'
              }
            ]
          },
          {
            x: 'Code',
            y: [
              new Date('2019-03-03').getTime(),
              new Date('2019-03-07').getTime()
            ]
          },
          {
            x: 'Deployment',
            y: [
              new Date('2019-03-20').getTime(),
              new Date('2019-03-22').getTime()
            ]
          },
          {
            x: 'Design',
            y: [
              new Date('2019-03-10').getTime(),
              new Date('2019-03-16').getTime()
            ]
          }
        ]
      },
      {
        name: 'Miles Morales',
        data: [
          {
            x: 'Code',
            y: [
              new Date('2019-03-10').getTime(),
              new Date('2019-03-17').getTime()
            ]
          },
          {
            x: 'Validation',
            y: [
              new Date('2019-03-05').getTime(),
              new Date('2019-03-09').getTime()
            ],
            goals: [
              {
                name: 'Break',
                value: new Date('2019-03-07').getTime(),
                strokeColor: '#CD2F2A'
              }
            ]
          },
        ]
      }
    ],
      chart: {
      height: 450,
      type: 'rangeBar'
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%'
      }
    },
    xaxis: {
      type: 'datetime'
    },
    stroke: {
      width: 1
    },
    fill: {
      type: 'solid',
      opacity: 0.6
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    }
    };
  
  
    var gantt = new ApexCharts(document.querySelector("#gantt"), option3);
    gantt.render();