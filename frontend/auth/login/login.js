"use strict";

/*=====================================================
    SCHOOL MANAGEMENT PORTAL
    LOGIN.JS
======================================================*/


/*==============================
        SELECT ELEMENTS
===============================*/

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

const loginBtn = document.getElementById("loginBtn");

const btnText = document.getElementById("btnText");

const loader = document.getElementById("loader");

const message = document.getElementById("message");


/*==============================
     SHOW MESSAGE FUNCTION
===============================*/

function showMessage(text, type){

    message.style.display = "block";

    message.textContent = text;

    if(type === "success"){

        message.style.background = "#DCFCE7";

        message.style.color = "#166534";

        message.style.border = "1px solid #22C55E";

    }

    else{

        message.style.background = "#FEE2E2";

        message.style.color = "#991B1B";

        message.style.border = "1px solid #EF4444";

    }

}


/*==============================
    TOGGLE PASSWORD
===============================*/

togglePassword.addEventListener("click", () => {

    const icon = togglePassword.querySelector("i");

    if(passwordInput.type === "password"){

        passwordInput.type = "text";

        icon.classList.replace("fa-eye", "fa-eye-slash");

    }

    else{

        passwordInput.type = "password";

        icon.classList.replace("fa-eye-slash", "fa-eye");

    }

});


/*==============================
      LOGIN SUBMIT
===============================*/

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    message.style.display = "none";

    const email = emailInput.value.trim();

    const password = passwordInput.value.trim();

    if(email === "" || password === ""){

        showMessage("Please enter your email and password.", "error");

        return;

    }

    btnText.style.display = "none";

    loader.style.display = "inline-block";

    loginBtn.disabled = true;

    try{

        const response = await fetch("http://localhost:5000/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email,

                password

            })

        });

        const data = await response.json();

        if(!response.ok){

            throw new Error(data.message || "Login failed.");

        }

        /*==============================
            SAVE TOKEN & USER
        ===============================*/

        localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(data.user));


        showMessage("Login successful. Redirecting...", "success");


        /*==============================
            REDIRECT BY ROLE
        ===============================*/

        setTimeout(() => {

            switch(data.user.role){

                case "admin":

                    window.location.href = "../../admin/dashboard/dashboard.html";

                    break;

                case "staff":

                    window.location.href = "../../staff/dashboard/dashboard.html";

                    break;

                case "student":

                    window.location.href = "../../student/dashboard/dashboard.html";

                    break;

                default:

                    showMessage("Unknown user role.", "error");

            }

        }, 1000);

    }

    catch(error){

        showMessage(error.message, "error");

    }

    finally{

        btnText.style.display = "inline";

        loader.style.display = "none";

        loginBtn.disabled = false;

    }

});