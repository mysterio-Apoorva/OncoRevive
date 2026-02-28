// Initialize Lucide Icons
lucide.createIcons();

// Sticky Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for simple fade-in and slide-up animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');

            // Trigger specific charts animation
            if (entry.target.classList.contains('chart-container')) {
                animateVerticalBars();
            }
            if (entry.target.classList.contains('capital-chart-container')) {
                animateSVGPaths();
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Bar Chart Animation
function animateVerticalBars() {
    const bars = document.querySelectorAll('.bar');
    setTimeout(() => {
        if (bars.length >= 4) {
            bars[0].style.height = '60%';
            bars[1].style.height = '25%';
            bars[2].style.height = '10%';
            bars[3].style.height = '3%';
        }
    }, 200);
}

// SVG Line Curve Animation
function animateSVGPaths() {
    const paths = document.querySelectorAll('.line-curve path');
    paths.forEach(path => {
        const length = path.getTotalLength();
        path.style.transition = 'none';
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
        // Trigger reflow
        path.getBoundingClientRect();
        path.style.transition = 'stroke-dashoffset 2s ease-in-out';
        path.style.strokeDashoffset = '0';
    });
}

// Initialize structural animation states
document.addEventListener('DOMContentLoaded', () => {
    // Hide bars initially
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => bar.style.height = '0');
});
