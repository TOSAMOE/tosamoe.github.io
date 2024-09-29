let coins = 0;
let energy = 4000;
const maxEnergy = 4000;
const restoreRate = 0.2; // Восстанавливать энергию каждые 0.2 секунды (1 единица)
let lastUpdateTime = Date.now();

// Сохранение данных
function saveState() {
  localStorage.setItem('coins', coins);
  localStorage.setItem('energy', energy);
  localStorage.setItem('lastUpdateTime', Date.now()); // Сохраняем время последнего обновления энергии
}

// Загрузка данных
function loadState() {
  const savedCoins = localStorage.getItem('coins');
  const savedEnergy = localStorage.getItem('energy');
  const savedLastUpdateTime = localStorage.getItem('lastUpdateTime');

  if (savedCoins !== null) {
    coins = parseInt(savedCoins, 10);
  }

  if (savedEnergy !== null) {
    energy = parseInt(savedEnergy, 10);
  }

  if (savedLastUpdateTime !== null) {
    lastUpdateTime = parseInt(savedLastUpdateTime, 10);
  }

  // Рассчитаем, сколько времени прошло с момента последнего обновления энергии
  const timeElapsed = (Date.now() - lastUpdateTime) / 1000; // В секундах
  const energyToRestore = Math.floor(timeElapsed * 5); // Количество единиц энергии для восстановления (5 единиц в секунду)

  // Восстанавливаем энергию с учётом максимального значения
  energy = Math.min(maxEnergy, energy + energyToRestore);

  document.getElementById('coin-count').innerText = coins;
  document.getElementById('energy-count').innerText = `${energy}/${maxEnergy}`;
}

// Функция восстановления энергии
function restoreEnergy() {
  if (energy < maxEnergy) {
    energy = Math.min(maxEnergy, energy + 1); // Восстанавливаем 1 единицу энергии
    document.getElementById('energy-count').innerText = `${energy}/${maxEnergy}`;
    saveState(); // Сохраняем обновленное значение энергии
  }
}

// Запускаем восстановление энергии каждые 0.2 секунды
setInterval(restoreEnergy, 200);

// Функция заработка монет
function earnCoins() {
  if (energy > 0) {
    coins++;
    energy--;
    document.getElementById('coin-count').innerText = coins;
    document.getElementById('energy-count').innerText = `${energy}/${maxEnergy}`;
    saveState();
    
    // Вибрация на мобильных устройствах
    if (navigator.vibrate) {
      navigator.vibrate(100); // Вибрация на 100 миллисекунд
    }
  }
}

// Загружаем состояние при загрузке страницы
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
