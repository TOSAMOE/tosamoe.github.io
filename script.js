let coins = 0;
let energy = 4000;
const maxEnergy = 4000;

function saveState() {
  localStorage.setItem('coins', coins);
  localStorage.setItem('energy', energy);
}

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
  
  document.body.appendChild(airplane);

  // Случайное направление полёта
  const randomX = (Math.random() - 0.5) * window.innerWidth * 2; // Увеличенные значения для выхода за экран
  const randomY = (Math.random() - 0.5) * window.innerHeight * 2;

  // Вычисляем разницу по координатам для определения угла
  const deltaX = randomX - x;
  const deltaY = randomY - y;

  // Вычисляем угол направления полета с помощью Math.atan2
  const angle = Math.atan2(deltaY, deltaX); // Угол в радианах

  // Устанавливаем начальное положение и поворот в одном действии
  airplane.style.left = `${x}px`;
  airplane.style.top = `${y}px`;

  // Применяем поворот самолёта (добавляем 90 градусов для корректировки носа вверх)
  airplane.style.transform = `rotate(${angle + Math.PI / 2}rad) translate(${randomX - x}px, ${randomY - y}px)`;

  // Плавное исчезновение после выхода за экран
  setTimeout(() => {
    airplane.style.opacity = 0;
  }, 2500); // Самолётик будет плавать около 2.5 сек

  // Удаление самолётика после 3 секунд
  setTimeout(() => {
    airplane.remove();
  }, 3000);
}

function earnCoins(event) {
  if (energy > 0) {
    coins++;
    energy--;
    document.getElementById('coin-count').innerText = coins;
    document.getElementById('energy-count').innerText = `${energy}/${maxEnergy}`;
    saveState();

    const x = event.clientX;
    const y = event.clientY;

    animateAirplane(x, y); // Запускаем анимацию самолётика
  }
}

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
