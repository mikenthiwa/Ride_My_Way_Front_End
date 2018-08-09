window.addEventListener('load', ridesOffered);
document.getElementById('profile').addEventListener('click', ridesOffered);

function ridesOffered(e) {
    e.preventDefault();

    fetch(`http://127.0.0.1:5000/api/v3/driver/rides`, {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json', "x-access-token": window.localStorage.getItem("x-access-token")}
    })
        .then(res => res.json())
        .then(data => {
            if (data["msg"]){
                document.getElementById('rideOffered').innerHTML = `<p style="color: white; padding: 10px; font-size: large">${data["msg"]}</p>`
            }
            let tableheaders = `<tr>
						<td>Ride Id</td>
						<td>Route</td>
						<td>Driver</td>
						<td>Registration Plate</td>
						<td>Vehicle Model</td>
						<td>Vehicle Capacity</td>
						<td>Status</td>
					</tr>`;

            let rides = '';

            data.forEach(function (ride) {
                rides += `
                <tr>
                    <td>${ride.ride_id}</td>
                    <td>${ride.route}</td>
                    <td>${ride.driver}</td>
                    <td>${ride.registration_plate}</td>
                    <td>${ride.vehicle_model}</td>
                    <td>${ride.vehicle_capacity}</td>
                    <td>${ride.status}</td>
                </tr>
            `
            });
            document.getElementById('tableHeader').innerHTML = tableheaders;
            document.getElementById('myRides').innerHTML = rides;
        })

}

