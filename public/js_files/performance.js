// Sample data: task completion percentage (0-100)
var taskCompletionPercentage = 50;

// Function to update progress bar width based on task completion percentage
function updateProgressBar(percentage) {
    var progressBar = document.getElementById("progressBar");
    progressBar.style.width = percentage+'%' ;
}

updateProgressBar(taskCompletionPercentage);
// Sample data for hours worked this week (replace with actual data)
var hoursWorkedData = [6, 3, 4, 6, 4, 7]; // Hours worked each day of the week (Sunday to Saturday)

// Create line chart using ApexCharts


// Create line chart using ApexCharts
var options = {
  chart: {
    type: 'line',
    height: 350,
    width: '100%',
  },
  series: [{
    name: 'Hours Worked This Week',
    data: hoursWorkedData,
  }],
  xaxis: {
    categories: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // Days of the week
  },
};

var chart = new ApexCharts(document.querySelector("#hourChart"), options);
chart.render();

console.log("Hello_world!!");
