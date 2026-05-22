// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic'
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
            hamburger.classList.remove('active');
        }
    });
});

// Typewriter effect
const typewriterText = document.getElementById('typewriter-text');
if (typewriterText) {
    const phrases = [
        'Computer Vision and Robotics Enthusiast',
        'Trust me, I am an Engineer : )',
        'Deep Learning',
        'Embedded Systems'
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

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
});

// Last updated date - set from local system date on load
document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('last-updated');
    if (el) {
        el.textContent = '20/10/2025';
    }
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const storedTheme = localStorage.getItem('portfolio-theme');

if (storedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

function syncThemeIcon() {
    const icon = themeToggle?.querySelector('i');
    if (!icon) {
        return;
    }

    const isDark = document.body.classList.contains('dark-theme');
    icon.classList.toggle('fa-moon', !isDark);
    icon.classList.toggle('fa-sun', isDark);
}

syncThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('portfolio-theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        syncThemeIcon();
    });
}

// Cursor glow and magnetic card tilt
const cursorGlow = document.querySelector('.cursor-glow');
let glowX = window.innerWidth / 2;
let glowY = window.innerHeight / 2;
let targetX = glowX;
let targetY = glowY;

if (cursorGlow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('pointermove', (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
        cursorGlow.style.opacity = '1';
    });

    window.addEventListener('pointerleave', () => {
        cursorGlow.style.opacity = '0';
    });

    function animateGlow() {
        glowX += (targetX - glowX) * 0.16;
        glowY += (targetY - glowY) * 0.16;
        cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

document.querySelectorAll('.blog-card, .blog-article, .timeline-content, .cert-item').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
        if (window.innerWidth < 769 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 7;
        const rotateX = ((y / rect.height) - 0.5) * -7;

        card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('pointerleave', () => {
        card.style.transform = '';
    });
});
