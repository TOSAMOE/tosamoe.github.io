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
