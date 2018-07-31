document.getElementById('addRideForm').addEventListener('submit', addRide);

function addRide(e) {
    e.preventDefault();

   let route = document.getElementById('rideRoute').value;
   let regNumber = document.getElementById('registrationNumber').value;
   let carModel = document.getElementById('vehicleModel').value;
   let carCapacity = document.getElementById('vehicleCapacity').value;

fetch('http://127.0.0.1:5000/api/v3/driver/rides', {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json', "x-access-token": window.localStorage.getItem("x-access-token")},
    body: JSON.stringify({"route": route, "registration number": regNumber,
        "vehicle model": carModel, "vehicle capacity": carCapacity})
})
    .then((res) => res.json())
    .then(data => {
        // console.log(data['msg'])
        document.getElementById('flash').innerHTML = data["msg"]
    })
}
