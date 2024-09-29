let coins = 0;
let energy = 4000;
const maxEnergy = 4000;

// Функция для загрузки данных из LocalStorage
function loadState() {
  const savedCoins = localStorage.getItem('coins');
  const savedEnergy = localStorage.getItem('energy');

  if (savedCoins !== null) {
    coins = parseInt(savedCoins, 10);
    document.getElementById("coin-count").innerText = coins;
  }

  if (savedEnergy !== null) {
    energy = parseInt(savedEnergy, 10);
    document.getElementById("energy-count").innerText = `${energy}/${maxEnergy}`;
  }
}

// Функция для сохранения данных в LocalStorage
function saveState() {
  localStorage.setItem('coins', coins);
  localStorage.setItem('energy', energy);
}

// Функция для заработка монет
function earnCoins() {
  if (energy > 0) {
    coins++;
    energy--;
    document.getElementById("coin-count").innerText = coins;
    document.getElementById("energy-count").innerText = `${energy}/${maxEnergy}`;
    saveState(); // Сохраняем текущее состояние после изменений
  } else {
    alert("Out of energy!");
  }
}

// Анимация монетки при клике
const coinIcon = document.querySelector('.central-coin-icon');

coinIcon.addEventListener('mousedown', (e) => {
  const rect = coinIcon.getBoundingClientRect();
  const x = e.clientX - rect.left; // Получаем координаты клика относительно монетки
  const midpoint = rect.width / 2;

  // Проверка на положение клика: влево или вправо
  if (x < midpoint) {
    coinIcon.classList.add('coin-tilt-left');
  } else {
    coinIcon.classList.add('coin-tilt-right');
  }
});

coinIcon.addEventListener('mouseup', () => {
  // Убираем наклон после отпускания
  coinIcon.classList.remove('coin-tilt-left');
  coinIcon.classList.remove('coin-tilt-right');
});

coinIcon.addEventListener('mouseleave', () => {
  // Сбрасываем анимацию, если курсор покинул область монетки
  coinIcon.classList.remove('coin-tilt-left');
  coinIcon.classList.remove('coin-tilt-right');
});

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

// Инициализация начальной страницы
document.getElementById('earn-page').style.display = 'flex';

// Загружаем состояние из LocalStorage при загрузке страницы
window.onload = loadState;
