"use strict";

/*=====================================================
    SCHOOL MANAGEMENT PORTAL
    FORGOT-PASSWORD.JS
======================================================*/


/*==============================
        SELECT ELEMENTS
===============================*/

const forgotPasswordForm = document.getElementById("forgotPasswordForm");

const emailInput = document.getElementById("email");

const sendBtn = document.getElementById("sendBtn");

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
    FORGOT PASSWORD
===============================*/

forgotPasswordForm.addEventListener("submit", async(event)=>{

    event.preventDefault();

    message.style.display = "none";

    const email = emailInput.value.trim();

    if(email === ""){

        showMessage("Please enter your email address.","error");

        return;

    }

    btnText.style.display = "none";

    loader.style.display = "inline-block";

    sendBtn.disabled = true;

    try{

        const response = await fetch("http://localhost:5000/forgot-password",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                email

            })

        });

        const data = await response.json();

        if(!response.ok){

            throw new Error(data.message || "Unable to send reset link.");

        }

        showMessage(data.message || "Password reset link sent successfully.","success");

        forgotPasswordForm.reset();

    }

    catch(error){

        showMessage(error.message,"error");

    }

    finally{

        btnText.style.display = "inline";

        loader.style.display = "none";

        sendBtn.disabled = false;

    }

});