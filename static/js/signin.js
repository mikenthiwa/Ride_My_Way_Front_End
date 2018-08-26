document.getElementById('loginForm').addEventListener('submit', register);

function register(e) {
    e.preventDefault();
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    fetch('https://ridemywayapiv-3.herokuapp.com/api/v3/auth/login', {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"email": email, "password": password})
    })
        .then((res) => res.json())
        .then(data => {
            if (data["msg"]) {
                document.getElementById('flash').innerHTML = data["msg"]
            }
            if (data["login successful"]) {
                window.localStorage.setItem("x-access-token", data["login successful"]["token"]);
                let token = window.localStorage.getItem("x-access-token");
                let payload = JSON.parse(atob(token.split('.')[1]));

                if (payload.is_driver) {
                    window.location.replace('dashboard.html')
                }
                else {
                    window.location.replace('home_user.html')
                }
            }
        })
}

