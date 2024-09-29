let coins = 0;
let energy = 4000;
const maxEnergy = 4000;

// Функция для загрузки данных из LocalStorage
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

// Функция для сохранения данных в LocalStorage
function saveState() {
  localStorage.setItem('coins', coins);
  localStorage.setItem('energy', energy);
}

// Анимация для монетки
function animateCoin() {
  const coinIcon = document.getElementById('coin-icon');
  coinIcon.style.transform = 'scale(0.9)'; // Уменьшаем на 10%
  
  setTimeout(() => {
    coinIcon.style.transform = 'scale(1)'; // Возвращаем к исходному размеру
  }, 100); // Время для возврата к исходному размеру
}

// Функция для заработка монет
function earnCoins() {
  if (energy > 0) {
    coins++;
    energy--;
    document.getElementById('coin-count').innerText = coins;
    document.getElementById('energy-count').innerText = `${energy}/${maxEnergy}`;
    saveState();
    animateCoin(); // Запускаем анимацию при клике
  }
}

// Инициализация страницы
window.onload = function() {
  loadState();
};

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
