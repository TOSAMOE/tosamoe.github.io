let coins = 0;
let energy = 4000;

// Функция для загрузки данных из LocalStorage
function loadState() {
  const savedCoins = localStorage.getItem('coins');
  const savedEnergy = localStorage.getItem('energy');

  if (savedCoins !== null) {
    coins = parseInt(savedCoins);
    document.getElementById("coin-count").innerText = coins;
  }

  if (savedEnergy !== null) {
    energy = parseInt(savedEnergy);
    document.getElementById("energy-count").innerText = energy;
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
    document.getElementById("energy-count").innerText = energy;
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

  if (x < midpoint) {
    // Наклон влево
    coinIcon.classList.add('coin-tilt-left');
  } else {
    // Наклон вправо
    coinIcon.classList.add('coin-tilt-right');
  }
});

coinIcon.addEventListener('mouseup', () => {
  // Убираем наклон при отпускании кнопки
  coinIcon.classList.remove('coin-tilt-left', 'coin-tilt-right');
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
