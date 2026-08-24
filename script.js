const navbar = document.querySelector('.navbar');
const progressBar = document.querySelector('.scroll-progress span');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const year = document.querySelector('#year');
const themeToggle = document.querySelector('#themeToggle');
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
    themeToggle?.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
    themeColor?.setAttribute('content', theme === 'dark' ? '#0d0f0e' : '#f2f1ed');
}

themeToggle?.addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

applyTheme(document.documentElement.dataset.theme || 'light');

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

document.querySelectorAll('.experience-list, .project-grid').forEach((group) => {
    [...group.children].forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 55}ms`);
    });
});

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
