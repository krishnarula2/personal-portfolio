// Loading Screen Animation - Extended duration for better experience
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const progressBar = document.querySelector('.progress-bar');
    const percentageDisplay = document.getElementById('loadingPercentage');
    
    // Ensure main content starts hidden
    mainContent.style.display = 'block';
    mainContent.style.opacity = '0';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 8; // Slower progress increments (was 20)
        if (progress > 100) progress = 100;
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        if (percentageDisplay) {
            percentageDisplay.textContent = Math.floor(progress) + '%';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                // Start fading out loading screen
                loadingScreen.style.opacity = '0';
                
                setTimeout(() => {
                    // Hide loading screen and show main content
                    loadingScreen.style.display = 'none';
                    mainContent.classList.add('loaded');
                    mainContent.style.opacity = '1';
                    document.body.style.overflow = 'auto';
                    
                    // Start the name typing animation first
                    startNameTyping();
                }, 500); // Longer transition
            }, 800); // Longer pause at 100%
        }
    }, 150); // Slower interval (was 60ms)
});

// Name Typing Animation (runs once on first load)
function startNameTyping() {
    const nameElement = document.getElementById('typing-name');
    const name = 'Krish Narula';
    let currentCharIndex = 0;
    
    function typeName() {
        if (currentCharIndex < name.length) {
            nameElement.textContent = name.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            setTimeout(typeName, 50); // Faster typing speed (was 80ms)
        } else {
            // After name is fully typed, start the subtitle typing animation
            setTimeout(startDynamicTyping, 300); // Reduced delay (was 500ms)
        }
    }
    
    // Start typing the name after a shorter delay
    setTimeout(typeName, 400); // Reduced delay (was 800ms)
}

// Dynamic Typing Animation for Hero Subtitle
function startDynamicTyping() {
    const dynamicTextElement = document.getElementById('dynamic-text');
    const texts = [
        'Tech Innovator & AI Enthusiast',
        'Computer Science Student',
        'Full Stack Developer',
        'AI & Machine Learning Enthusiast',
        'Problem Solver & Builder'
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typeSpeed = 60;
    
    function type() {
        const currentText = texts[currentTextIndex];
        
        if (isDeleting) {
            dynamicTextElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typeSpeed = 30;
        } else {
            dynamicTextElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typeSpeed = 60;
        }
        
        if (!isDeleting && currentCharIndex === currentText.length) {
            typeSpeed = 1500; // Pause at end - reduced from 2000
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            typeSpeed = 300; // Pause before typing new text - reduced from 500
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 200); // Start shortly after name is typed
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optimized scroll handling with throttling
let ticking = false;
let lastScrollTop = 0;

function updateOnScroll() {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when scrolling down
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Add scrolling class to body for darker background
    if (currentScroll > 10) {
        document.body.classList.add('scrolling');
    } else {
        document.body.classList.remove('scrolling');
    }
    
    // Optimized parallax effect
    const parallax = document.querySelector('.hero-background');
    if (parallax) {
        const speed = currentScroll * 0.15; // Reduced parallax intensity
        parallax.style.transform = `translate3d(0, ${speed}px, 0)`;
    }
    
    // Active Navigation Link
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (currentScroll >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    // Remove active class from all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const homeLink = document.querySelector('.nav-home-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    if (homeLink) {
        homeLink.classList.remove('active');
    }
    
    // Add active class to current section link
    if (current === '' || current === 'home') {
        if (homeLink) homeLink.classList.add('active');
    } else {
        const currentLink = document.querySelector(`.nav-link[href="#${current}"]`);
        if (currentLink) currentLink.classList.add('active');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    ticking = false;
}

// Throttled scroll event listener
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .blog-card, .about-text, .about-stats, .experience-item, .education-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
}); 