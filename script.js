// Эффект кастомного курсора
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

// Глитч-эффект
const glitchText = document.getElementById('logo-text');
setInterval(() => {
  glitchText.classList.toggle('glitch');
}, 500);

// Анимация появления элементов при скролле
const revealElements = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  revealElements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('active');
    }
  });
});
