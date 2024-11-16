window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const logo = document.getElementById('logo');
    const mainContent = document.getElementById('main-content');

    // Плавное появление логотипа
    logo.style.opacity = '1';

    // Ждем завершения анимации логотипа
    setTimeout(() => {
        preloader.style.opacity = '0';

        // Плавный переход к основному содержимому
        setTimeout(() => {
            preloader.classList.add('hidden');
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '1';
        }, 1000);
    }, 3000);
});
