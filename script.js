const navbar = document.querySelector('.navbar');
const progressBar = document.querySelector('.scroll-progress span');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

function updateScrollState() {
    const scrollTop = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;

    navbar?.classList.toggle('scrolled', scrollTop > 12);
    if (progressBar) {
        progressBar.style.width = `${scrollable > 0 ? (scrollTop / scrollable) * 100 : 0}%`;
    }

    let activeId = '';
    for (const section of sections) {
        if (scrollTop >= section.offsetTop - 160) activeId = section.id;
    }

    for (const link of navLinks) {
        link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    }
}

let scrollFrame;
window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
        updateScrollState();
        scrollFrame = null;
    });
}, { passive: true });

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    }, { threshold: 0.08, rootMargin: '0px 0px -36px' });

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}

updateScrollState();
