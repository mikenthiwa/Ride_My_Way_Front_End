
function getRide() {



    let ride = event.target.parentNode;
    let id = ride.getAttribute("data-id");
    const data = {"id": id};

    const encodedValue = encodeURIComponent(data.id);
    fetch(`https://ridemywayapiv-3.herokuapp.com/api/v3/rides/${encodedValue}`, {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json', "x-access-token": window.localStorage.getItem("x-access-token")}
    })

        .then(res => res.json())
        .then(data => {
            localStorage.setItem('ride_id', data["ride_id"]);
            localStorage.setItem('route', data["route"]);
            localStorage.setItem('driver', data["driver"]);
            localStorage.setItem('vehicle_model', data["vehicle_model"]);
            localStorage.setItem('vehicle_capacity', data["vehicle_model"]);
            localStorage.setItem('status', data["status"]);
            window.location = "View_ride.html"

        })
}

if (window.location.pathname.endsWith('View_ride.html')){
    console.log(localStorage.getItem('route'))
    document.getElementById('rideID').innerHTML = localStorage.getItem('ride_id');
    document.getElementById('route').innerHTML = localStorage.getItem('route');
    document.getElementById('driver').innerHTML = localStorage.getItem('driver');
    document.getElementById('vehicleModel').innerHTML = localStorage.getItem('vehicle_model');
    document.getElementById('vehicleCapacity').innerHTML = localStorage.getItem('vehicle_capacity');
    document.getElementById('status').innerHTML = localStorage.getItem('status');

}



