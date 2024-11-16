window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const blurOverlay = document.getElementById('blur-overlay');
    const mainContent = document.querySelector('main');

    // Убираем размытие и скрываем логотип через 3 секунды после загрузки
    setTimeout(() => {
        blurOverlay.style.backdropFilter = 'blur(0px)';
        preloader.style.opacity = '0';

        setTimeout(() => {
            preloader.style.display = 'none';
            mainContent.style.opacity = '1';
        }, 1000);
    }, 3000);
});
