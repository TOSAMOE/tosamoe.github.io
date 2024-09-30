let coins = 0;
let energy = 4000;
const maxEnergy = 4000;

const levels = [
  { name: 'Bronze', max: 1000, icon: 'bronze-icon.png' },
  { name: 'Silver', max: 2000, icon: 'silver-icon.png' },
  { name: 'Gold', max: 3000, icon: 'gold-icon.png' },
  { name: 'Platinum', max: 4000, icon: 'platinum-icon.png' },
  { name: 'Emerald', max: 5000, icon: 'emerald-icon.png' },
  { name: 'Diamond', max: Infinity, icon: 'diamond-icon.png' }
];

const progressBarFill = document.getElementById('progress-bar-fill');
const coinCountElement = document.getElementById('coin-count');
const energyCountElement = document.getElementById('energy-count');
const levelNameElement = document.querySelector('.silver-level span'); // Используем этот элемент для отображения уровня
const levelIconElement = document.querySelector('.silver-level img'); // Используем этот элемент для отображения иконки уровня

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

  coinCountElement.innerText = coins;
  energyCountElement.innerText = `${energy}/${maxEnergy}`;
  updateLevel();
  updateProgressBar();
}

// Функция для обновления уровня
function updateLevel() {
  for (let level of levels) {
    if (coins < level.max) {
      levelNameElement.textContent = level.name;
      levelIconElement.src = level.icon;
      break;
    }
  }
}

// Функция для обновления прогресс-бара
function updateProgressBar() {
  const progress = (coins % 1000) / 1000 * 100;
  progressBarFill.style.width = `${progress}%`;
}

// Анимация для самолётиков
function animateAirplane(x, y) {
  const airplane = document.createElement('img');
  airplane.src = 'plane-icon.png'; // Иконка самолёта
  airplane.classList.add('airplane');
  airplane.style.left = `${x}px`;
  airplane.style.top = `${y}px`;

  document.body.appendChild(airplane);

  // Случайное направление полёта
  const randomX = (Math.random() - 0.5) * window.innerWidth * 2; // Увеличенные значения для выхода за экран
  const randomY = (Math.random() - 0.5) * window.innerHeight * 2;

  airplane.style.transform = `translate(${randomX}px, ${randomY}px)`;

  // Плавное исчезновение после выхода за экран
  setTimeout(() => {
    airplane.style.opacity = 0;
  }, 2500); // Самолётик будет плавать около 2.5 сек

  // Удаление самолётика после 3 секунд
  setTimeout(() => {
    airplane.remove();
  }, 3000);
}

// Обработка клика на монету
function earnCoins(event) {
  if (energy > 0) {
    coins++;
    energy--;
    coinCountElement.innerText = coins;
    energyCountElement.innerText = `${energy}/${maxEnergy}`;
    saveState();

    const x = event.clientX;
    const y = event.clientY;

    animateAirplane(x, y); // Запускаем анимацию самолётика

    updateProgressBar(); // Обновляем прогресс бар
    updateLevel(); // Обновляем уровень
  }
}

// Загрузка состояния при загрузке страницы
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
