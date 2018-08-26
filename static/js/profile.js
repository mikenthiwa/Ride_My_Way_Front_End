window.addEventListener('load', rides_taken);
document.getElementById('profile').addEventListener('click', rides_taken);

function rides_taken(e) {
    e.preventDefault();

    fetch(`https://ridemywayapiv-3.herokuapp.com/api/v3/profile`, {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json', "x-access-token": window.localStorage.getItem("x-access-token")}

    })
        .then(res => res.json())
        .then(data => {
            if (data["msg"]) {
                document.getElementById('rideOffered').innerHTML = `<p style="color: white; padding: 10px; font-size: large">${data["msg"]}</p>`
            }
            let rides = '';
            let tableheaders = `<tr>
						<td>Pick up Point</td>
						<td>username</td>
						
					</tr>`;
            console.log(data)
            data.forEach(function (ride) {
                rides += `
                    <tr>
                        
                        <td>${ride.pickup_point}</td>
                        <td>${ride.username}</td>
                        
                    </tr>
                
                `
            });
            document.getElementById('tableheader').innerHTML = tableheaders
            document.getElementById('myRides').innerHTML = rides
        })
}