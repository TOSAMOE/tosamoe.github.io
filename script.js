let coins = 0;
let energy = 4000;
const maxEnergy = 4000;

// Сохранение состояния
function saveState() {
  localStorage.setItem('coins', coins);
  localStorage.setItem('energy', energy);
}

// Загрузка состояния
function loadState() {
  const savedCoins = localStorage.getItem('coins');
  const savedEnergy = localStorage.getItem('energy');

  if (savedCoins !== null) {
    coins = parseInt(savedCoins, 10);
  }

  if (savedEnergy !== null) {
    energy = parseInt(savedEnergy, 10);
  }

  document.getElementById('coin-count').innerText = coins;
  document.getElementById('energy-count').innerText = `${energy}/${maxEnergy}`;
}

// Анимация для самолётиков
function animateAirplane(x, y) {
  const airplane = document.createElement('img');
  airplane.src = 'plane-icon.png'; // Иконка самолёта
  airplane.classList.add('airplane');
  airplane.style.position = 'absolute';
  airplane.style.left = `${x}px`;
  airplane.style.top = `${y}px`;

  document.body.appendChild(airplane);

  // Случайное направление полёта (векторы смещения)
  const randomX = (Math.random() - 0.5) * window.innerWidth * 2; // Увеличенные значения для выхода за экран
  const randomY = (Math.random() - 0.5) * window.innerHeight * 2;

  // Вычисляем угол полёта самолёта
  const deltaX = randomX;
  const deltaY = randomY;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Угол в градусах

  // Поворачиваем самолёт в направлении полёта (учитываем изначальное направление вверх)
  airplane.style.transform = `rotate(${angle - 90}deg)`;

  // Анимация полёта самолёта (выполнение трансформации полёта)
  airplane.style.transition = 'transform 3s linear, opacity 0.5s ease-out';
  airplane.style.transform += ` translate(${randomX}px, ${randomY}px)`;

  // Плавное исчезновение после выхода за экран
  setTimeout(() => {
    airplane.style.opacity = 0;
  }, 2500); // Самолётик исчезает через 2.5 секунды

  // Удаление самолётика после 3 секунд
  setTimeout(() => {
    airplane.remove();
  }, 3000);
}

// Функция для клика и заработка монет
function earnCoins(event) {
  if (energy > 0) {
    coins++;
    energy--;
    document.getElementById('coin-count').innerText = coins;
    document.getElementById('energy-count').innerText = `${energy}/${maxEnergy}`;
    saveState();

    // Запуск анимации самолётика
    const x = event.clientX;
    const y = event.clientY;
    animateAirplane(x, y);
  }
}

window.onload = function() {
  loadState();
};

// Переключение страниц
function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'flex';

  document.querySelectorAll('.nav-menu button').forEach(button => {
    button.classList.remove('active');
  });

  document.querySelector(`[onclick="switchPage('${pageId}')"]`).classList.add('active');
}
