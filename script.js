document.querySelectorAll('.nav-links a, .footer-middle a, .hero-buttons a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;

            if (targetSection) {
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 700; // Durasi 700ms persis seperti Figma
                let startTimestamp = null;

                // Formula Matematika Ease-In-Out Quad (Persis seperti Figma)
                function easeInOutQuad(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return (c / 2) * t * t + b;
                    t--;
                    return (-c / 2) * (t * (t - 2) - 1) + b;
                }

                // Fungsi Animasi Per Frame
                function animateScroll(currentTime) {
                    if (startTimestamp === null) startTimestamp = currentTime;
                    const timeElapsed = currentTime - startTimestamp;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    
                    window.scrollTo(0, run);

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animateScroll);
                    } else {
                        window.scrollTo(0, targetPosition); // Memastikan posisi pas di akhir
                    }
                }

                requestAnimationFrame(animateScroll);
            }
        }
    });
});