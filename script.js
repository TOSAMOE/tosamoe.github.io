// Основные переменные
let coins = 0;
let energy = 4000;
const maxEnergy = 4000;
const progressBarFill = document.getElementById('progress-bar-fill');
const coinCountElement = document.getElementById('coin-count');
const energyCountElement = document.getElementById('energy-count');
const levelNameElement = document.getElementById('level-name');
const levelIconElement = document.getElementById('level-icon');

const levels = [
  { name: 'Bronze', icon: 'bronze-icon.png', max: 1000 },
  { name: 'Silver', icon: 'silver-icon.png', max: 2000 },
  { name: 'Gold', icon: 'gold-icon.png', max: 3000 },
  { name: 'Platinum', icon: 'platinum-icon.png', max: 4000 },
  { name: 'Emerald', icon: 'emerald-icon.png', max: 5000 },
  { name: 'Diamond', icon: 'diamond-icon.png', max: Infinity }
];

// Получаем элементы монеты и канваса
const coin = document.getElementById('coin');
const canvas = document.getElementById('hitbox-canvas');
const ctx = canvas.getContext('2d');

// Настраиваем размеры канваса
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const coinRadius = coin.offsetWidth / 2;
let coinX = canvas.width / 2;
let coinY = canvas.height / 2;

let planes = [];

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

// Функция для создания самолётика
function createPlane(clickX, clickY) {
  const plane = {
    x: clickX,
    y: clickY,
    speedX: Math.random() * 4 - 2,
    speedY: Math.random() * 4 - 2,
    rotation: Math.atan2(Math.random() * 2 - 1, Math.random() * 2 - 1),
    img: new Image()
  };
  plane.img.src = 'plane-icon.png';
  plane.rotation = Math.atan2(plane.speedY, plane.speedX);
  planes.push(plane);
}

// Обработчик клика по монете
coin.addEventListener('click', (event) => {
  const rect = coin.getBoundingClientRect();
  const clickX = event.clientX;
  const clickY = event.clientY;

  const centerX = rect.left + coinRadius;
  const centerY = rect.top + coinRadius;

  const distance = Math.sqrt((clickX - centerX) ** 2 + (clickY - centerY) ** 2);
  if (distance <= coinRadius) {
    coins++;
    energy--;
    coinCountElement.textContent = coins;
    energyCountElement.textContent = `${energy}/${maxEnergy}`;
    updateLevel();
    updateProgressBar();
    createPlane(clickX, clickY);
  }
});

// Обновление прогресс-бара
function updateProgressBar() {
  const progress = (coins % 1000) / 1000 * 100;
  progressBarFill.style.width = `${progress}%`;
}

// Функция для отрисовки хитбокса монеты
function drawHitbox() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(coinX, coinY, coinRadius, 0, Math.PI * 2);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Функция для обновления самолётиков
function updatePlanes() {
  planes = planes.filter(plane => {
    plane.x += plane.speedX;
    plane.y += plane.speedY;
    return plane.x > 0 && plane.x < canvas.width && plane.y > 0 && plane.y < canvas.height;
  });
}

// Функция для отрисовки самолётиков
function drawPlanes() {
  planes.forEach(plane => {
    ctx.save();
    ctx.translate(plane.x, plane.y);
    ctx.rotate(plane.rotation);
    ctx.drawImage(plane.img, -plane.img.width / 2, -plane.img.height / 2, 50, 50);
    ctx.restore();
  });
}

// Функция для анимации
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawHitbox();
  updatePlanes();
  drawPlanes();
  requestAnimationFrame(animate);
}

// Обновление хитбокса при изменении размера окна
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  coinX = canvas.width / 2;
  coinY = canvas.height / 2;
  drawHitbox();
});

// Запуск анимации
drawHitbox();
animate();
