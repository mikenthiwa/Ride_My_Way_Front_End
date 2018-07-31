document.getElementById('requestForm').addEventListener('submit', requestRide);

function requestRide(e) {
    e.preventDefault();

    let ride_id = document.getElementById('rideId').value;
    let pick_ip_point = document.getElementById('pickUpPoint').value;
    let time = document.getElementById('time').value;

    const data = {"id": ride_id};
    const encodedValue = encodeURIComponent(data.id);

    fetch(`http://127.0.0.1:5000/api/v3/rides/${encodedValue}/request`, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json', "x-access-token": window.localStorage.getItem("x-access-token")},
        body: JSON.stringify({"pickup_point": pick_ip_point, "time": time})
    })
        .then(res => res.json())
        .then(data => {document.getElementById('flash').innerHTML=data["msg"]})
}

