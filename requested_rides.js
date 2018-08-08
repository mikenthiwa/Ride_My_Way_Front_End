window.addEventListener('load', allRequests);
document.getElementById('requestRidesForm').addEventListener('submit', requestedRides);
document.getElementById('accept_requestForm').addEventListener("submit", acceptRide);

function allRequests(e) {
    e.preventDefault();

    fetch('http://127.0.0.1:5000/api/v3/driver/requests', {
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
                output +=`<tr><td>${request.request_id}</td>
                               <td>${request.ride_id}</td>
                               <td>${request.username}</td>
                               <td>${request.pickup_point}</td>
                               <td>${request.time}</td></tr>`
            });
            document.getElementById('requestTableHeaders').innerHTML = tableheader;
            document.getElementById('requestData').innerHTML = output;
        })
}

function requestedRides(e) {
    e.preventDefault();

    ride_id = document.getElementById('rideId').value;
    const data = {"id": ride_id};
    const encodedValue = encodeURIComponent(data.id);

    fetch(`http://127.0.0.1:5000/api/v3/driver/rides/${encodedValue}/requests`, {
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

    ride_id = document.getElementById('acceptRide_Id').value;
    request_id = document.getElementById('requestId').value;

    const data = {"id": ride_id, "req_id": request_id};
    const encodedValue = encodeURIComponent(data.id);
    const encodedRequestId = encodeURIComponent(data.req_id);

    fetch(`http://127.0.0.1:5000/api/v3/driver/rides/${encodedValue}/requests/${encodedRequestId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {'Content-Type': 'application/json', "x-access-token": window.localStorage.getItem("x-access-token")}
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById('acceptFlash').innerHTML = data["msg"]
        })

}