window.addEventListener('load', allRequests);
document.getElementById('requestRidesForm').addEventListener('submit', requestedRides);

// document.getElementById('accept_requestForm').addEventListener("submit", acceptRide);

function allRequests(e) {
    e.preventDefault();

    fetch('https://ridemywayapiv-3.herokuapp.com/api/v3/driver/requests', {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json', "x-access-token": window.localStorage.getItem("x-access-token")}
    })
        .then(res => res.json())
        .then(data => {
            tableheader = `<th> Request Id </th>
                             <th> Ride Id </th>
                             <th> Username </th>
                             <th> Pick up point </th>
                             <th> Time </th>`;
            output = '';
            data.forEach(function (request) {
                output += `<tr><td>${request.request_id}</td>
                               <td>${request.ride_id}</td>
                               <td>${request.username}</td>
                               <td>${request.pickup_point}</td>
                               <td>${request.time}</td>
                               <td data-request_id=${request.request_id} data-rideId=${request.ride_id} class="acceptRide"><button>accept</button></td></tr>`
            });
            document.getElementById('requestTableHeaders').innerHTML = tableheader;
            document.getElementById('requestData').innerHTML = output;

            let button = document.getElementsByClassName('acceptRide');
            for (let i = 0; i < button.length; i++) {
                button[i].addEventListener('click', acceptRide)
            }

        })
}

function requestedRides(e) {
    e.preventDefault();

    ride_id = document.getElementById('rideId').value;
    const data = {"id": ride_id};
    const encodedValue = encodeURIComponent(data.id);

    fetch(`https://ridemywayapiv-3.herokuapp.com/api/v3/driver/rides/${encodedValue}/requests`, {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json', "x-access-token": window.localStorage.getItem("x-access-token")}
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            tableheader = `<th> Request Id </th>
                             <th> Username </th>
                             <th> Pick up point </th>
                             <th> Time </th>`;
            output = '';
            data.forEach(function (request) {
                output += `<tr><td>${request.request_id}</td>
                               <td>${request.pickup_point}</td>
                               <td>${request.username}</td>
                               <td>${request.time}</td>
                           </tr>
                            
                `
            });

            document.getElementById('requestTableHeaders').innerHTML = tableheader;
            document.getElementById('requestData').innerHTML = output;
        })
}

function acceptRide(e) {
    e.preventDefault();
    console.log(123)

    let request = event.target.parentNode;
    let request_id = request.getAttribute("data-request_id");
    let ride_id = request.getAttribute("data-rideId")

    const data = {"id": ride_id, "req_id": request_id};
    const encodedValue = encodeURIComponent(data.id);
    const encodedRequestId = encodeURIComponent(data.req_id);

    fetch(`https://ridemywayapiv-3.herokuapp.com/api/v3/driver/rides/${encodedValue}/requests/${encodedRequestId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {'Content-Type': 'application/json', "x-access-token": window.localStorage.getItem("x-access-token")}
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById('acceptFlash').innerHTML = data["msg"]
        })

}