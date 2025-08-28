// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
});

// Typing Animation for Hero Text
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.getElementById('typingText');
    const cursor = document.getElementById('cursor');
    const text = "i'm krish narula!";
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 100); // Adjust speed here (lower = faster)
        } else {
            // Hide cursor after typing is complete
            setTimeout(() => {
                cursor.style.opacity = '0';
            }, 1000);
        }
    }
    
    // Start typing animation after a brief delay
    setTimeout(typeText, 500);
});

// Email Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const emailBtn = document.getElementById('emailBtn');
    const emailPopup = document.getElementById('emailPopup');
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailText = document.querySelector('.email-text');
    
    if (emailBtn && emailPopup) {
        emailBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            emailPopup.classList.toggle('hidden');
        });
        
        // Close popup when clicking outside
        document.addEventListener('click', function(e) {
            if (!emailPopup.contains(e.target) && !emailBtn.contains(e.target)) {
                emailPopup.classList.add('hidden');
            }
        });
    }
    
    if (copyEmailBtn && emailText) {
        copyEmailBtn.addEventListener('click', function() {
            // Copy email to clipboard
            navigator.clipboard.writeText(emailText.textContent).then(function() {
                // Show success feedback
                copyEmailBtn.textContent = 'copied!';
                copyEmailBtn.classList.add('copied');
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    copyEmailBtn.textContent = 'copy';
                    copyEmailBtn.classList.remove('copied');
                }, 2000);
            }).catch(function() {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = emailText.textContent;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                copyEmailBtn.textContent = 'copied!';
                copyEmailBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyEmailBtn.textContent = 'copy';
                    copyEmailBtn.classList.remove('copied');
                }, 2000);
            });
        });
    }
});

// Contact Email Display Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactEmailBtn = document.getElementById('contactEmailBtn');
    const contactEmailDisplay = document.getElementById('contactEmailDisplay');
    const contactCopyEmailBtn = document.getElementById('contactCopyEmailBtn');
    const contactCloseEmailBtn = document.getElementById('contactCloseEmailBtn');
    const contactEmailText = contactEmailDisplay?.querySelector('.email-text');

    if (contactEmailBtn && contactEmailDisplay) {
        contactEmailBtn.addEventListener('click', function() {
            contactEmailBtn.style.display = 'none';
            contactEmailDisplay.classList.remove('hidden');
        });
    }
    
    if (contactCloseEmailBtn) {
        contactCloseEmailBtn.addEventListener('click', function() {
            contactEmailDisplay.classList.add('hidden');
            contactEmailBtn.style.display = 'inline-block';
        });
    }
    
    if (contactCopyEmailBtn && contactEmailText) {
        contactCopyEmailBtn.addEventListener('click', function() {
            // Copy email to clipboard
            navigator.clipboard.writeText(contactEmailText.textContent).then(function() {
                // Show success feedback
                contactCopyEmailBtn.textContent = 'copied!';
                contactCopyEmailBtn.classList.add('copied');
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    contactCopyEmailBtn.textContent = 'copy';
                    contactCopyEmailBtn.classList.remove('copied');
                }, 2000);
            }).catch(function() {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = contactEmailText.textContent;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                contactCopyEmailBtn.textContent = 'copied!';
                contactCopyEmailBtn.classList.add('copied');
                
                setTimeout(() => {
                    contactCopyEmailBtn.textContent = 'copy';
                    contactCopyEmailBtn.classList.remove('copied');
                }, 2000);
            });
        });
    }
});

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

// Scroll handling for navigation
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

// Intersection Observer for Experience Cards Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered animation delay
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Observe experience cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Also observe other sections
    const otherElements = document.querySelectorAll('.thought-post, .contact-description');
    otherElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
