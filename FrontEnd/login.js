// ******** USER AUTHENTIFICATION ************
loginUrl = 'http://localhost:5678/api/users/login';

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', ($event) => {
    $event.preventDefault(); // Empêche le chargement de la page par défaut
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
            userInvalid = document.createElement('small');
            userInvalid.textContent = 'Usager et/ou mot-de-passe incorrects';
            loginForm.appendChild(userInvalid);
        }
        // For sucessful '201 - Created'
        const data = await response.json();
        console.log(data);

        // TODO: stocker le token dans un local storage (stockage au niveau du navigateur)
        // Rediriger vers la page d'accueil avec les icônes pour éditer si couple usager/mdp bon (vérifier d'abord si effectivement on a un toker de retourné)

        // return data.token;
    }

    login();
});
