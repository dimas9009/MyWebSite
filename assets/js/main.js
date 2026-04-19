// =============================================================
// main.js - bakun.net personal site
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
    initExperience();
    initSeasonalEffects();
    initCertsCarousel();
    initJobsCounter();
    initAvailabilityStatus();
    initScrollAnimations();
});

// -------------------------------------------------------------
// Experience counter
// Years elapsed since career start - updates automatically each year
// -------------------------------------------------------------

function yearsOfExperience() {
    return new Date().getFullYear() - 2012;
}

function initExperience() {
    const years = yearsOfExperience();

    document.getElementById('years-exp').textContent = `${years}+ years exp.`;

    // Keep meta description in sync (Googlebot executes JS)
    document.querySelector('meta[name="description"]').content =
        `Dmitrii Bakun — Senior C# / .NET Developer based in Rotterdam. ${years}+ years of experience, AWS certified.`;
}

// -------------------------------------------------------------
// Seasonal effects
// 🎄 December  → Santa hat + snow
// 🎂 September 8 → Party hat + confetti
// -------------------------------------------------------------

function initSeasonalEffects() {
    const now   = new Date();
    const month = now.getMonth(); // 0-indexed: 11 = December, 8 = September
    const day   = now.getDate();

    if (month === 11) {
        showHat('.santa-hat');
        startSnow();
    }

    if (month === 8 && day === 8) {
        showHat('.party-hat');
        startConfetti();
    }
}

function showHat(selector) {
    const wrapper = document.querySelector(selector);
    const img = wrapper.querySelector('img[data-src]');
    if (img) img.src = img.dataset.src;
    wrapper.style.display = 'block';
}

function startSnow() {
    const container = document.querySelector('.main-container');
    const flakes    = ['❄', '❅', '❆', '·', '*'];

    setInterval(() => {
        const el = document.createElement('span');
        el.className = 'snowflake';
        el.textContent = flakes[Math.floor(Math.random() * flakes.length)];
        el.style.left            = `${Math.random() * 100}%`;
        el.style.animationDuration = `${Math.random() * 3 + 2}s`;
        el.style.fontSize        = `${Math.random() * 10 + 8}px`;
        el.style.opacity         = Math.random() * 0.6 + 0.3;
        container.appendChild(el);
        setTimeout(() => el.remove(), 5000);
    }, 300);
}

function startConfetti() {
    const container = document.querySelector('.main-container');
    const colors    = ['#ff69b4', '#FFD700', '#00c853', '#00aaff', '#ff4444', '#aa44ff'];

    setInterval(() => {
        const el = document.createElement('span');
        el.className = 'confetti';
        el.style.left            = `${Math.random() * 100}%`;
        el.style.background      = colors[Math.floor(Math.random() * colors.length)];
        el.style.animationDuration = `${Math.random() * 3 + 2}s`;
        el.style.width           = `${Math.random() * 8 + 5}px`;
        el.style.height          = `${Math.random() * 5 + 4}px`;
        el.style.borderRadius    = Math.random() > 0.5 ? '50%' : '0';
        container.appendChild(el);
        setTimeout(() => el.remove(), 5000);
    }, 150);
}

// -------------------------------------------------------------
// Certifications carousel - drag to scroll
// Click navigates to Credly; drag scrolls without navigating
// -------------------------------------------------------------

function initCertsCarousel() {
    const row = document.querySelector('.certs-row');
    let isDown = false, startPageX, startScrollLeft, wasDrag = false;

    row.addEventListener('mousedown', e => {
        e.preventDefault();
        isDown = true;
        wasDrag = false;
        startPageX = e.pageX;
        startScrollLeft = row.scrollLeft;
        row.classList.add('dragging');
    });

    row.addEventListener('mouseleave', () => {
        isDown = false;
        row.classList.remove('dragging');
    });

    row.addEventListener('mouseup', () => {
        isDown = false;
        row.classList.remove('dragging');
    });

    row.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const dx = e.pageX - startPageX;
        if (Math.abs(dx) > 8) wasDrag = true;
        row.scrollLeft = startScrollLeft - dx;
    });

    // Intercept every click: open link only if no drag happened
    row.addEventListener('click', e => {
        e.preventDefault();
        if (!wasDrag) {
            const link = e.target.closest('a');
            if (link) window.open(link.href, '_blank');
        }
        wasDrag = false;
    });

    // Prevent browser's native image drag ghost
    row.querySelectorAll('img').forEach(img => {
        img.setAttribute('draggable', 'false');
        img.addEventListener('dragstart', e => e.preventDefault());
    });
}

// -------------------------------------------------------------
// Scroll animations — fade-in + slide-up on section enter
// -------------------------------------------------------------

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.about, .skills-section, .badges-section, .experience-section')
        .forEach(el => observer.observe(el));
}

// -------------------------------------------------------------
// Availability status — reads status.txt from root
// First line "true" → show badge; commented out (// or #) → hide
// -------------------------------------------------------------

async function initAvailabilityStatus() {
    try {
        const res  = await fetch('status.txt');
        const text = await res.text();
        const firstLine = text.split('\n')[0].trim();
        const isAvailable = firstLine === 'true';
        if (isAvailable) {
            document.querySelector('.status-badge').classList.add('visible');
        }
    } catch {
        // File missing or network error — badge stays hidden
    }
}

// -------------------------------------------------------------
// Experience section - show/hide extra jobs
// -------------------------------------------------------------

function initJobsCounter() {
    const count = document.querySelectorAll('.extra-job').length;
    document.querySelector('.history-btn-text').textContent = `${count} more positions`;
}

function toggleMoreCerts(btn) {
    const extras = document.querySelectorAll('.extra-cert');
    const opening = getComputedStyle(extras[0]).display === 'none';
    extras.forEach(el => el.style.display = opening ? 'block' : 'none');
    btn.textContent = opening ? '← Hide' : 'See More →';
}

function toggleMoreJobs(btn) {
    const extras = document.querySelectorAll('.extra-job');
    const hint   = document.querySelector('.linkedin-hint');
    const opening = getComputedStyle(extras[0]).display === 'none';

    extras.forEach(el => el.style.display = opening ? 'block' : 'none');
    hint.style.display = opening ? 'block' : 'none';

    btn.querySelector('.history-btn-text').textContent = opening
        ? 'collapse'
        : `${extras.length} more positions`;
    btn.querySelector('.history-btn-arrow').textContent = opening ? '↑' : '↓';
    btn.classList.toggle('open', opening);
}
