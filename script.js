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

// Simple scroll handling for navigation
let ticking = false;

function updateOnScroll() {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when scrolling down
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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
    
    ticking = false;
}

// Throttled scroll event listener
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Mobile menu functionality (if needed)
document.addEventListener('DOMContentLoaded', function() {
    // Simple fade-in animation for content
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
