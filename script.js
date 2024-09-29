let coins = 0;
let energy = 4000;
const maxEnergy = 4000;

// Функция для сохранения состояния
function saveState() {
  localStorage.setItem('coins', coins);
  localStorage.setItem('energy', energy);
}

// Функция для загрузки состояния
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

// Функция для анимации самолётика
function animateAirplane(x, y) {
  const airplane = document.createElement('img');
  airplane.src = 'plane-icon.png'; // Иконка самолёта
  airplane.classList.add('airplane');
  airplane.style.position = 'absolute';
  airplane.style.left = `${x}px`;
  airplane.style.top = `${y}px`;

  document.body.appendChild(airplane);

  // Случайное направление движения самолёта
  const angleRad = Math.random() * 2 * Math.PI; // Случайный угол в радианах
  const speed = 300 + Math.random() * 200; // Скорость движения самолёта
  const directionX = Math.cos(angleRad); // Направление по оси X
  const directionY = Math.sin(angleRad); // Направление по оси Y

  // Устанавливаем поворот самолёта по направлению его движения
  const angleDeg = angleRad * (180 / Math.PI); // Угол в градусах
  airplane.style.transform = `rotate(${angleDeg + 90}deg)`; // Поворот самолёта (плюс 90 для учёта ориентации иконки)

  // Запускаем анимацию самолёта
  let posX = x;
  let posY = y;

  function moveAirplane() {
    posX += directionX * 5; // Увеличиваем позицию X на основе направления
    posY += directionY * 5; // Увеличиваем позицию Y на основе направления
    airplane.style.left = `${posX}px`;
    airplane.style.top = `${posY}px`;

    // Проверяем выход за экран
    if (posX < -50 || posX > window.innerWidth + 50 || posY < -50 || posY > window.innerHeight + 50) {
      airplane.remove(); // Удаляем самолётик, если он вылетел за экран
    } else {
      requestAnimationFrame(moveAirplane); // Продолжаем движение
    }
  }

  moveAirplane();
}

// Функция для заработка монет и запуска самолётика
function earnCoins(event) {
  if (energy > 0) {
    coins++;
    energy--;
    document.getElementById('coin-count').innerText = coins;
    document.getElementById('energy-count').innerText = `${energy}/${maxEnergy}`;
    saveState();

    // Получаем координаты клика
    const x = event.clientX;
    const y = event.clientY;

    // Запускаем анимацию самолётика в точке клика
    animateAirplane(x, y);
  }
}

// Загрузка состояния при загрузке страницы
window.onload = function() {
  loadState();
};

// Функция для переключения страниц
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
