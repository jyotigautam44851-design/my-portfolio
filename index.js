// ===================================
// 1. MOBILE MENU
// ===================================

const menu = document.querySelector(".menu");
const navLinks = document.querySelector(".nav-links");

menu.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

// Menu link click karne par menu close hoga
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});


// ===================================
// 2. TYPING ANIMATION
// ===================================

// HTML mein .typing-text class wala element hona chahiye.

const typingElement = document.querySelector(".typing-text");

if (typingElement) {
    const words = [
        "BCA Student",
        "Web Developer",
        "Software Developer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingElement.textContent =
            currentWord.substring(0, charIndex);

        let speed = deleting ? 60 : 100;

        if (!deleting && charIndex === currentWord.length) {
            deleting = true;
            speed = 1200;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 300;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
}


// ===================================
// 3. DARK / LIGHT MODE
// ===================================

const themeButton = document.querySelector("#theme-toggle");

if (themeButton) {
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        const isLight =
            document.body.classList.contains("light-mode");

        themeButton.textContent = isLight
            ? "🌙 Dark Mode"
            : "☀️ Light Mode";
    });
}


// ===================================
// 4. CONTACT FORM + EMAILJS
// ===================================

// EmailJS ki configuration neeche add karni hai.

const form = document.querySelector(".contact-form");

if (form) {
    form.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = form.querySelector(
            'input[name="from_name"]'
        );

        const email = form.querySelector(
            'input[name="reply_to"]'
        );

        const message = form.querySelector(
            'textarea[name="message"]'
        );

        if (!name || !email || !message) {
            alert("Please check your contact form HTML.");
            return;
        }

        if (
            !name.value.trim() ||
            !email.value.trim() ||
            !message.value.trim()
        ) {
            alert("Please fill in all fields.");
            return;
        }

        if (!email.checkValidity()) {
            alert("Please enter a valid email address.");
            return;
        }

        const button = form.querySelector("button");
        const originalText = button.textContent;

        button.disabled = true;
        button.textContent = "Sending...";

        try {

            await emailjs.sendForm(
                "YOUR_SERVICE_ID",
                "YOUR_TEMPLATE_ID",
                form
            );

            alert("Message sent successfully! ❤️");

            form.reset();

        } catch (error) {

            console.error("Email error:", error);

            alert(
                "Message could not be sent. Please try again."
            );

        } finally {

            button.disabled = false;
            button.textContent = originalText;

        }

    });
}