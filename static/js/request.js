
document.getElementById('joinButton').addEventListener('click', requestRide);

function requestRide(e) {
    e.preventDefault();


    let ride_id = localStorage.getItem('ride_id');

    let pick_ip_point = document.getElementById('pickUpPoint').value;
    let time = new Date().toLocaleTimeString();

    const data = {"id": ride_id};
    const encodedValue = encodeURIComponent(data.id);

    fetch(`https://ridemywayapiv-3.herokuapp.com/api/v3/rides/${encodedValue}/request`, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json', "x-access-token": window.localStorage.getItem("x-access-token")},
        body: JSON.stringify({"pickup_point": pick_ip_point, "time": time})
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById('requestFlash').innerHTML = data["msg"]
        })
}

