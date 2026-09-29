// Simple responsive slider component
(() => {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(initSlider);

    function initSlider(slider) {
        const slidesContainer = slider.querySelector('.slides');
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        const total = slides.length;
        let index = 0;
        let autoPlay = null;

        if (total === 0) return;

        // Create dots navigation if not present
        let dotsContainer = slider.querySelector('.dots');
        if (!dotsContainer) {
            dotsContainer = document.createElement('div');
            dotsContainer.className = 'dots';
            slider.appendChild(dotsContainer);
        }
        const dots = [];
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.dataset.idx = i;
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }

        function updateDots() {
            dots.forEach((d, i) => d.classList.toggle('active', i === index));
        }

        function goTo(i) {
            index = (i + total) % total;
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
            updateDots();
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));

        // Keyboard navigation
        slider.setAttribute('tabindex', '0');
        slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft')  goTo(index - 1);
            if (e.key === 'ArrowRight') goTo(index + 1);
        });

        updateDots();

        function startAutoPlay() {
            stopAutoPlay();
            autoPlay = setInterval(() => goTo(index + 1), 5000);
        }
        function stopAutoPlay() {
            if (autoPlay) clearInterval(autoPlay);
            autoPlay = null;
        }

        startAutoPlay();
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);

        // Pause when tab is hidden (saves resources)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopAutoPlay();
            else startAutoPlay();
        });
    }
})();