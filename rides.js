window.addEventListener('load', getRides);
document.getElementById('rides').addEventListener('click', getRides);


function getRides(e) {
    e.preventDefault();

    fetch('http://127.0.0.1:5000/api/v3/rides', {
         headers: {'Content-Type': 'application/json', "x-access-token": window.localStorage.getItem("x-access-token")}
    })
        .then(res => res.json())
        .then(data => {
            let routes = '';


            data.forEach(function (route) {
                routes += `<a href="myRides.html"><tr class="breakrow" > 
                                                <td>${route.route}</td>
                                                <td>${route.ride_id}</td>
                                                <td>${route.driver}</td>
                                                <td>${route.registration_plate}</td>
                                                <td>${route.vehicle_model}</td>
                                                <td>${route.vehicle_capacity}</td>
                                                <td>${route.status}</td>
                            </tr></a>
                           
                                   
                `;

                });

            document.getElementById('rideOffered').innerHTML = routes;

        })

}
