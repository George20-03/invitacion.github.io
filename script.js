// ======================================
// ALTURA REAL DE PANTALLA EN MÓVIL
// (evita saltos de layout por la barra del navegador)
// ======================================

function fijarAltoReal() {

    const vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);

}

fijarAltoReal();

window.addEventListener("resize", fijarAltoReal);
window.addEventListener("orientationchange", fijarAltoReal);


// ======================================
// CUENTA ATRÁS HASTA LA BODA
// ======================================

const weddingDate = new Date(2026, 8, 4, 12, 0, 0); // 4 de septiembre de 2026, 12:00 PM

let intervaloCuentaAtras;

function actualizarCuentaAtras() {

    const countdownEl = document.getElementById("countdown");

    if (!countdownEl) return;

    const ahora = new Date();
    const diferencia = weddingDate - ahora;

    if (diferencia <= 0) {

        countdownEl.classList.add("hide");

        clearInterval(intervaloCuentaAtras);

        return;

    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    document.getElementById("cd-days").textContent = String(dias).padStart(2, "0");
    document.getElementById("cd-hours").textContent = String(horas).padStart(2, "0");
    document.getElementById("cd-minutes").textContent = String(minutos).padStart(2, "0");
    document.getElementById("cd-seconds").textContent = String(segundos).padStart(2, "0");

}

actualizarCuentaAtras();

intervaloCuentaAtras = setInterval(actualizarCuentaAtras, 1000);


// ======================================
// SALUDO PERSONALIZADO (?nombre=... en la URL)
// ======================================

function mostrarSaludoInvitado() {

    const params = new URLSearchParams(window.location.search);

    // Acepta ?nombre= o ?invitado= por si se comparte con cualquiera de los dos
    let nombre = params.get("nombre") || params.get("invitado");

    const greeting = document.getElementById("guestGreeting");

    if (!greeting) return;

    if (!nombre) {

        // Sin nombre en la URL: no mostramos el bloque
        greeting.remove();

        return;

    }

    // Limpieza básica: quita espacios extra y capitaliza cada palabra
    nombre = nombre
        .trim()
        .split(/\s+/)
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
        .join(" ");

    greeting.textContent = "Con cariño para ";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = nombre;
    greeting.appendChild(nameSpan);

    requestAnimationFrame(() => {

        greeting.classList.add("show");

    });

}

mostrarSaludoInvitado();


// ======================================
// ELEMENTOS DEL DOM
// ======================================

const scene = document.getElementById("scene");

const envelope = document.getElementById("envelope");

const particles = document.getElementById("particles");

const music = document.getElementById("music");

const buttons = document.getElementById("buttons");


let opened = false;

function createParticle() {

    const p = document.createElement("div");

    p.classList.add("particle");

    p.style.left = Math.random() * window.innerWidth + "px";

    const size = Math.random() * 6 + 3;

    p.style.width = size + "px";
    p.style.height = size + "px";

    p.style.animationDuration = (6 + Math.random() * 5) + "s";

    p.style.opacity = Math.random();

    particles.appendChild(p);

    setTimeout(() => {

        p.remove();

    }, 12000);

}

const esMovil = window.innerWidth < 700 || /Mobi|Android/i.test(navigator.userAgent);

setInterval(createParticle, esMovil ? 320 : 180);


// ======================================
// ABRIR SOBRE
// ======================================

scene.addEventListener("click", () => {

    if (opened) return;

    opened = true;

    scene.classList.add("opened");

    envelope.classList.add("open");

    // Ocultar "Toca para abrir" de forma inmediata y definitiva
    const tapHint = document.getElementById("tapHint");
    if (tapHint) {
        tapHint.style.display = "none";
    }

    // Destello de luz al momento del clic
    const flash = document.createElement("div");
    flash.classList.add("flash");
    document.body.appendChild(flash);

    setTimeout(() => {

        flash.remove();

    }, 1100);

    

    // Música
    if (music) {

        music.volume = 0.4;

        music.play().catch(() => {
            console.log("El navegador bloqueó el autoplay.");
        });

    }

    // Zoom de la escena
    setTimeout(() => {

        scene.style.transition = "2s";

        scene.style.transform = "scale(1.25)";

    }, 2700);

    // Mostrar botones
    setTimeout(() => {

        document.body.classList.add("showButtons");

    }, 6500);

});


// ======================================
// DESTELLOS DORADOS
// ======================================

function sparkle() {

    const star = document.createElement("div");

    star.style.position = "fixed";

    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * window.innerHeight + "px";

    star.style.width = "4px";
    star.style.height = "4px";

    star.style.background = "#FFD700";

    star.style.borderRadius = "50%";

    star.style.boxShadow = "0 0 15px gold";

    star.style.pointerEvents = "none";

    star.style.opacity = "1";

    star.style.transition = "all 1.5s";

    document.body.appendChild(star);

    setTimeout(() => {

        star.style.transform = "scale(4)";
        star.style.opacity = "0";

    }, 50);

    setTimeout(() => {  

        star.remove();

    }, 1700);

}

setInterval(sparkle, esMovil ? 550 : 350);


// ======================================
// EFECTO PARALLAX
// ======================================

document.addEventListener("mousemove", e => {

    if (!opened) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    scene.style.transform =
        `scale(1.25) rotateY(${x}deg) rotateX(${-y}deg)`;

});


// ======================================
// EFECTO MÓVIL
// ======================================

window.addEventListener("deviceorientation", e => {

    if (!opened) return;

    const x = e.gamma / 4;
    const y = e.beta / 8;

    scene.style.transform =
        `scale(1.25) rotateY(${x}deg) rotateX(${y}deg)`;

});


// ======================================
// BOTÓN WHATSAPP
// ======================================

document.getElementById("whatsapp").href = "https://wa.me/34600000000?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20boda.";


// ======================================
// BOTÓN MAPS
// ======================================

document.getElementById("maps").href =
"https://www.google.com/maps/place/Registro+Civil+Chone/@-0.7050911,-80.1060928,17z/data=!3m1!4b1!4m6!3m5!1s0x902ba82b57262e0f:0xc4069cc0e7353831!8m2!3d-0.7050911!4d-80.1035125!16s%2Fg%2F11bwys_87b";

document.getElementById("maps").target = "_blank";


// ======================================
// BOTÓN LIBRO DE INVITADOS (Google Form)
// ======================================

document.getElementById("gift").href =
"https://docs.google.com/forms/d/e/1FAIpQLSfyR20KOM3kKkrj-d_2b5SZNranWAd-hgkb8cvScZjXNizabw/viewform?usp=dialog";


// ======================================
// EFECTO RESPIRACIÓN DEL SOBRE
// ======================================

setInterval(() => {

    if (opened) return;

    envelope.animate([

        {
            transform: "translateY(0px)"
        },

        {
            transform: "translateY(-6px)"
        },

        {
            transform: "translateY(0px)"
        }

    ], {

        duration: 2500

    });

}, 2500);


// ======================================
// MENSAJE EN CONSOLA
// ======================================

console.log("Invitación JC & Lady cargada correctamente ❤️");
