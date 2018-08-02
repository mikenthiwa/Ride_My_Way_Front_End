document.getElementById('signUpPassenger').addEventListener('submit', register);

function register(e) {
    e.preventDefault();

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;


    if (document.getElementById('isDriver').checked === true) {
        is_driver = document.getElementById('isDriver').value = true
    }
    else {
        is_driver = document.getElementById('isDriver').value = false
    }

    if (confirmPassword === password) {
        fetch('http://127.0.0.1:5000/api/v3/auth/signup', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"username": username, "email": email, "password": password, "is_driver": is_driver})
        })
            .then((res) => res.json())
            .catch(err => console.error(err))
            .then(data => {
                if (data[1] === 201) {
                    document.getElementById('flash').innerHTML = data[0]["msg"]

                }
                else {
                    document.getElementById('flash').innerHTML = data["msg"];
                }
            })
    }
    else {
          document.getElementById('flash').innerHTML = "Passwords don't match";


    }
}









