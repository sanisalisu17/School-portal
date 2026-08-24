"use strict";

/*=====================================================
    SCHOOL MANAGEMENT PORTAL
    INDEX.JS - PART 1
======================================================*/


/*=====================================================
    SELECT ELEMENTS
======================================================*/

const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");
const header = document.querySelector(".header");
const sidebarLinks = document.querySelectorAll(".sidebar a");

const hero = document.querySelector(".hero");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const scrollTopBtn = document.getElementById("scrollTop");


/*=====================================================
    MOBILE SIDEBAR
======================================================*/

if (menuBtn && sidebar) {

    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });

}


/*=====================================================
    CLOSE SIDEBAR AFTER CLICK
======================================================*/

sidebarLinks.forEach(link => {

    link.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });

});


/*=====================================================
    CLOSE SIDEBAR WHEN CLICKING OUTSIDE
======================================================*/

document.addEventListener("click", (e) => {

    if (
        sidebar &&
        sidebar.classList.contains("active") &&
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {

        sidebar.classList.remove("active");

    }

});


/*=====================================================
    HEADER SHADOW ON SCROLL
======================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.style.boxShadow = "0 8px 20px rgba(0,0,0,.15)";

    } else {

        header.style.boxShadow = "none";

    }

});


/*=====================================================
    REMOVE SIDEBAR ON DESKTOP
======================================================*/

window.addEventListener("resize", () => {

    if (window.innerWidth > 992 && sidebar) {

        sidebar.classList.remove("active");

    }

});


/*=====================================================
    SMOOTH SCROLL
======================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/*=====================================================
    HERO SLIDESHOW
======================================================*/

let currentSlide = 0;
let slideInterval;


function showSlide(index){

    slides.forEach(slide=>slide.classList.remove("active"));

    dots.forEach(dot=>dot.classList.remove("active"));

    slides[index].classList.add("active");

    dots[index].classList.add("active");

}


function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

}


function previousSlide(){

    currentSlide--;

    if(currentSlide < 0){

        currentSlide = slides.length - 1;

    }

    showSlide(currentSlide);

}


/* Buttons */

if(nextBtn){

    nextBtn.addEventListener("click", ()=>{

        nextSlide();

        restartSlide();

    });

}

if(prevBtn){

    prevBtn.addEventListener("click", ()=>{

        previousSlide();

        restartSlide();

    });

}


/* Dots */

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentSlide=index;

        showSlide(currentSlide);

        restartSlide();

    });

});


/* Keyboard */

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        nextSlide();

        restartSlide();

    }

    if(e.key==="ArrowLeft"){

        previousSlide();

        restartSlide();

    }

});


/* Auto Slide */

function startSlide(){

    slideInterval = setInterval(nextSlide,5000);

}

function stopSlide(){

    clearInterval(slideInterval);

}

function restartSlide(){

    stopSlide();

    startSlide();

}

if(hero){

    hero.addEventListener("mouseenter",stopSlide);

    hero.addEventListener("mouseleave",startSlide);

}

showSlide(currentSlide);

startSlide();


/*=====================================================
    SCROLL TO TOP
======================================================*/

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        scrollTopBtn.classList.add("show");

    }else{

        scrollTopBtn.classList.remove("show");

    }

});


if(scrollTopBtn){

    scrollTopBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}


/*=====================================================
    END OF PART 1
======================================================*/

/*=====================================================
    SCHOOL MANAGEMENT PORTAL
    INDEX.JS - PART 2
======================================================*/


/*=====================================================
    ACTIVE NAVIGATION LINK
======================================================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a, .sidebar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop &&
            window.pageYOffset < sectionTop + sectionHeight) {

            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === "#" + current) {
            link.classList.add("active");
        }

    });

});


/*=====================================================
    STATISTICS COUNTER
======================================================*/

const counters = document.querySelectorAll(".stat-card h1");

let counterStarted = false;

function animateCounters() {

    if (counterStarted) return;

    const statistics = document.querySelector("#statistics");

    if (!statistics) return;

    const position = statistics.getBoundingClientRect().top;

    if (position < window.innerHeight - 100) {

        counterStarted = true;

        counters.forEach(counter => {

            const target = parseInt(counter.innerText.replace(/\D/g, ""));

            let count = 0;

            const speed = target / 100;

            const update = () => {

                count += speed;

                if (count < target) {

                    counter.innerText = Math.floor(count).toLocaleString() + "+";

                    requestAnimationFrame(update);

                } else {

                    counter.innerText = target.toLocaleString() + "+";

                }

            };

            update();

        });

    }

}

window.addEventListener("scroll", animateCounters);


/*=====================================================
    SCROLL REVEAL ANIMATION
======================================================*/

const revealElements = document.querySelectorAll(

".about, .mission-vision, .why-us, .statistics, .programmes, .facilities, .news, .gallery, .testimonials, .contact"

);

function revealOnScroll() {

    revealElements.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            element.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/*=====================================================
    CONTACT FORM VALIDATION
======================================================*/

const contactForm = document.querySelector(".contact-form form");

if (contactForm) {

    contactForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const name = this.querySelector('input[type="text"]');
        const email = this.querySelector('input[type="email"]');
        const subject = this.querySelectorAll('input[type="text"]')[1];
        const message = this.querySelector("textarea");

        if (

            name.value.trim() === "" ||

            email.value.trim() === "" ||

            subject.value.trim() === "" ||

            message.value.trim() === ""

        ) {

            alert("Please fill in all fields.");

            return;

        }

        alert("Message sent successfully!");

        this.reset();

    });

}


/*=====================================================
    GALLERY IMAGE CLICK
======================================================*/

const galleryImages = document.querySelectorAll(".gallery img");

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        window.open(image.src, "_blank");

    });

});


/*=====================================================
    IMAGE HOVER EFFECT
======================================================*/

document.querySelectorAll("img").forEach(img => {

    img.setAttribute("loading", "lazy");

});


/*=====================================================
    BUTTON RIPPLE EFFECT
======================================================*/

const buttons = document.querySelectorAll(

".btn-primary, .btn-secondary, button"

);

buttons.forEach(button => {

    button.addEventListener("click", function(e) {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        ripple.style.left =

            e.offsetX + "px";

        ripple.style.top =

            e.offsetY + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


/*=====================================================
    PAGE LOADER
======================================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/*=====================================================
    CONSOLE MESSAGE
======================================================*/

console.log(
    "SK-TECH School Management Portal Loaded Successfully."
);

/*=====================================================
    END OF PART 2
======================================================*/