// Write your JavaScript code here!
window.addEventListener("load", function() {
   let randomDestination = Math.floor(Math.random()*6);

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
    response.json().then(function(json) {
       const missionTarget = document.getElementById("missionTarget");
         missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[randomDestination].name}</li>
                  <li>Diameter: ${json[randomDestination].diameter}</li>
                  <li>Star: ${json[randomDestination].star}</li>
                  <li>Distance from Earth: ${json[randomDestination].distance}</li>
                  <li>Number of Moons: ${json[randomDestination].moons}</li>
               </ol>
            <img src="${json[randomDestination].image}"></img>
            `;         
       });
    });

   let form = document.querySelector("form");
   let pilotName;
   let copilotName;
   let fuelLevel;
   let cargoMass;

   //all validation 
   form.addEventListener("submit", function(event) {
      pilotName = document.querySelector("input[name=pilotName]").value;
      copilotName = document.querySelector("input[name=copilotName]").value;
      fuelLevel = document.querySelector("input[name=fuelLevel]").value;
      cargoMass = document.querySelector("input[name=cargoMass]").value;


      if (pilotName === "" || copilotName === "" || fuelLevel === ""|| cargoMass === ""){
         alert("All fields are required!");
         event.preventDefault();
      } else if (!isNaN(pilotName) || !isNaN(copilotName)|| isNaN(fuelLevel) ||isNaN(cargoMass)){
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      }

      document.getElementById("pilotStatus").innerHTML = `${pilotName} Ready`;
      document.getElementById('copilotStatus').innerHTML = `${copilotName} Ready`;

 //updating shuttle requirements
 let faultyItems = document.getElementById("faultyItems");
 let launchStatus = document.getElementById("launchStatus");
 let fuelStatus = document.getElementById("fuelStatus");
 let cargoStatus = document.getElementById("cargoStatus");

console.log(fuelLevel);
if (fuelLevel >= 10000 && cargoMass <= 10000){
   launchStatus.style.color = "green";
   launchStatus.innerHTML = "Shuttle is ready for launch";
} 
if (fuelLevel < 10000){
    faultyItems.style.visibility = "visible";
    fuelStatus.innerHTML = "Fuel level too low for launch";
    launchStatus.style.color ="red";
    launchStatus.innerHTML = "Shuttle not ready for launch";
 } 
 if (cargoMass > 10000){
    faultyItems.style.visibility = "visible";
    cargoStatus.innerHTML = "Cargo mass too high for launch";
    launchStatus.style.color = "red";
    launchStatus.innerHTML = "Shuttle not ready for launch";
 }
event.preventDefault();
});
});
