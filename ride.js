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

            let outpout = `<tr><td> Ride Id: ${data["ride_id"]}</td></tr>
                           <tr><td>Route: ${data["route"]}</td></tr>
                           <tr><td>Driver: ${data["driver"]}</td></tr>
                           <tr><td>Vehicle_Model: ${data["vehicle_model"]}</td></tr>
                            <tr><td>Vehicle Capacity: ${data["vehicle_capacity"]}</td></tr>
                            <tr><td>Status: ${data["status"]}</td></tr>`;
            console.log(data["ride_id"]);
            document.getElementById('rideDetails').innerHTML = outpout
        })
}

