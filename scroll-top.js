(function () {
    const btnUp = document.getElementById('scrollTop');
    const btnDown = document.getElementById('scrollBottom');
    if (!btnUp && !btnDown) return;

    function toggleButtons() {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const nearBottom = scrolled > maxScroll - 200;

        if (btnUp) {
            if (scrolled > 300) btnUp.classList.add('visible');
            else btnUp.classList.remove('visible');
        }
        if (btnDown) {
            // Кнопка вниз видна, когда ещё есть куда скроллить
            if (scrolled < maxScroll - 300) btnDown.classList.add('visible');
            else btnDown.classList.remove('visible');
        }
    }

    if (btnUp) {
        btnUp.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    if (btnDown) {
        btnDown.addEventListener('click', () => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });
    }

    window.addEventListener('scroll', toggleButtons, { passive: true });
    window.addEventListener('resize', toggleButtons, { passive: true });
    toggleButtons();
})();