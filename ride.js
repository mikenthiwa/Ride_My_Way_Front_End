document.getElementById('getRideForm').addEventListener('submit', getRide);

function getRide(e) {
    e.preventDefault();

    rideId = document.getElementById('getRideInput').value;
    const data = {"id": rideId};
    const encodedValue = encodeURIComponent(data.id);
    fetch(`http://127.0.0.1:5000/api/v3/rides/${encodedValue}`, {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json', "x-access-token": window.localStorage.getItem("x-access-token")}
    })

        .then(res => res.json())
        .then(data => {
            if (data["msg"]){

                document.getElementById('flash').innerHTML = data["msg"]
            }else {
                console.log(data);
                document.getElementById('rideID').innerHTML = data["ride_id"];
                document.getElementById('route').innerHTML = data["route"];
                document.getElementById('driver').innerHTML = data["driver"];
                document.getElementById('vehicleModel').innerHTML = data["vehicle_model"];
                document.getElementById('vehicleCapacity').innerHTML = data["vehicle_capacity"];
                document.getElementById('status').innerHTML = data["status"]

            }


        })
}

