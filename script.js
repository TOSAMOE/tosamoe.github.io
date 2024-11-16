window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const blurOverlay = document.getElementById('blur-overlay');
    const mainContent = document.querySelector('main');

    // Уменьшаем размытие и скрываем логотип после загрузки
    setTimeout(() => {
        blurOverlay.style.backdropFilter = 'blur(0px)';
        preloader.style.opacity = '0';

        setTimeout(() => {
            preloader.style.display = 'none';
            mainContent.style.opacity = '1';
        }, 1000);
    }, 2000);
});
