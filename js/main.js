// =========================
// 1. Mobile Menu Toggle
// =========================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// =========================
// 2. Smooth Scroll for Nav Links
// =========================
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function(e) {
        if (this.getAttribute("href").startsWith("#")) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: "smooth"
                });
            }
        }
    });
});

// =========================
// 3. Fade-in Animation
// =========================
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.3, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => { appearOnScroll.observe(fader); });

// =========================
// 4. Highlight Active Section
// =========================
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 70;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    if (current) {
        navItems.forEach(li => {
            li.classList.remove("active");
            if (li.getAttribute("href") === `#${current}`) {
                li.classList.add("active");
            }
        });
    }
});

// =========================
// 5. TYPING ANIMATION (Fixed)
// =========================
const typingElement = document.querySelector(".typing-text");

if (typingElement) {
    // The specific titles you requested
    const words = ["UG Student 🎓", "Developer 💻", "IoT Engineer 🚀", "Fresher 🌟"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Typing speed controls
        let typeSpeed = isDeleting ? 60 : 150; 

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type(); // Start animation
}

// =========================
// 6. PROJECT FILTER LOGIC
// =========================
window.filterProjects = function(category) {
    const cards = document.querySelectorAll(".project-card");
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => {
        if (btn.innerText.toLowerCase().includes(category) || 
           (category === 'all' && btn.innerText === 'All')) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    cards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
            card.style.display = "block";
            card.style.animation = "none";
            card.offsetHeight; 
            card.style.animation = "fadeIn 0.5s ease forwards";
        } else {
            card.style.display = "none";
        }
    });
};

// =========================
// 7. TEXT TO SPEECH (TTS)
// =========================
const ttsBtn = document.createElement("button");
ttsBtn.classList.add("tts-btn");
ttsBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
ttsBtn.title = "Read Page";
document.body.appendChild(ttsBtn); 

let isSpeaking = false;
const synth = window.speechSynthesis;
let utterance;

ttsBtn.addEventListener("click", () => {
    if (isSpeaking) {
        synth.cancel();
        isSpeaking = false;
        ttsBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        ttsBtn.classList.remove("speaking");
    } else {
        const contentToRead = document.querySelector(".section-container") 
            ? document.querySelector(".section-container").innerText 
            : document.querySelector(".hero-text").innerText; 

        utterance = new SpeechSynthesisUtterance(contentToRead);
        utterance.rate = 1; 
        
        utterance.onend = () => {
            isSpeaking = false;
            ttsBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            ttsBtn.classList.remove("speaking");
        };

        synth.speak(utterance);
        isSpeaking = true;
        ttsBtn.innerHTML = '<i class="fas fa-stop"></i>';
        ttsBtn.classList.add("speaking");
    }
});

window.onbeforeunload = () => {
    synth.cancel();
};