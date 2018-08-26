window.addEventListener('load', getRides);
document.getElementById('rides').addEventListener('click', getRides);


function getRides(e) {
    e.preventDefault();

    fetch('https://ridemywayapiv-3.herokuapp.com/api/v3/rides', {
        headers: {'Content-Type': 'application/json', "x-access-token": window.localStorage.getItem("x-access-token")}
    })
        .then(res => res.json())
        .then(data => {
            if (data["msg"]) {
                document.getElementById('rideOffered').innerHTML = `<p style="color: white; padding: 10px; font-size: large">${data["msg"]}</p>`
            }
            let tableHeaders = `<th> Route </th>
					 <th> Driver Name </th>
					 <th> Registration plate </th>
					 <th> Vehicle Model </th>
					 <th> Vehicle Capacity </th>
					 <th> Status </th>`;

            let routes = '';
            data.forEach(function (route) {
                routes += `<a href="../../myRequests.html"><tr class="breakrow"> 
                                                <td>${route.route}</td>
                                                <td>${route.driver}</td>
                                                <td>${route.registration_plate}</td>
                                                <td>${route.vehicle_model}</td>
                                                <td>${route.vehicle_capacity}</td>
                                                <td>${route.status}</td>
                                                <td data-id=${route.ride_id} class="viewRide"><button class="viewRideBtn">View</button></td></tr></a> 
                `;

            });

            document.getElementById('table_headers').innerHTML = tableHeaders;
            document.getElementById('rideOffered').innerHTML = routes;

            let button = document.getElementsByClassName('viewRideBtn');
            for (let i = 0; i < button.length; i++) {
                button[i].addEventListener('click', getRide)
            }
        })


}


