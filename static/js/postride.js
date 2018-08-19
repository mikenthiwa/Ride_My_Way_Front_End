document.getElementById('addRideForm').addEventListener('submit', addRide);

function addRide(e) {
    e.preventDefault();

   let origin = document.getElementById('source').value;
   let destination = document.getElementById('destination').value;
   let regNumber = document.getElementById('registrationNumber').value;
   let carModel = document.getElementById('vehicleModel').value;
   let carCapacity = document.getElementById('vehicleCapacity').value;


fetch('https://ridemywayapiv-3.herokuapp.com/api/v3/driver/rides', {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json', "x-access-token": window.localStorage.getItem("x-access-token")},
    body: JSON.stringify({"origin": origin, "destination": destination, "registration number": regNumber,
        "vehicle model": carModel, "vehicle capacity": carCapacity})
})
    .then((res) => res.json())
    .then(data => {

        document.getElementById('flash').innerHTML = data["msg"]
    })
}
