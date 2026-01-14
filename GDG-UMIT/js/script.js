
document.addEventListener('DOMContentLoaded', () => {

    const counters = document.querySelectorAll('.count');
    const impactSection = document.querySelector('.impact-section');

    if (!counters.length || !impactSection) return;

    let hasAnimated = false;

    const animateCounters = () => {
        if (hasAnimated) return;
        hasAnimated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            let current = 0;

            const increment = Math.max(1, Math.ceil(target / 80));

            const updateCounter = () => {
                current += increment;

                if (current >= target) {
                    counter.textContent = target + '+';
                } else {
                    counter.textContent = current + '+';
                    requestAnimationFrame(updateCounter);
                }
            };

            updateCounter();
        });
    };

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect(); // stop observing after animation
            }
        },
        { threshold: 0.4 }
    );

    observer.observe(impactSection);
});

