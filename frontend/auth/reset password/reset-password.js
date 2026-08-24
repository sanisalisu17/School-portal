"use strict";

/*=====================================================
    SCHOOL MANAGEMENT PORTAL
    RESET-PASSWORD.JS
======================================================*/


/*==============================
        SELECT ELEMENTS
===============================*/

const resetPasswordForm = document.getElementById("resetPasswordForm");

const passwordInput = document.getElementById("password");

const confirmPasswordInput = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");

const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

const resetBtn = document.getElementById("resetBtn");

const btnText = document.getElementById("btnText");

const loader = document.getElementById("loader");

const message = document.getElementById("message");


/*==============================
      SHOW MESSAGE
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
      SHOW/HIDE PASSWORD
===============================*/

togglePassword.addEventListener("click", ()=>{

    const icon = togglePassword.querySelector("i");

    if(passwordInput.type === "password"){

        passwordInput.type = "text";

        icon.classList.replace("fa-eye","fa-eye-slash");

    }

    else{

        passwordInput.type = "password";

        icon.classList.replace("fa-eye-slash","fa-eye");

    }

});


toggleConfirmPassword.addEventListener("click", ()=>{

    const icon = toggleConfirmPassword.querySelector("i");

    if(confirmPasswordInput.type === "password"){

        confirmPasswordInput.type = "text";

        icon.classList.replace("fa-eye","fa-eye-slash");

    }

    else{

        confirmPasswordInput.type = "password";

        icon.classList.replace("fa-eye-slash","fa-eye");

    }

});


/*==============================
      RESET PASSWORD
===============================*/

resetPasswordForm.addEventListener("submit", async(event)=>{

    event.preventDefault();

    message.style.display = "none";

    const password = passwordInput.value.trim();

    const confirmPassword = confirmPasswordInput.value.trim();

    if(password === "" || confirmPassword === ""){

        showMessage("Please fill in all fields.","error");

        return;

    }

    if(password.length < 6){

        showMessage("Password must be at least 6 characters.","error");

        return;

    }

    if(password !== confirmPassword){

        showMessage("Passwords do not match.","error");

        return;

    }

    btnText.style.display = "none";

    loader.style.display = "inline-block";

    resetBtn.disabled = true;

    try{

        // Read token from URL
        const urlParams = new URLSearchParams(window.location.search);

        const token = urlParams.get("token");

        const response = await fetch("http://localhost:5000/reset-password",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                token,

                password

            })

        });

        const data = await response.json();

        if(!response.ok){

            throw new Error(data.message || "Password reset failed.");

        }

        showMessage(data.message || "Password reset successfully.","success");

        resetPasswordForm.reset();

        setTimeout(()=>{

            window.location.href="../login/login.html";

        },2000);

    }

    catch(error){

        showMessage(error.message,"error");

    }

    finally{

        btnText.style.display = "inline";

        loader.style.display = "none";

        resetBtn.disabled = false;

    }

});