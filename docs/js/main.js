// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && !e.target.closest('.nav-content')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            hamburger.classList.toggle('active');
        }
    });
});

// Typewriter effect
const typewriterText = document.getElementById('typewriter-text');
if (typewriterText) {
    const phrases = [
        'Research Fellow at IIT Bombay',
        'Computer Vision and Robotics',
        'Satellite 3D Reconstruction',
        'Trust me, I am an Engineer : )'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (!isDeleting && !isWaiting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex);
            charIndex++;
            
            if (charIndex > currentPhrase.length) {
                isWaiting = true;
                await sleep(2000);
                isWaiting = false;
                isDeleting = true;
            }
        } else if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                await sleep(500);
            }
        }
        
        const nextDelay = isDeleting ? 50 : isWaiting ? 2000 : 100;
        setTimeout(typeWriter, nextDelay);
    }

    // Start typewriter effect when the page is fully loaded
    window.onload = function() {
        typewriterText.textContent = '';
        typeWriter();
    };
}

// Navbar scroll behavior
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('scroll-down');
        navbar.classList.remove('scroll-up');
    } else {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Loading animation
// (removed) Loading animation - no .loading element in DOM

// (removed) Smooth scrolling for in-page anchors - no hash anchors used

// (removed) Dynamic certificate loader - not used by current pages

// (removed) Contact form handler - no #contact-form element present

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// (removed) JS hover effect for .social-link (CSS :hover already provides interaction)

// (removed) Initialize dynamic loaders

// Last updated date - set from local system date on load
document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('last-updated');
    if (el) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        el.textContent = now.toLocaleDateString(undefined, options);
    }
});
