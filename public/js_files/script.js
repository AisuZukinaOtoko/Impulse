// function multiply(a, b) {
//     return a * b;
// }
  
//   // Export the functions so they can be imported in the test file
// module.exports = { multiply };

const { spawn } = require("child_process");

const pythonProcess = spawn("python", ["../python/model.py"]);
pythonProcess.stdout.on("data", (data) => {
        const result = JSON.parse(data.toString());
        let carCount = 0;
        result.predictions.forEach(prediction => {
          if (prediction.class === 'Car' && prediction.confidence > 0.68) {
            carCount++;
          }
        });
        console.log("Number of cars with confidence above 70%:", carCount);
        
        
    
});