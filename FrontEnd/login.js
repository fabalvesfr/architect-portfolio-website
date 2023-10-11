// ******** USER AUTHENTIFICATION ************
loginUrl = 'http://localhost:5678/api/users/login';

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', ($event) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        "email": email,
        "password": password
    }

    async function login(){
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // For '400 - Bad Request', '401 - Unauthorized', '500 - Unexpected Error'
        if (response.status != 201){
            $event.preventDefault();
            userInvalid = document.createElement('small');
            userInvalid.textContent = 'Usager et/ou mot-de-passe incorrects';
            loginForm.appendChild(userInvalid);
        }
        // For sucessful '201 - Created'
        const data = await response.json();
        return data.token;
    }

    login();
});
