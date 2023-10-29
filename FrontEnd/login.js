// ******** USER AUTHENTIFICATION ************
loginUrl = "http://localhost:5678/api/users/login";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", ($event) => {
  $event.preventDefault(); // Empêche le chargement de la page par défaut
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userData = {
    email: email,
    password: password,
  };

  async function login() {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // For '400 - Bad Request', '401 - Unauthorized', '500 - Unexpected Error'
    // TODO: use Font Awesome and Bootstrap to creat a nice alert message
    if (response.status != 201 && response.status != 200) {
      userInvalid = document.createElement("small");
      userInvalid.textContent = "Usager et/ou mot-de-passe incorrects";
      loginForm.appendChild(userInvalid);
    } else {
      // Storing the login token on the brower after sucessful '201 - Created'
      const data = await response.json();
      const token = data.token;

      // Using the local storage on the browse to storage a value called 'token' with the token retrieved via the POST request
      localStorage.setItem("token", token);
      console.log(token);
      // Redirecting the browser to homepage after successfull login
      window.location.href = "/FrontEnd/index.html";
    }
  }

  login();
});
