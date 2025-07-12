document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  const applyParticles = (mode) => {
    particlesJS('particles-js', {
      particles: {
        number: { value: 130 },
        color: { value: mode === 'dark' ? '#cbe7ff' : '#0a192f' },
        line_linked: {
          enable: true,
          color: mode === 'dark' ? '#cbe7ff' : '#0a192f',
          opacity: 0.4
        },
        move: { enable: true, speed: 3 },
        size: { value: 4 }
      },
      interactivity: {
        events: { onhover: { enable: true, mode: 'repulse' } },
        modes: { repulse: { distance: 100 } }
      }
    });
  };

  // Init
  applyParticles(document.body.classList.contains('dark-mode') ? 'dark' : 'light');

  // Toggle Mode
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    themeIcon.classList.toggle('bi-brightness-high');
    themeIcon.classList.toggle('bi-moon-stars');
    applyParticles(isDark ? 'dark' : 'light');
  });

  // WhatsApp Contact
 document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const nama = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const pesan = document.getElementById('message').value;
  const waUrl = `https://wa.me/6281368811583?text=Halo! Saya\n Nama : ${nama} \n Email : ${email} \n Pesan : ${pesan} \n Terimakasih`;
  
  window.location.href = waUrl;
 });
});

// Info Section
let globalIp = "Unknown";
function getInfo() {
  const info = document.getElementById("info-content");
  const ip = "Fetching...";
  fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => {
      globalIp = data.ip;
    });
}
getInfo();


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Firebase Config
  const firebaseConfig = {
    apiKey: "AIzaSyD1kljAYjkPg4FbAS0fy474svzl4qG-zTo",
    authDomain: "komentar-bbebc.firebaseapp.com",
    projectId: "komentar-bbebc",
    storageBucket: "komentar-bbebc.firebasestorage.app",
    messagingSenderId: "962468347943",
    appId: "1:962468347943:web:526139c0634a1610854e02"
  };


// Inisialisasi Firebase & Database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Element chat
const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const nameInput = document.getElementById("chat-name");
const msgInput = document.getElementById("chat-message");

// Kirim ke Firebase
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const msg = msgInput.value.trim();
  if (name && msg && globalIp !== "Unknown") {
    push(ref(db, "chats"), {
      name: name,
      ip: globalIp,
      msg: msg,
      timestamp: Date.now()
    });
    nameInput.value = "";
    msgInput.value = "";
  }
});

// Tampilkan dari Firebase
onChildAdded(ref(db, "chats"), (snapshot) => {
  const data = snapshot.val();
  const date = new Date(data.timestamp);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('id-ID', options);

  const div = document.createElement("div");
  div.innerHTML = `
    <div id="chati"><strong>${data.name}</strong> <strong>:</strong> ${data.msg}</div>
    <div style="font-size: 0.55em; color: #888; text-align: right;">${formattedDate}</div>
  `;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Typed
new Typed("#typed-text", {
  strings: [`Titik terbesar Mencintai <br>Seseorang adalah <em><b>Mengikhlaskan</b></em> nya <br><b> - Ilham Kun - </b>`],
  typeSpeed: 100,
  backSpeed: 30,
  loop: true
});